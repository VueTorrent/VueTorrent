import { MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue'
import { normalize } from '@/helpers'

type MaybeString = string | undefined

export function useSearchQuery<T>(
  items: MaybeRefOrGetter<T[]>,
  searchQuery: MaybeRefOrGetter<string | null>,
  getter: (item: T) => MaybeString | MaybeString[],
  postProcess?: (items: T[]) => T[]
) {
  const results = ref<T[]>([])
  const isRegexMatch = ref(false)

  watchEffect(() => {
    const searchItems = toValue(items) ?? []
    const query = toValue(searchQuery) ?? ''

    const [isRegex, res] = trySearch(searchItems, query)

    isRegexMatch.value = isRegex
    results.value = postProcess ? postProcess(res) : res
  })

  /**
   * Try to search with regex or text
   * @returns [isRegex, results]
   */
  function trySearch(searchItems: T[], query: string): [boolean, T[]] {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      return [false, searchItems.slice()]
    }

    if (!query.startsWith('/') || !query.endsWith('/')) {
      return [false, textSearch(searchItems, trimmedQuery)]
    }

    const regexQuery = query.substring(1, query.length - 1)

    const res = tryRegexSearch(searchItems, regexQuery)
    isRegexMatch.value = res !== null
    if (res === null) {
      return [false, textSearch(searchItems, regexQuery)]
    }
    return [true, res]
  }

  function tryRegexSearch(searchItems: T[], query: string) {
    let regex: RegExp
    try {
      regex = new RegExp(query)
    } catch {
      return null
    }

    return searchItems.filter(item => [getter(item)].flat().some(singleItem => regex.test(singleItem ?? '')))
  }

  function textSearch(searchItems: T[], query: string) {
    const tokens = tokenize(query)
    const inclusionTokens = tokens.filter(token => !token.startsWith('-'))
    const exclusionTokens = tokens.filter(token => token.startsWith('-')).map(token => token.slice(1))
    return searchItems.filter(item => handleIncludeTokens(item, inclusionTokens) && handleExcludeTokens(item, exclusionTokens))
  }

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

  return { results, isRegexMatch }
}
