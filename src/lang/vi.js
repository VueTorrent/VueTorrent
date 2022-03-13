const locale = {
  /** General */
  category: 'thể loại',
  settings: 'cài đặt',
  pause: 'tạm dừng',
  delete: 'xóa',
  save: 'lưu',
  cancel: 'dừng',
  confirm: 'xác nhận',

  /** Torrent */
  torrent: {
    title: 'tên',
    added: 'added on',
    availability: 'khả dụng',
    size: 'kích thước',
    progress: 'thực hiện',
    directory: 'đường dẫn',
    downloaded: 'tải xuống',
    uploaded: 'tải lên',
    created: 'tạo ra bởi',
    comments: 'đánh giá'
  },
  /** Navbar */
  navbar: {
    currentSpeed: 'tốc độ hiện tại',
    freeSpace: 'bộ nhớ trống',
    topActions: {
      addTorrent: 'thêm torrent',
      resumeSelected: 'tiếp tục các torrent đã chọn',
      pauseSelected: 'dừng các torrent đã chọn',
      removeSelected: 'gỡ các torrent đã chọn',
      openSettings: 'mở cài đặt',
      searchNew: 'tìm torrent mới'
    },
    sessionStats: {
      tooltip: 'Kể từ lần cuối qBittorent được khởi động lại'
    }
  },

  /** Modals */
  modals: {
    add: {
      title: 'Thêm một torrent mới',
      selectFiles: 'Chọn tệp của bạn'
    },
    delete: {
      check: 'Đồng thời xóa luôn tệp dưới bộ nhớ'
    }
  },

  /** Toast */
  toast: {
    loginSuccess: 'Đăng nhập thành công! 🎉',
    loginFailed: 'Đăng nhập thất bại 😕',
    settingsSaved: 'Cài đặt đã lưu thành công!',
    categorySaved: 'Thể loại đã chỉnh sửa thành công!'
  },

  /** RightClick **/
  rightClick: {
    resume: 'tiếp tục',
    forceResume: 'bắt tiếp tục',
    advanced: {
      advanced: 'nâng cao',
      changeLocation: 'thay đổi vị trí',
      rename: 'thay đổi tên'
    },
    prio: {
      prio: 'xét sự ưu tiên',
      top: 'trên cùng',
      bottom: 'dưới cùng',
      increase: 'tăng',
      decrease: 'giảm'
    },
    category: 'thiết lập thể loại',
    limit: 'thiết lập giới hạn',
    copy: 'sao chép',
    info: 'xem thông tin'
  }
}

export default locale
