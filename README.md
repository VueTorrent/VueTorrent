# VueTorrent

The sleekest looking WEBUI for qBittorrent made with Vuejs!

> Vue, qBitorrent, Vuetify

## Screenshots

![Desktop screenshot](https://imgur.com/hpjuVYb.png)

|                                    |                                    |                                    |
| :--------------------------------: | :--------------------------------: | :--------------------------------: |
| ![](https://imgur.com/Zcm98H3.png) | ![](https://imgur.com/OujrH0f.png) | ![](https://imgur.com/OkukwYY.png) |
| ![](https://imgur.com/QYpNCXs.png) | ![](https://imgur.com/6j5wxhl.png) | ![](https://imgur.com/jnzDKjW.png) |

<p align="center">
<img src="https://imgur.com/U3mes8r.png" width="300" alt="Mobile screenshot">
</p>

## Installation

### manual

- Visit the releases page!
- Download the latest release.zip
- Unzip this folder
- Point your Alternate WEBUI location to the 'vuetorrent' folder

### 'automatic'

- head over to the 'latest_release' branch
- clone it
  - `git clone --single-branch --branch latest-release https://github.com/WDaan/VueTorrent.git`
- pull every once in a while

## Development

- clone the repo
- npm install
- npm run serve
- docker-compose up -d (to start qbittorrent docker)

## Features

- viewing sessions status ( down / upload speed, session uploaded / downloaded )
- adding / removing / pausing / resuming / renaming torrents
- selectively downloading torrents
- filtering powered by Fuse.js!
- mobile friendly! (can be installed as a PWA)
- torrent info / trackers / peers / content
- searching for new torrents straight from the WEBUI!
- changing the most common settings
- tag & category support
- Keyboard shortcuts!
  - select all torrents with ctrl+A
  - delete selected with delete button
  - select with ctrl+click or from right-click-menu (regular tap on mobile still works)
  - shift + click to select from one torrent until another
- Which torrent properties are shown is configurable in the dashboard (for both busy and completed torrents)
- works on QBittorrent V4.2 and later

## Contributing

I'll gladly accept help/pull requests & advice!

## Support

- Open up an issue 😛

<a href="https://www.buymeacoffee.com/wdaan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=wdaan&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff"></a>

## Credits

- Dashboard design heavily inspired by: '[Net Ninja - Vuetify](https://github.com/iamshaunjp/vuetify-playlist)'.
- This repo '[CzBiX qb-web ](https://github.com/CzBiX/qb-web)'
- Muertocaloh's [fork](https://github.com/muertocaloh/VueTorrent)
