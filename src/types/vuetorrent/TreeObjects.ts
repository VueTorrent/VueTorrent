import {Priority} from "@/enums/qbit";

export interface TreeNode {
  /** Represents the type of the node */
  type: 'file' | 'folder' | 'root'
  /** Represents only the file/folder name */
  name: string
  /** Represents the full path of the file/folder (name included) */
  fullName: string
  /** Represents the ID of the node
   * the ID is the file index for a TreeFile
   * otherwise it's the node's fullName */
  id: string | number
}

export interface TreeFile extends TreeNode {
  type: 'file'
  /** File index */
  id: number
  /** file pieces currently available (percentage/100) */
  availability: number
  /** File index */
  index: number
  /** True if file is seeding/complete */
  is_seed: boolean
  /** File priority */
  priority: Priority
  /** File progress */
  progress: number
  /** File size in bytes */
  size: number
}

export interface TreeFolder extends TreeNode {
  type: 'folder'
  id: string
  children: TreeNode[]
}

export interface TreeRoot extends TreeNode {
  type: 'root'
  name: ''
  fullName: ''
  id: ''
  children: TreeNode[]
}
