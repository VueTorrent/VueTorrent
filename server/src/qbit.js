const api = require('qbittorrent-api');
const Torrent = require('./models/torrent.class.js');
const Stat = require('./models/stat.class.js');

const info = require('./config/config.json');

//server
const qbt = api.connect(info.qbit_host, info.qbit_user, info.qbit_pass);

class Qbit {
  async get_all(prop) {
    return new Promise((resolve, reject) => {
      qbt.all({sort: prop.name, reverse: prop.reverse}, (err, res) => {
        let torrents = [];
        res.forEach(el => {
          //console.log(el);
          const t = new Torrent(el);
          torrents.push(t);
        });
        //console.log(torrents[0]);
        resolve(torrents);
        reject(err);
      });
    });
  }

  async get_session_stats() {
    return new Promise((resolve, reject) => {
      qbt.transferInfo((err, res) => {
        let stat = new Stat(res);
        //console.log(stat);
        resolve(stat);
        reject('something went wrong:' + err);
      });
    });
  }

  async pause_torrents(torrents) {
    return new Promise((resolve, reject) => {
      qbt.pause(torrents, (err, res) => {
        resolve(res);
        reject('something went wrong:' + err);
      });
    });
  }

  async pause_all() {
    return new Promise((resolve, reject) => {
      qbt.pauseAll((err, res) => {
        resolve(res);
        reject('something went wrong:' + err);
      });
    });
  }

  async resume_torrents(torrents) {
    return new Promise((resolve, reject) => {
      qbt.resume(torrents, (err, res) => {
        resolve(res);
        reject('something went wrong:' + err);
      });
    });
  }

  async resume_all() {
    return new Promise((resolve, reject) => {
      qbt.resumeAll((err, res) => {
        resolve(res);
        reject('something went wrong:' + err);
      });
    });
  }

  async remove_torrents(torrents) {
    return new Promise((resolve, reject) => {
      qbt.delete(torrents, (err, res) => {
        resolve(res);
        reject('something went wrong:' + err);
      });
    });
  }

  async add(torrent) {
    return new Promise((resolve, reject) => {
      qbt.add(torrent.path, null, null, (err, res) => {
        resolve(res);
        reject(err);
      });
    });
  }
}

const qbit = new Qbit();

module.exports = qbit;
