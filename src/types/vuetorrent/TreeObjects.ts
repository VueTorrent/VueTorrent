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

  get selectedSize(): number {
    return this.wanted ? this.size : 0
  }
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

  isSelected(selection: Set<string>): boolean {
    return selection.has(this.fullName)
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
  selectedSize: number = 0

  constructor(name: string, fullName: string) {
    this.type = 'folder'
    this.id = fullName
    this.fullName = fullName
    this.name = name
    this.children = []
  }

  buildCache() {
    if (this.children.length === 0) {
      this.priority = FilePriority.DO_NOT_DOWNLOAD
      this.childrenIds = []
      this.wanted = null
      this.progress = 0
      this.deepCount = [1, 0]
      this.size = 0
      this.selectedSize = 0
      return
    }

    this.children.forEach(child => {
      child.buildCache()
    })

    this.priority = this.children
      .map(child => child.priority)
      .reduce((prev, curr) => {
        if (prev === FilePriority.MIXED || prev === curr) return prev
        return FilePriority.MIXED
      })

    this.childrenIds = this.children.map(child => child.childrenIds ?? []).flat()

    this.wanted = this.children.map(child => child.wanted).some(Boolean)

    const wantedChildren = this.children.filter(child => child.wanted)
    if (wantedChildren.length === 0) {
      this.progress = 0
    } else {
      // Downloaded / total
      const result = wantedChildren.reduce((prev, child) => [prev[0] + child.selectedSize * child.progress, prev[1] + child.selectedSize], [0, 0])
      this.progress = result[0] / result[1]
    }

    this.deepCount = this.children
      .map(child => child.deepCount)
      .reduce(
        (prev, curr) => {
          return [prev[0] + curr[0], prev[1] + curr[1]]
        },
        [1, 0]
      )

    this.size = this.children.map(child => child.size!).reduce((prev, curr) => prev + curr, 0)
    this.selectedSize = this.children.filter(child => child.wanted).map(child => child.selectedSize!).reduce((prev, curr) => prev + curr, 0)
  }

  isSelected(selection: Set<string>): boolean {
    return selection.has(this.fullName)
  }
}
