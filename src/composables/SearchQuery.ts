import { MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue'

export function useSearchQuery<T>(items: MaybeRefOrGetter<T[]>,
                                  searchQuery: MaybeRefOrGetter<string>,
                                  getter: (item: T) => string,
                                  postProcess?: (items: T[]) => T[]) {
  const results = ref<T[]>([])

  watchEffect(() => {
    const searchItems = toValue(items) ?? []
    const query = toValue(searchQuery).split(/[ ,-]/i)
    const res = searchItems.filter(item => query.some(value => getter(item).includes(value)))
    // @ts-expect-error: Vue: Type `T[]` is not assignable to type `UnwrapRefSimple<T>[]`. Type 'T' is not assignable to type 'UnwrapRefSimple<T>'.
    results.value = postProcess ? postProcess(res) : res
  })

  return { results }
}