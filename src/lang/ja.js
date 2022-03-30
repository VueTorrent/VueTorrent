const locale = {
  /** General */
  category: 'カテゴリー',
  settings: '設定',
  pause: '停止',
  delete: '削除',
  save: '保存',
  cancel: 'キャンセル',
  confirm: '確認',

  /** Torrent */
  torrent: {
    title: 'タイトル',
    added: '追加日時',
    availability: '可用性',
    size: 'サイズ',
    progress: '進捗状況',
    directory: 'ディレクトリー',
    downloaded: 'ダウン量',
    uploaded: 'アップ量',
    created: '作成',
    comments: 'コメント'
  },
  /** Navbar */
  navbar: {
    currentSpeed: '速度',
    freeSpace: '空き容量',
    topActions: {
      addTorrent: 'Torrentを追加',
      resumeSelected: 'Torrentの再開',
      pauseSelected: 'Torrentの一時停止',
      removeSelected: 'Torrentの削除',
      openSettings: '設定',
      searchNew: 'Torrentの検索エンジン'
    },
    sessionStats: {
      tooltip: '最後の再起動からの時間'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: 'Torrentの追加',
      selectFiles: 'ファイルの選択'
    },
    delete: {
      check: 'ファイルを削除'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'ログインに成功しました! 🎉',
    loginFailed: 'ログインに失敗しました 😕',
    settingsSaved: '設定の保存に成功しました!',
    categorySaved: 'カテゴリーの編集に成功しました!'
  },

  /** RightClick **/
  rightClick: {
    resume: '再開',
    forceResume: '強制再開',
    advanced: {
      advanced: '高度',
      changeLocation: '場所を設定',
      rename: '名前を変更'
    },
    prio: {
      prio: '優先度を設定',
      top: '一番上へ',
      bottom: '一番下へ',
      increase: '上へ',
      decrease: '下へ'
    },
    category: 'カテゴリーを設定',
    limit: '制限を設定',
    copy: 'コピー',
    info: '情報'
  }
}

export default locale
