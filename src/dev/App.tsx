import { Canvas } from "../index";
import { Edge, Node, CanvasContent } from "../types";

function App() {
  const mockEdges: Edge[] = [
    {
      id: "edge1",
      fromNode: "node1",
      fromSide: "right",
      fromEnd: "arrow",
      toNode: "node2",
      toSide: "left",
      color: "blue"
    },
    {
      id: "edge2",
      fromNode: "node2",
      fromSide: "bottom",
      fromEnd: "arrow",
      toNode: "node3",
      toSide: "top",
      toEnd: "arrow",
      color: "red"
    },
    {
      id: "edge3",
      fromNode: "node3",
      fromSide: "right",
      fromEnd: "arrow",
      toNode: "node4",
      toSide: "top",
      toEnd: "none",
      color: "#008000"
    },
    {
      id: "edge4",
      fromNode: "node1",
      fromSide: "right",
      toNode: "node4",
      toSide: "left",
      toEnd: "arrow",
    },
    {
      id: "edge5",
      fromNode: "node4",
      fromSide: "right",
      toNode: "node5",
      toSide: "left",
      toEnd: "arrow"
    },
    {
      id: "edge6",
      fromNode: "node6",
      fromSide: "right",
      toNode: "node7",
      toSide: "left",
    },
  ];

  const mockInitialNodes: Node[] = [
    {
      id: "node1",
      type: "start",
      data: { label: "Start Node", content: "This is the starting point" },
      x: 100,
      y: 100,
      width: 120,
      height: 60,
    },
    {
      id: "node2",
      type: "process",
      data: { label: "Process Node", content: "This is a process node" },
      x: 300,
      y: 100,
      width: 150,
      height: 80,
    },
    {
      id: "node3",
      type: "decision",
      data: { label: "Decision Node", content: "This is a decision node" },
      x: 100,
      y: 300,
      width: 140,
      height: 100,
    },
    {
      id: "node4",
      type: "end",
      data: { label: "End Node", content: "This is the end point" },
      x: 300,
      y: 500,
      width: 120,
      height: 60,
    },
    {
      id: "node5",
      type: "process",
      data: { label: "Process Node", content: "Looks the same without Tailwind" },
      x: 500,
      y: 100,
      width: 150, 
      height: 80,
    },
    {
      id: "node6",
      type: "decision",
      data: { label: "Decision Node", content: "Another decision node" },
      x: 100,
      y: 480,
      width: 140, 
      height: 100,
    },
    {
      id: "node7",
      type: "process",
      data: { label: "Process Node", content: "Yet another process node" },
      x: 500,
      y: 300,
      width: 150,
      height: 80,
    },
  ];

  const mockCanvasContent: CanvasContent = {
    edges: mockEdges,
    initialNodes: mockInitialNodes,
  };

  return <Canvas content={mockCanvasContent} />;
}

export default App;
