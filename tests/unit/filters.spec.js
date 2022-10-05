import { titleCase, transformUrlToHref } from '../../src/filters'

describe('Filters', () => {
  it('titleCase', () => {
    expect(titleCase('test')).toEqual('Test')
    expect(titleCase('hello there')).toEqual('Hello There')
  })

  describe('transformUrlToHref()', () => {
    it('should not transform anything', () => {
      expect(transformUrlToHref('test')).toEqual('test')
    })

    it('should transform string where http/https is found', () => {
      expect(transformUrlToHref('test http://test.something')).toEqual('test <a href="http://test.something" target="_blank">http://test.something</a>')
      expect(transformUrlToHref('123456 test@345 https://something.else')).toEqual('123456 test@345 <a href="https://something.else" target="_blank">https://something.else</a>')
    })

    it('should transform string where only www is found', () => {
      expect(transformUrlToHref('test www.test.something')).toEqual('test <a href="www.test.something" target="_blank">www.test.something</a>')
    })

    it('should transform string where both www and http/https are found', () => {
      expect(transformUrlToHref('test http://www.test.something')).toEqual('test <a href="http://www.test.something" target="_blank">http://www.test.something</a>')
      expect(transformUrlToHref('test https://www.something.else')).toEqual('test <a href="https://www.something.else" target="_blank">https://www.something.else</a>')
    })
  })
})