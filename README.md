# VueTorrent

The sleekest looking WEBUI for qBittorrent made with Vuejs!

> Vue, qBitorrent, Vuetify

## Screenshots

![Desktop screenshot](https://imgur.com/hpjuVYb.png)

|                                    |                                    |                                    |
| :--------------------------------: | :--------------------------------: | :--------------------------------: |
| ![](https://imgur.com/Zcm98H3.png) | ![](https://imgur.com/OujrH0f.png) | ![](https://imgur.com/3FZTXPL.png) |
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
- npm run lint (to format the code)
- docker-compose up -d (to start qbittorrent docker => optional, you can edit vue.config.js as well)

## Features

- Torrents
  - adding / removing / pausing / resuming / renaming
  - selectively downloading files
  - view info / trackers / peers / content / tags & categories
  - searching for new torrents straight from the WEBUI!
  - search filtering powered by Fuse.js!

- Keyboard shortcuts!
  - select all torrents with ctrl+A
  - delete selected with delete button
  - select with ctrl+click or from right-click-menu
  - shift + click to select from one torrent until another

- System
  - see sessions status ( down / upload speed, session uploaded / downloaded, free space)
  - changing the most common settings

- Extra features the default WebUI doesn't have
  - mobile friendly! (can be installed as a PWA)
  - Configureable Dashboard: choose which torrent properties are shown for both busy and completed torrents

- works on QBittorrent V4.2 and later

## Contributing

I'll gladly accept help/pull requests & advice!

## FAQ

### Unacceptable file type, only regular file is allowed. 
- Running FreeNAS? check out [#101](/../../issues/101)
- On an older version? check out [#90](/../../issues/90)
- Other? check out [#10](/../../issues/10)

### Disable/Uninstall
When you use VueTorrent, it gets installed as a [PWA](https://web.dev/progressive-web-apps/) so that it can feel more like an app.
If you disable or uninstall VueTorrent, sometimes you'll see fragments of the VueTorrent PWA stick around, due to the nature of how PWAs work.
Here's how to fix it:
- Open up your browser's inspector (on Chrome, click the ︙ menu, then go to More tools ˃ Developer tools)
- Select the "Application" tab. Select the "Clear storage" submenu, and then press the "Clear site data" button.


## Support

- Open up an issue 😛

<a href="https://www.buymeacoffee.com/wdaan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=wdaan&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff"></a>

## Credits

- Other alternate WebUI written in Vue '[CzBiX qb-web ](https://github.com/CzBiX/qb-web)'
