import { MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue'

export function useSearchQuery<T>(items: MaybeRefOrGetter<T[]>,
                                  searchQuery: MaybeRefOrGetter<string>,
                                  getter: (item: T) => string,
                                  postProcess?: (items: T[]) => T[]) {
  const results = ref(toValue(items))

  watchEffect(() => {
    const query = toValue(searchQuery).split(/[ ,-]/i)
    const res = toValue(items).filter(item => query.some(value => getter(item).includes(value)))
    results.value = postProcess ? postProcess(res) : res
  })

  return { results }
}