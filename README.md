# VueTorrent


<p>
<img align="right" width="200px" src="https://imgur.com/x6dKNB3.png">   

<p>&nbsp;</p>
The sleekest looking WebUI for qBittorrent made with Vue.js!  

> Vue, qBittorrent, Vuetify
</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p align="center">
      <a href="https://img.shields.io/github/stars/WDaan/VueTorrent" alt="stars">
        <img src="https://img.shields.io/github/stars/WDaan/VueTorrent" /></a>
      <a href="https://img.shields.io/github/forks/WDaan/VueTorrent" alt="Forks">
        <img src="https://img.shields.io/github/forks/WDaan/VueTorrent" /></a>
      <a href="https://img.shields.io/github/issues/WDaan/VueTorrent" alt="Issues">
        <img src="https://img.shields.io/github/issues/WDaan/VueTorrent" /></a>
      <a href="https://img.shields.io/github/issues-closed/wdaan/vuetorrent" alt="Issues Closed">
        <img src="https://img.shields.io/github/issues-closed/WDaan/VueTorrent" /></a>
      <a href="https://img.shields.io/github/issues-pr-closed/wdaan/VueTorrent" alt="Closed PR">
        <img src="https://img.shields.io/github/issues-pr-closed/wdaan/VueTorrent" /></a>
      <a href="https://img.shields.io/github/v/release/wdaan/vuetorrent" alt="Version">
        <img src="https://img.shields.io/github/v/release/wdaan/vuetorrent" /></a>
      <a href="https://img.shields.io/github/workflow/status/wdaan/vuetorrent/Test%20Core%20Components">
        <img src="https://img.shields.io/github/workflow/status/wdaan/vuetorrent/Test%20Core%20Components" alt="Test Status"></a>
      <a href="https://img.shields.io/github/downloads/wdaan/vuetorrent/total">
        <img src="https://img.shields.io/github/downloads/wdaan/vuetorrent/total" alt="Downloads"></a>
</p>

## Screenshots

![Desktop screenshot](https://imgur.com/IUkaDnI.png)

|                                    |                                    |                                    |
| :--------------------------------: | :--------------------------------: | :--------------------------------: |
| ![](https://imgur.com/Zcm98H3.png) | ![](https://imgur.com/OujrH0f.png) | ![](https://imgur.com/3FZTXPL.png) |
| ![](https://imgur.com/QYpNCXs.png) | ![](https://imgur.com/6j5wxhl.png) | ![](https://imgur.com/jnzDKjW.png) |

<p align="center">
<img src="https://imgur.com/weOOI7n.png" width="300" alt="Mobile screenshot">
</p>

## Installation

### Manual

- Visit the [Releases](https://github.com/WDaan/VueTorrent/releases) page!
- Download the latest `vuetorrent.zip`
- Unzip the downloaded file
- Point your alternate WebUI location to the `vuetorrent` folder in qBittorrent settings

### From Source

- Head to the [`latest-release`](https://github.com/WDaan/VueTorrent/tree/latest-release) branch
- Clone branch using
  - `git clone --single-branch --branch latest-release https://github.com/WDaan/VueTorrent.git`
- Pull changes every once in a while, using `git pull`

### Lazy/Easy
- use [hotio's qbittorrent](https://hotio.dev/containers/qbittorrent/) docker image, that comes pre-packed with VueTorrent.

[Alternative methods - May work for older QBit versions](../../wiki/Alternative_Installation_Methods)

## Development

- Clone the repo
- `npm install`
- `npm run serve`
- `npm run lint` (to format the code)
- `docker-compose up -d` (to start qbittorrent docker => optional, you can edit `vue.config.js` as well)
- You now may open and access the WebUI under localhost with the default username `admin` and password `adminadmin`.

## Features

- Torrents
  - add / remove / pause / resume / rename torrents
  - selectively download files
  - view info / trackers / peers / content / tags & categories
  - search for new torrents straight from the WebUI!
  - search filtering powered by Fuse.js!
- Keyboard shortcuts!
  - select all torrents with <kbd>Ctrl</kbd>-<kbd>A</kbd>
  - delete selected torrents with <kbd>delete</kbd>
  - select with <kbd>Ctrl</kbd>+click
  - <kbd>Shift</kbd>-click to select from one torrent
- System
  - see session stats (down / upload speed, session uploaded / downloaded, free space)
  - beautiful transfer graphs
  - change the most common settings
- Extra features the default WebUI doesn't have
  - mobile friendly! (can be installed as a PWA)
  - Configureable Dashboard: choose which torrent properties are shown for both busy and completed torrents
- works with qBittorrent v4.4 and later

## Contributing

I'll gladly accept help/pull requests & advice!

[FAQ](../../wiki/FAQ)

## Support

Open up an issue 😛

but before you do that:
- confirm you're on the latest version of VueTorrent 
- confirm there is no other issue mentioning the same problem

<a href="https://www.buymeacoffee.com/wdaan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=wdaan&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff"></a>

## Credits

- [qBittorrent](https://github.com/qbittorrent/qBittorrent)
- Other alternate WebUI written in Vue [`CzBiX qb-web`](https://github.com/CzBiX/qb-web)
- Many thanks [@m4ximuel](https://github.com/m4ximuel) for designing the icon & helping out with the project
