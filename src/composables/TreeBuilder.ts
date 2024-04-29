import { TorrentFile } from '@/types/qbit/models'
import { TreeFile, TreeFolder } from '@/types/vuetorrent'
import { MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue'

function getEmptyRoot() {
  return new TreeFolder('(root)', '') // Only the 'fullName' of the '(root)' node can be an empty string.
}

export function useTreeBuilder(items: MaybeRefOrGetter<TorrentFile[]>) {
  const tree = ref(getEmptyRoot())

  /// start watchEffect ///
  watchEffect(() => {
    const rootNode = getEmptyRoot()
    const files = toValue(items) ?? []

    for (const file of files) {
      let cursor = rootNode
      file.name
        .replace('\\', '/')
        .split('/')
        .reduce((parentPath, nodeName) => {
          const nextPath = parentPath === '' ? nodeName : parentPath + '/' + nodeName

          if (file.name.replace('\\', '/').split('/').pop() === nodeName) {
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
  })
  /// end watchEffect ///

  return { tree }
}
