const locale = {
  /** General */
  category: '分類',
  settings: '設置',
  pause: '暫停',
  delete: '刪除',
  save: '儲存',
  cancel: '取消',
  confirm: '確認',

  /** Torrent */
  torrent: {
    title: '標題',
    added: '添加時間',
    availability: '可用性',
    size: '大小',
    progress: '進度',
    directory: '目錄',
    downloaded: '下載量',
    uploaded: '上載量',
    created: '製作程式',
    comments: '注釋'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '當前速率',
    freeSpace: '剩餘磁碟空間',
    topActions: {
      addTorrent: '打開種子',
      resumeSelected: '繼續選中種子',
      pauseSelected: '暫停選中種子',
      removeSelected: '刪除選中種子',
      openSettings: '打開設置',
      searchNew: '搜尋新種子'
    },
    sessionStats: {
      tooltip: '自 qBittorrent 上次重新啟動以來'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: '添加新的種子',
      selectFiles: '選擇檔案'
    },
    delete: {
      check: '同時從記憶體上刪除'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: '登入成功！🎉',
    loginFailed: '登入失敗…😕',
    settingsSaved: '設置儲存成功！',
    categorySaved: '分類編輯成功！'
  },

  /** RightClick **/
  rightClick: {
    resume: '繼續',
    forceResume: '強制繼續',
    advanced: {
      advanced: '進階',
      changeLocation: '修改儲存位置',
      rename: '重新命名'
    },
    prio: {
      prio: '設置優先級',
      top: '最高',
      bottom: '最低',
      increase: '提升',
      decrease: '降低'
    },
    category: '設置分類',
    limit: '設置限制',
    copy: '複製…',
    info: '顯示詳情'
  }
} 

export default locale
