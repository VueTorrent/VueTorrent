import { TorrentFile } from '@/types/qbit/models'
import { TreeFile, TreeFolder, TreeRoot } from '@/types/vuetorrent'
import { MaybeRefOrGetter, ref, toValue, watchEffect } from 'vue'

function getEmptyRoot(): TreeRoot {
  return {
    type: 'root',
    name: '',
    fullName: '',
    id: '',
    children: []
  }
}

export function useTreeBuilder(items: MaybeRefOrGetter<TorrentFile[]>) {
  const tree = ref(getEmptyRoot())

  /// start watchEffect ///
  watchEffect(() => {
    const rootNode = getEmptyRoot()
    const files = toValue(items) ?? []

    for (const file of files) {
      let cursor: TreeRoot | TreeFolder = rootNode
      file.name
        .replace('\\', '/')
        .split('/')
        .reduce((parentPath, nodeName) => {
          const nextPath = parentPath === '' ? nodeName : parentPath + '/' + nodeName

          if (file.name.replace('\\', '/').split('/').pop() === nodeName) {
            const newFile: TreeFile = {
              type: 'file',
              name: nodeName,
              fullName: nextPath,
              id: file.index,
              availability: file.availability,
              index: file.index,
              is_seed: file.is_seed,
              priority: file.priority,
              progress: file.progress,
              size: file.size
            }
            cursor.children.push(newFile)
          } else {
            const folder = cursor.children.find(el => el.name === nodeName) as TreeFolder | undefined
            if (folder) {
              cursor = folder
            } else {
              // if not found, create folder and set cursor to folder
              const newFolder: TreeFolder = {
                type: 'folder',
                name: nodeName,
                fullName: nextPath,
                id: nextPath,
                children: []
              }
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