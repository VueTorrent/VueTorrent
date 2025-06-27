import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { normalize } from '@/helpers/text.ts'

export function useSearchQuery<T>(
  items: MaybeRefOrGetter<T[]>,
  searchQuery: MaybeRefOrGetter<string | null>,
  getter: (item: T) => string | string[],
  postProcess?: (items: T[]) => T[]
) {
  const results = computed(() => {
    const searchItems = toValue(items) ?? []
    const tokens = normalize(toValue(searchQuery) ?? '')
      .trim()
      .split(/[ ,]/i)
      .filter(Boolean)
    const inclusionTokens = tokens.filter(token => !token.startsWith('-'))
    const exclusionTokens = tokens.filter(token => token.startsWith('-')).map(token => token.slice(1))
    const res = searchItems.filter(item => handleIncludeTokens(item, inclusionTokens) && handleExcludeTokens(item, exclusionTokens))
    return postProcess ? postProcess(res) : res
  })

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
