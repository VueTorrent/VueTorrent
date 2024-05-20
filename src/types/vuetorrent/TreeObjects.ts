import { FilePriority } from '@/constants/qbit'
import { TorrentFile } from '@/types/qbit/models'

export type TreeNode = TreeFile | TreeFolder

export class TreeFile {
  /** Represents the type of the node */
  type: 'file'
  /** File index */
  id: number
  /** File full name (relative path + name) */
  fullName: string
  /** File name with extension */
  name: string
  /** File pieces currently available (percentage/100) */
  availability: number
  /** File priority */
  priority: FilePriority
  /** File progress */
  progress: number
  /** File size in bytes */
  size: number

  get childrenIds(): number[] {
    return [this.id]
  }
  get wanted(): boolean | null {
    return this.priority !== FilePriority.DO_NOT_DOWNLOAD
  }
  deepCount: [number, number] = [0, 1]

  constructor(file: TorrentFile, filename: string) {
    this.type = 'file'
    this.name = filename

    this.id = file.index
    this.fullName = file.name
    this.availability = file.availability
    this.priority = file.priority
    this.progress = file.progress
    this.size = file.size
  }

  buildCache() {}

  getPriority(): FilePriority {
    return this.priority
  }

  getChildrenIds(): number[] {
    return [this.id]
  }

  isSelected(selection: Set<string>): boolean {
    return selection.has(this.fullName)
  }

  isWanted(): boolean {
    return this.priority !== FilePriority.DO_NOT_DOWNLOAD
  }

  getProgress(): number {
    return this.progress
  }

  getDeepCount(): [number, number] {
    return [0, 1]
  }

  getSize(): number {
    return this.size
  }
}

export class TreeFolder {
  /** Represents the type of the node */
  type: 'folder'
  /** Node full name */
  id: string
  fullName: string
  name: string
  children: TreeNode[]

  // cached properties
  priority: FilePriority = FilePriority.DO_NOT_DOWNLOAD
  childrenIds: number[] = []
  wanted: boolean | null = null
  progress: number = 0
  deepCount: [number, number] = [1, 0]
  size: number = 0

  constructor(name: string, fullName: string) {
    this.type = 'folder'
    this.id = fullName
    this.fullName = fullName
    this.name = name
    this.children = []
  }

  buildCache() {
    if (this.children.length === 0) return

    const start = performance.now()
    this.children.forEach(child => {
      child.buildCache()
    })

    this.priority = this.children
      .map(child => child.priority!)
      .reduce((prev, curr) => {
        if (prev === FilePriority.MIXED || prev === curr) return prev
        return FilePriority.MIXED
      })

    this.childrenIds = this.children.map(child => child.childrenIds ?? []).flat()

    this.wanted = this.children
      .map(child => child.wanted)
      .reduce((prev, curr) => {
        if (prev === null || prev === curr) return prev
        return null
      })

    const values = this.children.map(child => child.progress!)
    if (values.length === 0) {
      this.progress = 0
    } else {
      this.progress = values.reduce((prev, curr) => prev + curr, 0) / values.length
    }

    this.deepCount = this.children
      .map(child => child.deepCount!)
      .reduce(
        (prev, curr) => {
          return [prev[0] + curr[0], prev[1] + curr[1]]
        },
        [1, 0]
      )

    this.size = this.children.map(child => child.size!).reduce((prev, curr) => prev + curr, 0)

    this.fullName === '' && console.log('root cache built in', performance.now() - start, 'ms')
  }

  getPriority(): FilePriority {
    if (this.children.length === 0) return FilePriority.DO_NOT_DOWNLOAD
    return this.children
      .map(child => child.getPriority())
      .reduce((prev, curr) => {
        if (prev === FilePriority.MIXED || prev === curr) return prev
        return FilePriority.MIXED
      })
  }

  getChildrenIds(): number[] {
    return this.children.map(child => child.getChildrenIds()).flat()
  }

  isSelected(selection: Set<string>): boolean {
    return selection.has(this.fullName)
  }

  isWanted(): boolean | null {
    const children = this.children.map(child => child.isWanted())

    const indeterminate = children.filter(child => child === null).length
    const wanted = children.filter(child => child === true).length
    const unwanted = children.filter(child => child === false).length

    if (indeterminate > 0) return null
    if (wanted > 0 && unwanted > 0) return null
    if (wanted > 0) return true
    if (unwanted > 0) return false
    return null
  }

  getProgress(): number {
    const values = this.children.filter(child => child.getPriority() !== FilePriority.DO_NOT_DOWNLOAD).map(child => child.getProgress())

    if (values.length === 0) return 0
    return values.reduce((prev, curr) => prev + curr, 0) / values.length
  }

  getDeepCount(): [number, number] {
    const [folders, files] = this.children
      .map(child => child.getDeepCount())
      .reduce(
        (prev, curr) => {
          return [prev[0] + curr[0], prev[1] + curr[1]]
        },
        [0, 0]
      )
    return [folders + 1, files]
  }

  getSize(): number {
    return this.children.map(child => child.getSize()).reduce((prev, curr) => prev + curr, 0)
  }
}
