import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { normalize } from '@/helpers'

type MaybeString = string | undefined

export function useSearchQuery<T>(
  items: MaybeRefOrGetter<T[]>,
  searchQuery: MaybeRefOrGetter<string | null>,
  getter: (item: T) => MaybeString | MaybeString[],
  postProcess?: (items: T[]) => T[]
) {
  const results = computed(() => {
    const searchItems = toValue(items) ?? []
    const query = toValue(searchQuery) ?? ''

    let res: T[]

    if (query.startsWith('/') && query.endsWith('/')) {
      const regex = new RegExp(query.substring(1, query.length - 2))
      res = searchItems.filter(item => [getter(item)].flat().some(singleItem => regex.test(singleItem ?? '')))
    } else {
      const tokens = tokenize(query)
      const inclusionTokens = tokens.filter(token => !token.startsWith('-'))
      const exclusionTokens = tokens.filter(token => token.startsWith('-')).map(token => token.slice(1))
      res = searchItems.filter(item => handleIncludeTokens(item, inclusionTokens) && handleExcludeTokens(item, exclusionTokens))
    }

    return postProcess ? postProcess(res) : res
  })

  function tokenize(query: string): string[] {
    const tokens = new Array<string>()
    let buffer = ''
    let quoteFlag = false

    function pushBuffer() {
      tokens.push(buffer)
      buffer = ''
    }

    for (const c of normalize(query)) {
      if (c === '"') {
        if (quoteFlag) {
          quoteFlag = false
          pushBuffer()
          continue
        } else {
          quoteFlag = true
          continue
        }
      } else if (quoteFlag) {
        // Skip process, append to buffer until quote or end
      } else if ([' ', ','].includes(c)) {
        pushBuffer()
        continue
      }

      buffer += c
    }

    if (buffer !== '') {
      pushBuffer()
    }

    return tokens
  }

  function handleIncludeTokens(item: T, tokens: string[]) {
    return tokens.every(token => {
      let value = getter(item)
      if (!Array.isArray(value)) value = [value]
      return value.some(v => normalize(v).indexOf(token) !== -1)
    })
  }

  function handleExcludeTokens(item: T, tokens: string[]) {
    return !tokens.some(token => {
      let value = getter(item)
      if (!Array.isArray(value)) value = [value]
      return value.some(v => normalize(v).indexOf(token) !== -1)
    })
  }

  return { results }
}
