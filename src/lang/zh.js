const locale = {
  /** General */
  category: '分类',
  settings: '设置',

  /** Torrent */
  torrent: {
    title: '标题',
    added: '添加时间',
    availability: '可用性',
    size: '大小',
    progress: '进度'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '当前速率',
    freeSpace: '剩余磁盘空间',
    topActions: {
      addTorrent: '打开种子',
      resumeSelected: '继续选中的种子',
      pauseSelected: '暂停选中的种子',
      removeSelected: '删除选中的种子',
      openSettings: '打开设置',
      searchNew: '搜索新的种子'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: '添加新的种子',
      selectFiles: '选择文件'
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
    pause: '暂停',
    delete: '删除',
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
    copy: '赋值',
    info: '显示详情'
  }
}

export default locale
