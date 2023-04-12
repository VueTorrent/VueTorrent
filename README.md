# vite-project

![Vue](https://img.shields.io/badge/Vue-%5E3.2.47-brightgreen) ![qBittorrent](https://img.shields.io/badge/qBittorrent-4.4%2B-brightgreen)
![Vuetify](https://img.shields.io/badge/Vuetify-%5E3.1.13-brightgreen)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

## Development

- Clone the repo
- `npm install`
- `npm start`
- `npm run lint` (to format the code)
- `docker-compose up -d` (starts a qbittorrent docker, optional)
- Open the WebUI on localhost with the default username `admin` and password `adminadmin`.
- Make sure CSRF protection is disabled on the target server!
- Edit `env.development` to tweak your dev environment (e.g. fake torrents)

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
- Many thanks [@m4ximuel](https://github.com/m4ximuel) for designing the icon & helping out with the project
