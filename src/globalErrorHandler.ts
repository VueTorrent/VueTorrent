window.onerror = function (msg, url, line, col, error) {
  let extra = ''

  // only add 'col' and 'error' if they are available
  col && (extra += '\ncolumn: ' + col)
  error && (extra += '\nerror: ' + error)

  const final_message = 'Error: ' + msg + '\nurl: ' + url + '\nline: ' + line + extra

  if (sessionStorage.getItem('vuetorrent_mounted') === 'true') {
    console.error(final_message)
  } else {
    alert(final_message)
  }
}
