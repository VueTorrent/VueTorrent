import { TorrentFile } from '@/types/qbit/models'
import { TreeFile, TreeFolder, TreeNode } from '@/types/vuetorrent'
import { computed, MaybeRefOrGetter, shallowRef, toValue, watchEffect } from 'vue'

function getEmptyRoot() {
  return new TreeFolder('(root)', '') // Only the 'fullName' of the '(root)' node can be an empty string.
}

export function useTreeBuilder(items: MaybeRefOrGetter<TorrentFile[]>, openedItems: MaybeRefOrGetter<string[]>) {
  const tree = shallowRef(getEmptyRoot())

  const flatTree = computed(() => {
    const flatten = (node: TreeNode, parentPath: string): TreeNode[] => {
      const path = parentPath === '' ? node.name : parentPath + '/' + node.name

      if (node.type === 'folder' && toValue(openedItems).includes(node.fullName)) {
        const children = node.children
          .toSorted((a: TreeNode, b: TreeNode) => {
            if (a.type === 'folder' && b.type === 'file') return -1
            if (a.type === 'file' && b.type === 'folder') return 1
            return a.name.localeCompare(b.name)
          })
          .flatMap(el => flatten(el, path))
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
        .replace('\\', '/')
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
              const newFolder = new TreeFolder(nodeName, nextPath)
              cursor.children.push(newFolder)
              cursor = newFolder
            }
          }

          return nextPath
        }, '')
    }

    tree.value = rootNode

    performance.mark('TreeBuilder::buildCache::start')
    rootNode.buildCache()
    performance.mark('TreeBuilder::buildCache::end')
    performance.measure('TreeBuilder::buildCache', 'TreeBuilder::buildCache::start', 'TreeBuilder::buildCache::end')
  }

  watchEffect(() => {
    performance.mark('TreeBuilder::buildTree::start')
    buildTree()
    performance.mark('TreeBuilder::buildTree::end')
    performance.measure('TreeBuilder::buildTree', 'TreeBuilder::buildTree::start', 'TreeBuilder::buildTree::end')
  })

  return { tree, flatTree }
}
