# VueTorrent

The sleekest looking WEBUI for qBittorrent made with Vuejs! Forked from [WDaan/VueTorrent](https://github.com/WDaan/VueTorrent)

> Vue, qBitorrent, Vuetify

## Screenshots

<p  align="center">

<a  href="https://imgur.com/fiOzVSu.png"><img  src="https://imgur.com/fiOzVSu.png"  title="Dashboard"  alt="Dashboard Screenshot" ></a>

</p>

|                                                                                                    |                                                                                                    |                                                                                                    |
| :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| <img width="1604" alt="Torrent Details" src="https://imgur.com/ObJQaIj.png"> | <img width="1604" alt="Context menu" src="https://imgur.com/hGDi2In.png"> | <img width="1604" alt="Settings" src="https://imgur.com/AdTJ020.png"> |


## Installation

- ### manual

    -   Visit the releases page!

    -   Download the latest release.zip

    -   Unzip this folder

    -   Point your Alternate WEBUI location to the 'vuetorrent' folder

- ### 'automatic'

    - head over to the 'latest_release' branch
    - clone it
    - pull every once in a while

## Development

-   clone the repo

-   npm install

-   npm run serve

-   docker-compose up -d (to start qbittorrent docker)

## Features

-   viewing sessions status ( down / upload speed, session uploaded / downloaded )

-   paginating torrent list to make it lightest!

-   adding / removing / pausing / resuming / renaming torrents

-   selectively downloading torrents

-   choosing / renaming torrent files

-   filtering powered by Fuse.js!

-   mobile friendly! (can be installed as a PWA)

-   torrent info / trackers / peers / content

-   searching for new torrents straight from the WEBUI!

-   changing the most common settings

-   tag & category support

- Keyboard shortcuts!
    - select all torrents with ctrl+A
    - delete selected with delete button
    - select with ctrl+click or from right-click-menu (regular tap on mobile still works)
    - shift + click to select from one torrent until another

- Which torrent properties are shown is configurable in the dashboard (for both busy and completed torrents)
 
-   works on QBittorrent V4.2 and later

## Contributing

I'll gladly accept help/pull requests & advice!

## FAQ

-   **Why build this??**

-   Why not? Most WebUI's look very dated and now it's no longer necessary to search for a remote control app!

## Credits

-   Original repo [WDaan/VueTorrent](https://github.com/WDaan/VueTorrent)
