import { createPinia, disposePinia } from 'pinia'
import { beforeEach, expect, onTestFinished, test } from 'vitest'
import { useHistoryStore } from './history'
import { HistoryKey } from '@/constants/vuetorrent'

const historyKey = 'vuetorrent_history'
const preferenceKey = 'vuetorrent_saveFieldHistory'

function openHistoryStore() {
  const pinia = createPinia()
  onTestFinished(() => disposePinia(pinia))
  return useHistoryStore(pinia)
}

beforeEach(() => localStorage.clear())

test('remembers the most recent distinct values up to the configured limit', () => {
  const store = openHistoryStore()
  store.historySize = 2
  for (const query of ['one', 'two', 'three', 'two']) {
    store.pushValueToHistory(HistoryKey.SEARCH_ENGINE_QUERY, query)
  }
  expect(openHistoryStore().getHistory(HistoryKey.SEARCH_ENGINE_QUERY)).toEqual(['two', 'three'])
})

test('opting out clears existing fields and keeps them empty across reloads', () => {
  localStorage.setItem(historyKey, JSON.stringify({ _history: { cookie: ['example=one'], torrentCreatorTrackers: ['https://tracker.example/announce'] }, historySize: 7 }))
  const store = openHistoryStore()
  expect(store.getHistory(HistoryKey.COOKIE)).toEqual(['example=one'])

  store.saveFieldHistory = false
  store.pushValueToHistory(HistoryKey.COOKIE, 'example=two')
  expect(JSON.parse(localStorage.getItem(historyKey)!)).toEqual({ _history: {}, historySize: 7 })

  const reopened = openHistoryStore()
  expect(reopened.saveFieldHistory).toBe(false)
  expect(reopened.getHistory(HistoryKey.COOKIE)).toEqual([])
  reopened.saveFieldHistory = true
  reopened.pushValueToHistory(HistoryKey.COOKIE, 'example=three')
  expect(openHistoryStore().getHistory(HistoryKey.COOKIE)).toEqual(['example=three'])
})

test('honours an opt-out from another tab before its storage event arrives', () => {
  const store = openHistoryStore()
  store.pushValueToHistory(HistoryKey.COOKIE, 'example=old')
  localStorage.setItem(preferenceKey, 'false')
  localStorage.setItem(historyKey, JSON.stringify({ _history: {}, historySize: 3 }))

  store.pushValueToHistory(HistoryKey.COOKIE, 'example=new')
  store.historySize = 4
  expect(store.getHistory(HistoryKey.COOKIE)).toEqual([])
  expect(JSON.parse(localStorage.getItem(historyKey)!)).toEqual({ _history: {}, historySize: 4 })
})

test('clears stale history on startup when the preference is already off', () => {
  localStorage.setItem(preferenceKey, 'false')
  localStorage.setItem(historyKey, JSON.stringify({ _history: { cookie: ['example=old'] }, historySize: 5 }))
  openHistoryStore()
  expect(JSON.parse(localStorage.getItem(historyKey)!)).toEqual({ _history: {}, historySize: 5 })
})
