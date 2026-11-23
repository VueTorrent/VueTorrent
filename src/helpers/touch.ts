export interface TouchPoint {
  pageX: number
  pageY: number
}

interface TouchListLike {
  item(index: number): TouchPoint | null
}

export interface TouchEventLike {
  touches: TouchListLike
}

/**
 * Copy the position of the first touch point of a touch event.
 *
 * A `Touch` object is live: the browser keeps mutating it while the finger
 * moves, and resets it once the touch point is gone. Reading one from a
 * deferred callback (a long-press timer, for instance) therefore observes
 * whatever state the browser left behind — typically `0,0` once it cancelled
 * the touch to take the gesture over — instead of where the finger went down.
 *
 * Call this synchronously from the event handler and keep the plain numbers.
 */
export function getTouchPoint(event: TouchEventLike): TouchPoint | undefined {
  const touch = event.touches.item(0)
  if (!touch) return undefined

  return { pageX: touch.pageX, pageY: touch.pageY }
}
