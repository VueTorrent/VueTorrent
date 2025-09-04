import toSorted from 'array.prototype.tosorted'
import { computed, MaybeRefOrGetter, shallowRef, toValue, watchEffect } from 'vue'
import { comparators } from '@/helpers'
import { type TorrentFile, TreeFile, TreeFolder, TreeNode } from '@/types/vuetorrent'

function getEmptyRoot() {
  return new TreeFolder('', '(root)', '')
}

export function useTreeBuilder(items: MaybeRefOrGetter<TorrentFile[]>, openedItems: MaybeRefOrGetter<Set<string>>) {
  const tree = shallowRef(getEmptyRoot())

  const flatTree = computed(() => {
    function flatten(node: TreeNode, parentPath: string): TreeNode[] {
      const path = parentPath === '' ? node.name : parentPath + '/' + node.name

      if (node.type === 'folder' && toValue(openedItems).has(node.fullName)) {
        const children = toSorted(node.children, (a: TreeNode, b: TreeNode) => {
          if (a.type === 'folder' && b.type === 'file') return -1
          if (a.type === 'file' && b.type === 'folder') return 1
          return comparators.textWithNumbers.asc(a.name, b.name)
        }).flatMap(el => flatten(el, path))
        return [node, ...children]
      } else {
        return [node]
      }
    }

    return flatten(tree.value, '')
  })

  function buildTree() {
    const rootNode = getEmptyRoot()
    const files = toValue(items) ?? []

    for (const file of files) {
      let cursor = rootNode
      file.name
        .replace(/\\/g, '/')
        .split('/')
        .reduce((parentPath, nodeName) => {
          const nextPath = parentPath === '' ? nodeName : parentPath + '/' + nodeName

          if (parentPath === file.name.substring(0, file.name.lastIndexOf('/'))) {
            cursor.children.push(new TreeFile(file, nodeName))
          } else {
            const folder = cursor.children.find(el => el.name === nodeName) as TreeFolder | undefined
            if (folder) {
              cursor = folder
            } else {
              const newFolder = new TreeFolder(file.hash, nodeName, nextPath)
              cursor.children.push(newFolder)
              cursor = newFolder
            }
          }

          return nextPath
        }, '')
    }

    tree.value = rootNode

    rootNode.buildCache()
  }

  watchEffect(() => {
    buildTree()
  })

  return { tree, flatTree }
}
