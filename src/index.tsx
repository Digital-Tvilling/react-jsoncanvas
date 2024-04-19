import { select, zoom } from 'd3'
import { useEffect, useRef, useState } from 'react'
import { CanvasNode } from './components/CanvasNode'
import { Edges } from './components/Edges'
import './index.css'
import { CanvasContent } from './types'

export interface CanvasProps {
  content: CanvasContent
}

export function Canvas({ content }: CanvasProps) {
  const [scale, setScale] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const containerRef = useRef(null)
  const nodesRef = useRef(content.initialNodes)

  //Mount zoom
  useEffect(() => {
    const container = select(containerRef.current)

    const zoomFn = zoom().on('zoom', (event) => {
      setScale(event.transform.k)
      setTranslateX(event.transform.x)
      setTranslateY(event.transform.y)
    })

    container.call(zoomFn)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className="json-canvas"
        style={{
          backgroundSize: `calc(${scale} * 20px) calc(${scale} * 20px)`,
          backgroundPosition: `calc(${scale} - 19px) calc(${scale} - 19px)`,
          backgroundImage: `radial-gradient(#ddd calc(${scale}*0.5px + 0.5px), transparent 0)`,
        }}
      />

      <Edges scale={scale} content={content} translateX={translateX} translateY={translateY} />

      {nodesRef.current !== null &&
        nodesRef.current?.map((node) => (
          <CanvasNode
            key={node.id}
            node={node}
            scale={scale}
            translateX={translateX}
            translateY={translateY}
          />
        ))}
    </>
  )
}
