import { Direction, Point } from '../types'

export function createPath(
  fromPoint: Point,
  toPoint: Point,
  _curveTightness: number,
  straightLineLength: number,
  fromSide: Direction,
  toSide: Direction,
) {
  let controlPointX1, controlPointX2, controlPointY1, controlPointY2, endPointX, endPointY

  if (fromSide === 'right' || fromSide === 'left') {
    controlPointX1 = fromPoint.x + (fromSide === 'right' ? straightLineLength : -straightLineLength)
    controlPointX2 = toPoint.x + (toSide === 'right' ? straightLineLength : -straightLineLength)
    controlPointY1 = fromPoint.y
    controlPointY2 = toPoint.y
    endPointX = controlPointX2
    endPointY = controlPointY2
  } else {
    controlPointX1 = fromPoint.x
    controlPointX2 = toPoint.x
    controlPointY1 =
      fromPoint.y + (fromSide === 'bottom' ? straightLineLength : -straightLineLength)
    controlPointY2 = toPoint.y + (toSide === 'bottom' ? straightLineLength : -straightLineLength)
    endPointX = controlPointX2
    endPointY = controlPointY2
  }

  return `M ${fromPoint.x} ${fromPoint.y} L ${controlPointX1} ${controlPointY1} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${endPointX} ${endPointY} L ${toPoint.x} ${toPoint.y}`
}
