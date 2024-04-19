import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { Node, colors } from '../types'

export function CanvasNode({
  node,
  scale,
  translateX,
  translateY,
}: {
  node: Node
  scale: number
  translateX: number
  translateY: number
}) {
  return (
    <div
      id={node.id}
      className="node"
      style={{
        border: `${2 * scale}px solid ${colors[node.color] || '#EBEDE9'}`,
        height: '100%',
        width: '100%',
        maxHeight: `${node.height * scale}px`,
        maxWidth: `${node.width * scale}px`,
        transform: `translate(${translateX}px, ${translateY}px)`,
        left: `${node.x * scale}px`,
        top: `${node.y * scale}px`,
        backgroundColor: `${
          node.color ? colors[node.color] + 20 : node.type !== 'group' ? '#ffffff90' : '#ffffff60'
        }`,
        fontSize: `${scale * 14}px`,
        lineHeight: `${scale * 18}px`,
      }}
    >
      {node.type === 'group' && (
        <p
          className="node-label"
          style={{ top: Math.min(-40 * scale, 40), fontSize: `${scale * 16}px` }}
        >
          {node.label}
        </p>
      )}
      <div className="node-content">
        {node.type !== 'group' && <h1 className="px-4">{node.label}</h1>}
        <Markdown
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          remarkPlugins={[remarkGfm, remarkFrontmatter]}
          className="markdown"
        >
          {node.file ? node.file : node.text}
        </Markdown>
      </div>
    </div>
  )
}
