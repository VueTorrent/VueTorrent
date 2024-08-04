window.onerror = function (msg, url, line, col, error) {
  // Note that col & error are new to the HTML 5 spec and may not be
  // supported in every browser.  It worked for me in Chrome.
  let extra = !col ? '' : '\ncolumn: ' + col
  extra += !error ? '' : '\nerror: ' + error

  // You can view the information in an alert to see things working like this:
  alert('Error: ' + msg + '\nurl: ' + url + '\nline: ' + line + extra)

  // If you return true, then error alerts (like in older versions of
  // Internet Explorer) will be suppressed.
  return true
}