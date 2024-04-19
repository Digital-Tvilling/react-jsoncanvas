import { Canvas } from '../index'
import { CanvasContent } from '../types'
import mockCanvasContent from './mock-content.json'

export default function App() {
  return <Canvas content={mockCanvasContent as CanvasContent} />
}
