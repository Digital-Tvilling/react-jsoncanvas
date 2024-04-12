
export type Direction = "top" | "right" | "left" | "bottom";
export type MarkerType = "none" | "arrow";

export interface Edge {
  id: string;
  fromNode: string;
  fromSide?: Direction;
  fromEnd?: MarkerType;
  toNode: string;
  toSide?: Direction;
  toEnd?: MarkerType;
  color?: string;
  label?: string;
}

export interface Node {
  id: string;
  type: string;
  data: { label: string; content: string };
  x: number,
  y: number,
  dimensions: { width: number; height: number };
}

export interface CanvasContent {
  edges: Edge[];
  initialNodes: Node[];
}
