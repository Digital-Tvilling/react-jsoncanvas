export interface Edge {
  id: string;
  fromNode: string;
  fromSide: string;
  fromEnd: string;
  toNode: string;
  toSide: string;
  toEnd: string;
}

export interface Node {
  id: string;
  type: string;
  data: { label: string; content: string };
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
}

export interface CanvasContent {
  edges: Edge[];
  initialNodes: Node[];
}
