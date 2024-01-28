import { FilePriority } from '@/constants/qbit'
import { beforeEach, expect, test } from 'vitest'
import { TreeFile, TreeFolder } from './TreeObjects'

const file_unwanted = new TreeFile(
  {
    availability: 1,
    index: 0,
    is_seed: true,
    name: 'test/test1.txt',
    piece_range: [0, 0],
    priority: FilePriority.DO_NOT_DOWNLOAD,
    progress: 0,
    size: 1000
  },
  'test1.txt'
)

const file_normal = new TreeFile(
  {
    availability: 1,
    index: 1,
    is_seed: true,
    name: 'test/test2.txt',
    piece_range: [0, 0],
    priority: FilePriority.NORMAL,
    progress: 1,
    size: 1000
  },
  'test2.txt'
)

const file_high = new TreeFile(
  {
    availability: 1,
    index: 2,
    is_seed: true,
    name: 'test/test3.txt',
    piece_range: [0, 0],
    priority: FilePriority.HIGH,
    progress: 1,
    size: 1000
  },
  'test3.txt'
)

const file_maximal = new TreeFile(
  {
    availability: 1,
    index: 3,
    is_seed: true,
    name: 'test/test4.txt',
    piece_range: [0, 0],
    priority: FilePriority.MAXIMAL,
    progress: 1,
    size: 1000
  },
  'test4.txt'
)

const folder = new TreeFolder('test', 'test')

beforeEach(() => {
  folder.children = []
})

test('getPriority', () => {
  expect(folder.getPriority()).toBe(FilePriority.DO_NOT_DOWNLOAD)

  folder.children = [file_unwanted, file_normal, file_high, file_maximal]
  expect(folder.getPriority()).toBe(FilePriority.MIXED)
})

test('getChildrenIds', () => {
  folder.children = [file_unwanted, file_normal, file_high, file_maximal]
  expect(folder.getChildrenIds()).toEqual([0, 1, 2, 3])
})

test('isSelected', () => {
  const selection = new Set<string>(['test', 'test/test1.txt'])
  expect(folder.isSelected(selection)).toBe(true)
  expect(file_unwanted.isSelected(selection)).toBe(true)
  expect(file_normal.isSelected(selection)).toBe(false)
  expect(file_high.isSelected(selection)).toBe(false)
  expect(file_maximal.isSelected(selection)).toBe(false)
})

test('isWanted', () => {
  folder.children = [file_unwanted, file_normal, file_high, file_maximal]
  expect(folder.isWanted()).toBe(null)

  folder.children = [file_normal, file_high, file_maximal]
  expect(folder.isWanted()).toBe(true)

  folder.children = [file_unwanted]
  expect(folder.isWanted()).toBe(false)
})

test('getProgress', () => {
  expect(folder.getProgress()).toBe(0)

  folder.children = [file_unwanted, file_normal, file_high, file_maximal]
  expect(folder.getProgress()).toBe(1)
})

test('getDeepCount', () => {
  expect(file_unwanted.getDeepCount()).toEqual([0, 1])

  expect(folder.getDeepCount()).toEqual([1, 0])

  folder.children = [file_unwanted, file_normal, file_high, file_maximal]
  expect(folder.getDeepCount()).toEqual([1, 4])
})

test('getSize', () => {
  expect(folder.getSize()).toBe(0)

  folder.children = [file_unwanted, file_normal, file_high, file_maximal]
  expect(folder.getSize()).toBe(4000)
})
