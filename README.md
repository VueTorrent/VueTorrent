# VueTorrent
<p>
<img align="right" width="200px" src="https://imgur.com/x6dKNB3.png">   

<p>&nbsp;</p>
The sleekest looking WebUI for qBittorrent made with Vue.js!  

> Vue, qBitorrent, Vuetify
</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

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

[Alternative methods - May work for older QBit versions](../../wiki/Alternative_Installation_Methods)

## Development

- Clone the repo
- `npm install`
- `npm run serve`
- `npm run lint` (to format the code)
- `docker-compose up -d` (to start qbittorrent docker => optional, you can edit `vue.config.js` as well)

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
- works with qBittorrent v4.2 and later

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

- Other alternate WebUI written in Vue [`CzBiX qb-web`](https://github.com/CzBiX/qb-web)
- Many thanks @m4ximuel for designing the icon & helping out with the project
