export type Direction = 'top' | 'right' | 'left' | 'bottom'
export type MarkerType = 'none' | 'arrow'

export interface Point {
  x: number
  y: number
}

export interface Edge {
  id: string
  fromNode: string
  fromSide?: Direction
  fromEnd?: MarkerType
  toNode: string
  toSide?: Direction
  toEnd?: MarkerType
  label?: string
}

export interface CanvasColor {
  '1': string
  '2': string
  '3': string
  '4': string
  '5': string
  '6': string
}

export const colors: CanvasColor = {
  '1': '#ef4444', // red
  '2': '#f97316', // orange
  '3': '#eab308', // yellow
  '4': '#22c55e', // green
  '5': '#06b6d4', // cyan
  '6': '#a855f7', // purple
}

export interface Node {
  id: string
  type: string
  label?: string
  file: string
  x: number
  y: number
  width: number
  height: number
  color?: string
  text?: string
}
export interface CanvasContent {
  edges: Edge[]
  initialNodes: Node[]
}
