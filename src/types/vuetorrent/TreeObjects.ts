import { FilePriority } from '@/constants/qbit'
import { TorrentFile } from '@/types/qbit/models'

export type TreeNode = TreeFile | TreeFolder

export class TreeFile {
  /** Represents the type of the node */
  type: 'file'
  /** File index */
  id: number
  /** File name with extension */
  name: string
  /** File full name (relative path + name) */
  fullName: string
  /** File pieces currently available (percentage/100) */
  availability: number
  /** True if file is seeding/complete */
  is_seed: boolean
  /** File priority */
  priority: FilePriority
  /** File progress */
  progress: number
  /** File size in bytes */
  size: number

  constructor(file: TorrentFile, filename: string) {
    this.type = 'file'
    this.name = filename

    this.id = file.index
    this.fullName = file.name
    this.availability = file.availability
    this.is_seed = file.is_seed
    this.priority = file.priority
    this.progress = file.progress
    this.size = file.size
  }

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

  constructor(name: string, fullName: string) {
    this.type = 'folder'
    this.id = fullName
    this.fullName = fullName
    this.name = name
    this.children = []
  }

  getPriority(): FilePriority {
    if (this.children.length === 0) return FilePriority.DO_NOT_DOWNLOAD
    return this.children.map(child => child.getPriority()).reduce((prev, curr) => {
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
    const values = this.children
    .filter(child => child.getPriority() !== FilePriority.DO_NOT_DOWNLOAD)
    .map(child => child.getProgress())

    if (values.length === 0) return 0
    return values.reduce((prev, curr) => prev + curr, 0) / values.length
  }

  getDeepCount(): [number, number] {
    const [folders, files] = this.children.map(child => child.getDeepCount()).reduce((prev, curr) => {
      return [prev[0] + curr[0], prev[1] + curr[1]]
    }, [0, 0])
    return [folders + 1, files]
  }

  getSize(): number {
    return this.children.map(child => child.getSize()).reduce((prev, curr) => prev + curr, 0)
  }
}
