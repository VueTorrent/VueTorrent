import { expect, test } from 'vitest'
import { getColorFromName } from './colors'

test('helpers/colors/getColorFromName', () => {
  expect(getColorFromName('foo')).toBe('#7b2fde')
  expect(getColorFromName('bar')).toBe('#97e374')
  expect(getColorFromName('baz')).toBe('#447ecf')
})
