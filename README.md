# VueTorrent

The sleekest looking WebUI for qBittorrent made with Vue.js!

![VueTorrent](https://cdn.jsdelivr.net/gh/VueTorrent/VueTorrent@master/VueTorrent-logo.png)

![Vue](https://img.shields.io/badge/Vue-%5E3.4.20-brightgreen) ![qBittorrent](https://img.shields.io/badge/qBittorrent-4.4%2B-brightgreen)
![Vuetify](https://img.shields.io/badge/Vuetify-%5E3.5.6-brightgreen)

![stars](https://img.shields.io/github/stars/VueTorrent/VueTorrent) ![Forks](https://img.shields.io/github/forks/VueTorrent/VueTorrent)
![Issues](https://img.shields.io/github/issues/VueTorrent/VueTorrent) ![Closed](https://img.shields.io/github/issues-closed/VueTorrent/VueTorrent)
![Closed PR](https://img.shields.io/github/issues-pr-closed/VueTorrent/VueTorrent) ![Version](https://img.shields.io/github/v/release/VueTorrent/vuetorrent)
![Test Status](https://img.shields.io/github/actions/workflow/status/VueTorrent/vuetorrent/test.yml) ![Downloads](https://img.shields.io/github/downloads/VueTorrent/VueTorrent/total)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Screenshots

- Desktop
<p>
  <img src="readme_assets/screenshot-desktop.png" width="800" alt="Screenshot Desktop (Light Mode)" />
</p>

- Desktop Dark Mode
<p>
  <img src="readme_assets/screenshot-desktop-dark-mode.png" width="800" alt="Screenshot Desktop (Dark Mode)" />
</p>

- Mobile Dark Mode
<p>
  <img src="readme_assets/screenshot-mobile-dark-mode.png" width="400" alt="Screenshot Mobile Dashboard (Dark Mode)" />
  <img src="readme_assets/screenshot-mobile-navbar-dark-mode.png" width="400" alt="Screenshot Mobile Dashboard (Light Mode)" /> 
</p>

## Installation

Checkout the [wiki](https://github.com/VueTorrent/VueTorrent/wiki/Installation)!

## Development

- Clone the repo
- `npm install`
- `npm start`
- `npm run lint` (to format the code)
- `docker-compose up -d` (starts a qbittorrent docker, optional)
- Open the WebUI on localhost with the default credentials
  - Default username is always `admin`
  - Default password is `adminadmin` **on 4.6.0 and below**, and is generated on 4.6.1 and above
- Make sure "CSRF protection" and "Host header verification" is disabled on the target server!
- Edit `env.development` to tweak your dev environment (e.g. fake torrents)

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

## Important Information

VueTorrent is a **WebUI** (think of it as a "visual skin") that uses qBittorrent's API, enabling compatibility with automation solutions like the Servarr stack.

Everything that is compatible with qBittorrent will work if you choose to use VueTorrent.

## Contributing

Open up a PR or create an issue to discuss. Reach out on Discord if you need help getting started!

[FAQ](../../wiki/FAQ)

### Localize the app

We use [Tolgee](https://tolgee.io/) to manage translations. If you want to help, let us know which locale do you want to work on in the discord server to be added to the project.

## Support

Open up an issue 😛

but before you do that:

- confirm you're on the latest version of VueTorrent
- confirm there is no other issue mentioning the same problem

<a href="https://www.buymeacoffee.com/wdaan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=wdaan&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff"></a>

## Contributors

- [@m4ximuel](https://github.com/m4ximuel)
- [@Larsluph](https://github.com/Larsluph)
