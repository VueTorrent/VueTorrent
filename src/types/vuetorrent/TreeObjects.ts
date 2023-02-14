export interface TreeNode {
  name: string
  fullName: string
  children: TreeNode[]
}

export interface TreeFile extends TreeNode {
  id: number
  progress: number
  size: string
  icon: string
  priority: number
}

export interface TreeFolder extends TreeNode {
  type: 'directory'
}
