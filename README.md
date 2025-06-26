# VueTorrent

The sleekest looking WebUI for qBittorrent made with Vue.js!

[![Discord](https://img.shields.io/discord/1170618192956243998?logo=discord)](https://discord.gg/KDQP7fR467)

![VueTorrent](https://cdn.jsdelivr.net/gh/VueTorrent/VueTorrent@master/VueTorrent-logo.png)

![Vue](https://img.shields.io/badge/Vue-%5E3.4.26-brightgreen) ![Vuetify](https://img.shields.io/badge/Vuetify-%5E3.6.4-brightgreen)
![qBittorrent](https://img.shields.io/badge/qBittorrent-4.4%2B-brightgreen)

![stars](https://img.shields.io/github/stars/VueTorrent/VueTorrent) ![Forks](https://img.shields.io/github/forks/VueTorrent/VueTorrent)
![Issues](https://img.shields.io/github/issues/VueTorrent/VueTorrent) ![Closed](https://img.shields.io/github/issues-closed/VueTorrent/VueTorrent)
![Closed PR](https://img.shields.io/github/issues-pr-closed/VueTorrent/VueTorrent) ![Version](https://img.shields.io/github/v/release/VueTorrent/vuetorrent)
![Test Status](https://img.shields.io/github/actions/workflow/status/VueTorrent/vuetorrent/test.yml)
![Downloads](https://img.shields.io/github/downloads/VueTorrent/VueTorrent/total)
[![Contributor Covenant](https://img.shields.io/badge/Contributor_Covenant-2.1-4baaaa.svg)](.github/CODE_OF_CONDUCT.md)

## Screenshots

- Desktop

<p>
  <img src="public/screenshots/screenshot-desktop.jpeg" width="800" alt="Screenshot Desktop (Light Mode)" />
</p>

- Desktop Dark Mode

<p>
  <img src="public/screenshots/screenshot-desktop-dark-mode.jpeg" width="800" alt="Screenshot Desktop (Dark Mode)" />
</p>

- Mobile Light Mode

<p>
  <img src="public/screenshots/screenshot-mobile.jpeg" width="400" alt="Screenshot Mobile Dashboard (Light Mode)" />
  <img src="public/screenshots/screenshot-mobile-navbar.jpeg" width="400" alt="Screenshot Mobile Navbar (Light Mode)" /> 
</p>

- Mobile Dark Mode

<p>
  <img src="public/screenshots/screenshot-mobile-dark-mode.jpeg" width="400" alt="Screenshot Mobile Dashboard (Dark Mode)" />
  <img src="public/screenshots/screenshot-mobile-navbar-dark-mode.jpeg" width="400" alt="Screenshot Mobile Navbar (Dark Mode)" /> 
</p>

## Demo

A live demo **with mocked data** is available here: <https://vuetorrent.github.io/demo>

<!-- prettier-ignore -->
> [!NOTE]
> This version isn't connected to a qBittorrent instance.
>
> Don't try to download torrents or change preferences, it won't work 😉

## Installation

Checkout the [wiki](https://github.com/VueTorrent/VueTorrent/wiki/Installation)!

## Development

- Clone the repo
- `npm install`
- `npm start`
- `npm run lint` (to check for problems in code)
- `npm run lint:fix` (to fix common problems)
- `docker-compose up -d` (starts a qbittorrent docker, optional)
- Open the WebUI on localhost with the default credentials
  - See [#1720](https://github.com/VueTorrent/VueTorrent/issues/1720) for more details
- Make sure WebUI > "Host header validation" is disabled in the qBittorrent preferences
- Edit `env.development` to tweak your dev environment (e.g. mocked data)

## Features

- Torrents
  - add / remove / pause / resume / rename torrents
  - selectively download files
  - view info / trackers / peers / content / tags & categories
  - search for new torrents straight from the WebUI!
- Keyboard shortcuts!
  - Mac keymap is supported (use <kbd>Cmd</kbd> instead of <kbd>Ctrl</kbd>)
  - Press <kbd>Escape</kbd> to dismiss any dialogs or to return to Dashboard view
  - Dashboard
    - Select all torrents with <kbd>Ctrl</kbd>-<kbd>A</kbd>
    - Focus search input with <kbd>Ctrl</kbd>-<kbd>F</kbd>
      - Press again to enable native browser search
    - When no dialogs are opened, press <kbd>Escape</kbd> to unfocus search input
      - Press again to unselect all torrents
    - Delete selected torrents with <kbd>Delete</kbd> (<kbd>Fn</kbd>-<kbd>Backspace</kbd> on Mac)
    - <kbd>Ctrl</kbd>-click on a torrent card to enable multi-select mode
    - Hold <kbd>Shift</kbd> and click on a torrent card to select all torrents between the last selected torrent and the clicked torrent
- System
  - see session stats (down / upload speed, session uploaded / downloaded, free space)
  - beautiful transfer graphs
  - change the most common settings
- Extra features the default WebUI doesn't have
  - mobile friendly! (can be installed as a PWA)
  - Configureable Dashboard: choose which torrent properties are shown for both busy and completed torrents
- Optimized for the latest version of qBittorrent
- Additional backend for improved experience, [see the repo for more info](https://github.com/VueTorrent/vuetorrent-backend)
  - This is a work in progress, and is not required to use VueTorrent
  - Stores server-side settings
- Supports [qBittorrent Enhanced Edition](https://github.com/c0re100/qBittorrent-Enhanced-Edition) preferences

## Important Information

VueTorrent is a **WebUI** (think of it as a "visual skin") that uses qBittorrent's WebAPI, enabling full compatibility with automation solutions like the *arr stack.

Everything that is compatible with the classic qBittorrent WebUI will work regardless of the WebUI you chose to use, whether its VueTorrent or another one.

## Contributing

We gladly accept contributions!

Any help is appreciated, whether it's reporting bugs, suggesting enhancements, contributing code or localizing the app.

See the [Contributing Guidelines](https://github.com/VueTorrent/VueTorrent/blob/master/.github/CONTRIBUTING.md) for more information.

## Support

- [![Discord](https://img.shields.io/discord/1170618192956243998?logo=discord)](https://discord.gg/KDQP7fR467)
- [![Wiki](https://img.shields.io/badge/Wiki-blue)](https://github.com/VueTorrent/VueTorrent/wiki)
- [![FAQ](https://img.shields.io/badge/FAQ-orange)](https://github.com/VueTorrent/VueTorrent/wiki/FAQ)

If any of the above didn't help, feel free to open an issue!

See the [Contributing Guidelines](https://github.com/VueTorrent/VueTorrent/blob/master/.github/CONTRIBUTING.md) for more information.

## Funding

All donations are appreciated but purely optional.

Checkout the sponsor section of the repository.

## Contributors

- [@m4ximuel](https://github.com/m4ximuel)
- [@Larsluph](https://github.com/Larsluph)
