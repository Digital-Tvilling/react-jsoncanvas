import { drag, select, zoom } from 'd3'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './canvas.css'

export interface Edge {
  id: string
  fromNode: string
  fromSide: string
  fromEnd: string
  toNode: string
  toSide: string
  toEnd: string
}

export interface Node {
  id: string
  type: string
  data: { label: string; content: string }
  position: { x: number; y: number }
  dimensions: { width: number; height: number }
}
export interface CanvasContent {
  edges: Edge[]
  initialNodes: Node[]
}
export interface CanvasProps {
  content: CanvasContent
}

export function Canvas({ content }: CanvasProps) {
  const [scale, setScale] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const containerRef = useRef(null)
  const [nodes, setNodes] = useState(content.initialNodes)
  const nodesRef = useRef(content.initialNodes)

  function getAnchorPoint(node, side) {
    const x = parseInt(node.style.left, 10)
    const y = parseInt(node.style.top, 10)
    const width = node.offsetWidth
    const height = node.offsetHeight

    switch (side) {
      case 'top':
        return { x: x + width / 2, y: y }
      case 'right':
        return { x: x + width, y: y + height / 2 }
      case 'bottom':
        return { x: x + width / 2, y: y + height }
      case 'left':
        return { x: x, y: y + height / 2 }
      default: // center or unspecified case
        return { x: x + width / 2, y: y + height / 2 }
    }
  }

  const drawEdges = () => {
    const svgContainer = document.getElementById('edge-paths')
    svgContainer.innerHTML = '' // Clear existing edges for redraw

    content.edges.forEach((edge) => {
      const fromNode = document.getElementById(edge.fromNode)
      const toNode = document.getElementById(edge.toNode)

      if (fromNode && toNode) {
        const fromPoint = getAnchorPoint(fromNode, edge.fromSide)
        const toPoint = getAnchorPoint(toNode, edge.toSide)
        // handle translate
        fromPoint.x += translateX
        fromPoint.y += translateY
        toPoint.x += translateX
        toPoint.y += translateY

        const curveTightness = 0.75
        const controlPointX1 = fromPoint.x + (toPoint.x - fromPoint.x) * curveTightness
        const controlPointX2 = fromPoint.x + (toPoint.x - fromPoint.x) * (1 - curveTightness)
        const controlPointY1 = fromPoint.y
        const controlPointY2 = toPoint.y

        const d = `M ${fromPoint.x} ${fromPoint.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${toPoint.x} ${toPoint.y}`

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', d)
        path.setAttribute('stroke', 'black')
        path.setAttribute('fill', 'none')
        if (edge.toEnd === 'arrow') {
          path.setAttribute('marker-end', 'url(#arrowhead)')
        }

        svgContainer.appendChild(path)
      }
    })
  }

  useEffect(() => {
    drawEdges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, scale, translateX, translateY])

  useEffect(() => {
    const container = select(containerRef.current)

    const zoomFn = zoom()
      // .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        setScale(event.transform.k)
        setTranslateX(event.transform.x)
        setTranslateY(event.transform.y)
      })

    container.call(zoomFn)
  }, [])

  useEffect(() => {
    const container = select(containerRef.current)

    const dragHandler = drag()
      .on('start', (event) => {
        select(event.sourceEvent.target).classed('dragging', true)
      })
      .on('drag', (event) => {
        const nodeId = event.sourceEvent.target.id
        nodesRef.current = nodesRef.current.map((n) =>
          n.id === nodeId
            ? { ...n, position: { x: n.position.x + event.dx, y: n.position.y + event.dy } }
            : n,
        )
        // Force update to reflect the changes in the UI
        setNodes([...nodesRef.current])
      })
      .on('end', (event) => {
        select(event.sourceEvent.target).classed('dragging', false)
      })

    container.selectAll('.node').call(dragHandler)
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-w-screen bg-silver-100 text-preussianBlue-900 relative h-full min-h-screen w-full"
      style={{
        backgroundSize: `calc(${scale} * 20px) calc(${scale} * 20px)`,
        backgroundPosition: `calc(${scale} - 19px) calc(${scale} - 19px)`,
        backgroundImage: `radial-gradient(#ddd calc(${scale}*0.5px + 0.5px), transparent 0)`,
      }}
    >
      <>
        <svg id="canvas-edges">
          <defs>
            <marker id="arrowhead" markerWidth="5" markerHeight="4" refX="1" refY="2" orient="auto">
              <polygon points="0 0, 5 2, 0 4" />
            </marker>
          </defs>
          <g id="edge-paths"></g>
        </svg>

        {nodesRef.current?.map((node) => (
          <div
            id={node.id}
            key={node.id}
            className="border-silver-300 node active:text-preussianBlue-800 absolute overflow-hidden rounded border-[1px] border-solid bg-white p-2 transition-shadow duration-200 hover:cursor-grab active:cursor-grabbing active:shadow-md"
            style={{
              // minHeight: `${node.dimensions.height * scale}px`,
              // minWidth: `${node.dimensions.width * scale}px`,
              transform: `translate(${translateX}px, ${translateY}px)`,
              // transform: `scale(${scale})`,
              left: `${node.position.x * scale + 20}px`,
              top: `${node.position.y * scale + 20}px`,
              fontSize: `${scale * 12}px`,
              lineHeight: `${scale * 16}px`,
            }}
          >
            <ReactMarkdown>{node.data.content}</ReactMarkdown>
          </div>
        ))}
      </>
    </section>
  )
}
