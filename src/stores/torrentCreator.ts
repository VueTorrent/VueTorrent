import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import qbit from '@/services/qbit'
import { TorrentCreatorTaskStatus } from '@/constants/qbit'
import { TorrentCreatorParams, TorrentCreatorTask } from '@/types/qbit/models'
import { AddTorrentPayload } from '@/types/qbit/payloads'
import { useTorrentStore } from './torrents'
import { useMaindataStore } from './maindata'

export const useTorrentCreatorStore = defineStore('torrentCreator', () => {
  const tasks = ref<TorrentCreatorTask[]>([])

  async function fetchTasks() {
    tasks.value = await qbit.getTorrentCreatorStatus()
  }

  async function createTask(params: TorrentCreatorParams) {
    const taskID = await qbit.addTorrentCreatorTask(params)
    
    // If auto-add is enabled, set up monitoring for when the task completes
    if (params.autoAddToClient) {
      void monitorTaskForAutoAdd(taskID, params)
    }
    
    return taskID
  }

  async function monitorTaskForAutoAdd(taskID: string, params: TorrentCreatorParams) {
    const torrentStore = useTorrentStore()
    const maindataStore = useMaindataStore()
    
    // Poll the task status until it's finished
    const checkInterval = setInterval(async () => {
      try {
        const taskStatus = await qbit.getTorrentCreatorStatus(taskID)
        const task = taskStatus.find(t => t.taskID === taskID)
        
        if (!task) {
          clearInterval(checkInterval)
          return
        }
        
        if (task.status === TorrentCreatorTaskStatus.FINISHED) {
          clearInterval(checkInterval)
          
          try {
            // Download the created torrent file
            const torrentBlob = await qbit.getTorrentCreatorOutput(taskID)
            const fileName = task.sourcePath ? 
              `${task.sourcePath.split('/').pop() || 'torrent'}.torrent` : 
              'torrent.torrent'
            const torrentFile = new File([torrentBlob], fileName, {
              type: 'application/x-bittorrent'
            })
            
            // Prepare add torrent payload with the specified category, tags, and auto-TMM
            const addPayload: AddTorrentPayload = {}
            if (params.addCategory) {
              addPayload.category = params.addCategory
            }
            if (params.addTags && params.addTags.length > 0) {
              addPayload.tags = params.addTags.join(',')
            }
            if (params.addUseAutoTmm !== undefined) {
              addPayload.autoTMM = params.addUseAutoTmm
            }
            
            // Add the torrent to qBittorrent
            await torrentStore.addTorrents([torrentFile], '', addPayload)
            
            // Force sync to get the new torrent in the list
            maindataStore.forceMaindataSync()
            
            // Show success notification
            const categoryText = params.addCategory ? ` (Category: ${params.addCategory})` : ''
            const tagsText = params.addTags && params.addTags.length > 0 ? ` (Tags: ${params.addTags.join(', ')})` : ''
            const autoTmmText = params.addUseAutoTmm ? ' (Auto-TMM enabled)' : ''
            
            toast.success(`Torrent automatically added to qBittorrent${categoryText}${tagsText}${autoTmmText}`)
          } catch (error) {
            console.error('Failed to auto-add created torrent:', error)
            toast.error('Failed to automatically add created torrent to qBittorrent')
          }
        } else if (task.status === TorrentCreatorTaskStatus.FAILED) {
          clearInterval(checkInterval)
          if (task.errorMessage) {
            toast.error(`Torrent creation failed: ${task.errorMessage}`)
          }
        }
      } catch (error) {
        console.error('Error monitoring torrent creation task:', error)
        clearInterval(checkInterval)
      }
    }, 2000) // Check every 2 seconds
    
    // Clear interval after 10 minutes to prevent infinite polling
    setTimeout(() => {
      clearInterval(checkInterval)
    }, 10 * 60 * 1000)
  }

  async function deleteTask(taskID: string) {
    return await qbit.deleteTorrentCreatorTask(taskID)
  }

  async function downloadTorrent(taskID: string) {
    return await qbit.getTorrentCreatorOutput(taskID)
  }

  return {
    tasks,
    fetchTasks,
    createTask,
    deleteTask,
    downloadTorrent,
  }
})
