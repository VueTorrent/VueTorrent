import { useOffsetPagination } from '@vueuse/core'
import { computed, MaybeRef, MaybeRefOrGetter, toValue } from 'vue'

export function useArrayPagination<T>(items: MaybeRefOrGetter<T[]>, pageSize: MaybeRefOrGetter<number>, page: MaybeRef<number> = 1) {
  const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, next, prev } = useOffsetPagination({
    total: () => toValue(items).length,
    page,
    pageSize: () => (toValue(pageSize) === -1 ? toValue(items).length : toValue(pageSize)),
  })

  const paginatedResults = computed(() => {
    const start = (currentPage.value - 1) * toValue(pageSize)
    const end = start + currentPageSize.value
    return toValue(items).slice(start, end)
  })

  return {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    next,
    prev,
    paginatedResults,
  }
}
