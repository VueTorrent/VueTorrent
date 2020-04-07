const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const qbit = require('./qbit')

dotenv.config()

const PORT = process.env.PORT || 3000

const newest_torrent = {
  name: '',
  path: '',
}

const upload = multer({
  dest: './src/tmp/',
})

// init express
const app = express()

app.use(express.json())
app.use(express.static('dist'))

// requests
// login
app.post('/login', (req, res) => {
  console.log(req.body)
  if (req.body.username !== process.env.VUE_APP_WEB_USER) {
    return res.send('No such user')
  } if (
    req.body.username === process.env.VUE_APP_WEB_USER
    && req.body.password !== process.env.VUE_APP_WEB_PASS
  ) {
    return res.send('Wrong password!')
  } if (
    req.body.username === process.env.VUE_APP_WEB_USER
    && req.body.password === process.env.VUE_APP_WEB_PASS
  ) {
    return res.send('SUCCES')
  }
  return res.send('Something went wrong')
})

// get all torrents
// AAAND sort torrents
app.post('/all', async (req, res) => {
  const torrents = await qbit.get_all(req.body)
  res.set('Content-Type', 'application/json')
  res.send(torrents)
})

// get session stats
app.get('/session', async (req, res) => {
  const stats = await qbit.get_session_stats()
  res.set('Content-Type', 'application/json')
  res.send(stats)
})

// pause selected torrents
app.post('/pause', async (req, res) => {
  // console.log(req.body);
  const msg = await qbit.pause_torrents(req.body)
  return res.send(msg)
})

// pause all torrents
app.post('/pause_all', async (req, res) => {
  const msg = await qbit.pause_all()
  return res.send(msg)
})

// resume selected torrents
app.post('/resume', async (req, res) => {
  // console.log(req.body);
  const msg = await qbit.resume_torrents(req.body)
  return res.send(msg)
})

// resume all torrents
app.post('/resume_all', async (req, res) => {
  const msg = await qbit.resume_all()
  return res.send(msg)
})

// remove selected torrents
app.post('/remove', async (req, res) => {
  // console.log(req.body);
  const msg = await qbit.remove_torrents(req.body)
  return res.send(msg)
})

// upload files to server
app.post('/upload', upload.single('file'), (req, res) => {
  newest_torrent.name = req.file.filename
  newest_torrent.path = req.file.path
  return res.send('succes')
})

// add a torrent
app.post('/add', async (req, res) => {
  const msg = await qbit.add(newest_torrent)
  fs.unlinkSync(newest_torrent.path)
  return res.send(msg)
})

// delete last uploaded file
app.delete('/upload', upload.single('file'), (req, res) => {
  fs.unlinkSync(newest_torrent.path)
  return res.send('deleted file')
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))

// clear the tmp directory on every boot
const directory = path.resolve(`${__dirname}/tmp`)

fs.readdir(directory, (err, files) => {
  if (err) console.log(err)
  for (const file of files) {
    fs.unlink(path.join(directory, file), (err) => {
      if (err) console.log(err)
    })
  }
})
