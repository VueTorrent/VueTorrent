import { describe, it, expect } from 'vitest'
import { splitByUrl } from '@/helpers'

describe('Helpers', () => {
  describe('splitByUrl()', () => {
    it('should not split anything', () => {
      expect(splitByUrl('test')).toEqual(['test'])
    })

    it('should split to array if http/https is found', () => {
      expect(splitByUrl('test http://test.something')).toEqual(['test ', 'http://test.something'])
      expect(splitByUrl('123456 test@345 https://something.else test@@!!#789')).toEqual(['123456 test@345 ', 'https://something.else', ' test@@!!#789'])
    })

    it('should split to array if www is found', () => {
      expect(splitByUrl('test www.test.something')).toEqual(['test ', 'www.test.something'])
    })

    it('should split to array where both www and http/https are found', () => {
      expect(splitByUrl('test http://www.test.something')).toEqual(['test ', 'http://www.test.something'])
      expect(splitByUrl('test https://www.something.else')).toEqual(['test ', 'https://www.something.else'])
    })

    it('should split correctly if more than one url exists', () => {
      expect(splitByUrl('test http://www.test.something some string and https://onemoreurl.com')).toEqual([
        'test ',
        'http://www.test.something',
        ' some string and ',
        'https://onemoreurl.com'
      ])
    })
  })
})
