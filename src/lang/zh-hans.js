const locale = {
  /** General */
  category: '分类',
  settings: '设置',
  pause: '暂停',
  delete: '删除',
  save: '保存',
  cancel: '取消',
  confirm: '确认',

  /** Torrent */
  torrent: {
    title: '标题',
    added: '添加时间',
    availability: '可用性',
    size: '大小',
    progress: '进度',
    directory: '目录',
    downloaded: '下载量',
    uploaded: '上传量',
    created: '制作程序',
    comments: '注释'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '当前速率',
    freeSpace: '剩余磁盘空间',
    topActions: {
      addTorrent: '打开种子',
      resumeSelected: '继续选中种子',
      pauseSelected: '暂停选中种子',
      removeSelected: '删除选中种子',
      openSettings: '打开设置',
      searchNew: '搜索新种子'
    },
    sessionStats: {
      tooltip: '自 qBittorrent 上次重启以来'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: '添加新的种子',
      selectFiles: '选择文件'
    },
    delete: {
      check: '同时从存储中删除'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: '登录成功！🎉',
    loginFailed: '登录失败…😕',
    settingsSaved: '设置保存成功！',
    categorySaved: '分类编辑成功！'
  },

  /** RightClick **/
  rightClick: {
    resume: '继续',
    forceResume: '强制继续',
    advanced: {
      advanced: '高级',
      changeLocation: '修改保存位置',
      rename: '重命名'
    },
    prio: {
      prio: '设置优先级',
      top: '最高',
      bottom: '最低',
      increase: '提升',
      decrease: '降低'
    },
    category: '设置分类',
    limit: '设置限制',
    copy: '复制…',
    info: '显示详情'
  }
}

export default locale
