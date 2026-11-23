import { describe, expect, test } from 'vitest'
import { getTouchPoint } from './touch'

describe('helpers/touch/getTouchPoint', () => {
  test('returns the position of the first touch point', () => {
    const point = getTouchPoint({ touches: { item: () => ({ pageX: 42, pageY: 84 }) } })

    expect(point).toEqual({ pageX: 42, pageY: 84 })
  })

  test('returns undefined when the event carries no touch point', () => {
    expect(getTouchPoint({ touches: { item: () => null } })).toBeUndefined()
  })

  test('copies the position instead of aliasing the live Touch object', () => {
    // The browser mutates the Touch object in place, and resets it to 0,0 once
    // it cancels the touch. A long-press timer that keeps the object around
    // therefore opens the context menu in the top-left corner of the page.
    const live = { pageX: 120, pageY: 640 }
    const point = getTouchPoint({ touches: { item: () => live } })!

    live.pageX = 0
    live.pageY = 0

    expect(point).toEqual({ pageX: 120, pageY: 640 })
  })

  test('keeps reading the position the finger went down at, even after the touch ends', () => {
    let touched = true
    const live = { pageX: 320, pageY: 900 }
    const point = getTouchPoint({ touches: { item: () => (touched ? live : null) } })!

    touched = false

    expect(point).toEqual({ pageX: 320, pageY: 900 })
  })
})
