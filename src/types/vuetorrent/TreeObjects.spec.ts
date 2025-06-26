import { beforeEach, expect, test } from 'vitest'
import { TreeFile, TreeFolder } from './TreeObjects'
import { FilePriority } from '@/constants/qbit'

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
  folder.buildCache()
})

describe('TreeObjects', () => {
  test('getPriority', () => {
    expect(folder.priority).toBe(FilePriority.DO_NOT_DOWNLOAD)

    folder.children = [file_unwanted, file_normal, file_high, file_maximal]
    folder.buildCache()
    expect(folder.priority).toBe(FilePriority.MIXED)
  })

  test('getChildrenIds', () => {
    folder.children = [file_unwanted, file_normal, file_high, file_maximal]
    folder.buildCache()
    expect(folder.childrenIds).toEqual([0, 1, 2, 3])
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
    // Mixed
    folder.children = [file_unwanted, file_normal, file_high, file_maximal]
    folder.buildCache()
    expect(folder.wanted).toBe(true)

    // Selected
    folder.children = [file_normal, file_high, file_maximal]
    folder.buildCache()
    expect(folder.wanted).toBe(true)

    // Skipped
    folder.children = [file_unwanted]
    folder.buildCache()
    expect(folder.wanted).toBe(false)
  })

  test('getProgress', () => {
    expect(folder.progress).toBe(0)

    folder.children = [file_unwanted, file_normal, file_high, file_maximal]
    folder.buildCache()
    expect(folder.progress).toBe(1)
  })

  test('getDeepCount', () => {
    expect(file_unwanted.deepCount).toEqual([0, 1])

    expect(folder.deepCount).toEqual([1, 0])

    folder.children = [file_unwanted, file_normal, file_high, file_maximal]
    folder.buildCache()
    expect(folder.deepCount).toEqual([1, 4])
  })

  test('getSize', () => {
    expect(folder.size).toBe(0)

    folder.children = [file_unwanted, file_normal, file_high, file_maximal]
    folder.buildCache()
    expect(folder.size).toBe(4000)
  })
})
