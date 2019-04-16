const express = require('express');
const qbit = require('./qbit');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const info = require('./config/config.json');

let newest_torrent = {
  name: '',
  path: ''
};

const upload = multer({
  dest: './src/tmp/'
});

//init express
const app = express();

app.use(express.json());
app.use(express.static('./src/dist'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'DELETE');
  next();
});

//requests

//login
app.post('/login', (req, res) => {
  if (req.body.username !== info.web_user) {
    return res.send('No such user');
  } else if (
    req.body.username === info.web_user &&
    req.body.password !== info.web_pass
  ) {
    return res.send('Wrong password!');
  } else if (
    req.body.username === info.web_user &&
    req.body.password === info.web_pass
  ) {
    return res.send('SUCCES');
  } else {
    return res.send('Something went wrong');
  }
});

//get all torrents
//AAAND sort torrents
app.post('/all', async (req, res) => {
  let torrents = await qbit.get_all(req.body);
  res.set('Content-Type', 'application/json');
  res.send(torrents);
});

//get session stats
app.get('/session', async (req, res) => {
  let stats = await qbit.get_session_stats();
  res.set('Content-Type', 'application/json');
  res.send(stats);
});

//pause selected torrents
app.post('/pause', async (req, res) => {
  // console.log(req.body);
  let msg = await qbit.pause_torrents(req.body);
  return res.send(msg);
});

//pause all torrents
app.post('/pause_all', async (req, res) => {
  let msg = await qbit.pause_all();
  return res.send(msg);
});

//resume selected torrents
app.post('/resume', async (req, res) => {
  //console.log(req.body);
  let msg = await qbit.resume_torrents(req.body);
  return res.send(msg);
});

//resume all torrents
app.post('/resume_all', async (req, res) => {
  let msg = await qbit.resume_all();
  return res.send(msg);
});

//remove selected torrents
app.post('/remove', async (req, res) => {
  //console.log(req.body);
  let msg = await qbit.remove_torrents(req.body);
  return res.send(msg);
});

//upload files to server
app.post('/upload', upload.single('file'), (req, res) => {
  newest_torrent.name = req.file.filename;
  newest_torrent.path = req.file.path;
  return res.send('succes');
});

//add a torrent
app.post('/add', async (req, res) => {
  let msg = await qbit.add(newest_torrent);
  fs.unlinkSync(newest_torrent.path);
  return res.send(msg);
});

//delete last uploaded file
app.delete('/upload', upload.single('file'), (req, res) => {
  fs.unlinkSync(newest_torrent.path);
  return res.send('deleted file');
});

app.listen(3000, () => console.log(`Server listening on port 3000!`));

//clear the tmp directory on every boot
const directory = path.resolve(__dirname + '/tmp');

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});
