import { Direction } from '../types'

// Calculate the anchor point of an edge based on the node and the anchoring side
export function getAnchorPoint(node: HTMLElement, side: Direction) {
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
