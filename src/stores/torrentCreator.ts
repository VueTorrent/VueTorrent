import qbit from '@/services/qbit'
import { TorrentCreatorParams, TorrentCreatorTask } from '@/types/qbit/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTorrentCreatorStore = defineStore('torrentCreator', () => {
  const tasks = ref<TorrentCreatorTask[]>([])

  async function fetchTasks() {
    tasks.value = await qbit.getTorrentCreatorStatus()
  }

  async function createTask(params: TorrentCreatorParams) {
    return await qbit.addTorrentCreatorTask(params)
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
    downloadTorrent
  }
})
