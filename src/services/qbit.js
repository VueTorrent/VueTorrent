import {timingSafeEqual} from 'crypto';

const axios = require('axios');

class Qbit {
  constructor() {
    this._axios = axios.create({
      baseURL: 'http://localhost:3009',
      timeout: 1000
    });
  }
  async getAll(sort) {
    let res = await this._axios.post('/all', sort);
    return res.data;
  }

  async get_sessions_stats() {
    let res = await this._axios.get('/session');
    return res.data;
  }

  async pause_torrents(torrents) {
    let res = await this._axios.post('/pause', torrents);
    return res.data;
  }

  async pause_all() {
    let res = await this._axios.post('/pause_all');
    return res.data;
  }

  async resume_torrents(torrents) {
    let res = await this._axios.post('/resume', torrents);
    return res.data;
  }

  async resume_all() {
    let res = await this._axios.post('/resume_all');
    return res.data;
  }

  async add_torrent(torrent) {
    let res = await this._axios.post('/add', torrent);
    return res;
  }

  async remove_torrents(torrents) {
    let res = await this._axios.post('/remove', torrents);
    return res.data;
  }

  async login(credentials) {
    let res = await this._axios.post('/login', credentials);
    return res.data;
  }
}

const qbit = new Qbit();

export default qbit;
