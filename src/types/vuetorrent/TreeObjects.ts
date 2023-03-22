export interface TreeNode {
  name: string
  fullName: string
  children: TreeNode[]
  type: 'file' | 'directory'
}

export interface TreeFile extends TreeNode {
  id: number
  progress: number
  size: string
  icon: string
  priority: number
  type: 'file'
}

export interface TreeFolder extends TreeNode {
  type: 'directory'
}
