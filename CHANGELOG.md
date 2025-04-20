# Changelog

## [2.24.1](https://github.com/VueTorrent/VueTorrent/compare/v2.24.0...v2.24.1) (2025-04-16)

### Bug Fixes

- **Dashboard:** Add min height for main container ([#2242](https://github.com/VueTorrent/VueTorrent/issues/2242))
  ([90821c3](https://github.com/VueTorrent/VueTorrent/commit/90821c33eabe1eb2ac93d1ebf494a5588dc0c9ab))
- **filters:** Fix trackers filter not working in some cases ([#2231](https://github.com/VueTorrent/VueTorrent/issues/2231))
  ([49d9a52](https://github.com/VueTorrent/VueTorrent/commit/49d9a52c4902db576dba1054a1860bcce2f8acb0))
- **Info:** Format data correctly ([#2241](https://github.com/VueTorrent/VueTorrent/issues/2241))
  ([cbdfff8](https://github.com/VueTorrent/VueTorrent/commit/cbdfff87d138b52552021ea3283dc055874c6ac8))
- **ratio:** Force 2 decimal places ([#2240](https://github.com/VueTorrent/VueTorrent/issues/2240))
  ([dbbc37f](https://github.com/VueTorrent/VueTorrent/commit/dbbc37f4f5649278cc639097886ec7d5291edc18))

## [2.24.0](https://github.com/VueTorrent/VueTorrent/compare/v2.23.1...v2.24.0) (2025-04-09)

### Features

- **Content/Filter:** Group extensions of same type ([#2204](https://github.com/VueTorrent/VueTorrent/issues/2204))
  ([ddbafbe](https://github.com/VueTorrent/VueTorrent/commit/ddbafbef68a9a1fc770411e31f84e15486f142a0))
- **Filters:** Handle exclude filtering for tags and trackers ([#2220](https://github.com/VueTorrent/VueTorrent/issues/2220))
  ([c851d87](https://github.com/VueTorrent/VueTorrent/commit/c851d8777dc507fe5d9ea4846cd0d799853243cc))

### Bug Fixes

- **Content/Filter:** Handle extension casing ([#2208](https://github.com/VueTorrent/VueTorrent/issues/2208))
  ([f5a6bda](https://github.com/VueTorrent/VueTorrent/commit/f5a6bdaf3eae5dedf0e1211ad3b41ed04cdc5aed))
- **polyfills:** Downgraded 'toSorted' to 1.1.3 ([#2228](https://github.com/VueTorrent/VueTorrent/issues/2228))
  ([ccb3f8c](https://github.com/VueTorrent/VueTorrent/commit/ccb3f8c2f65523e4a8d69bcd8af9a9d86ff11f4f))

## [2.23.1](https://github.com/VueTorrent/VueTorrent/compare/v2.23.0...v2.23.1) (2025-03-18)

### Bug Fixes

- **SpeedGraph:** Set fixed tooltip ([#2198](https://github.com/VueTorrent/VueTorrent/issues/2198))
  ([6d4d0c0](https://github.com/VueTorrent/VueTorrent/commit/6d4d0c0bfb3267b7d4145918fe9bafc840666ff6))

### Improvements

- **ActiveFilters:** Improve mouse events handling ([#2196](https://github.com/VueTorrent/VueTorrent/issues/2196))
  ([85af361](https://github.com/VueTorrent/VueTorrent/commit/85af36106cf0c6018a88f291661bbcafc020af31))

## [2.23.0](https://github.com/VueTorrent/VueTorrent/compare/v2.22.0...v2.23.0) (2025-03-05)

### Features

- **Settings:** Add option to collapse content items by default ([#2180](https://github.com/VueTorrent/VueTorrent/issues/2180))
  ([f9da988](https://github.com/VueTorrent/VueTorrent/commit/f9da98880cbf67dfdbe4361ae2822be73c7246f6))

### Bug Fixes

- **AddTorrentDialog:** Remove default value for speed limits ([#2172](https://github.com/VueTorrent/VueTorrent/issues/2172))
  ([3fc700c](https://github.com/VueTorrent/VueTorrent/commit/3fc700c57527a0f62ecdeef99d568bb66d059c91))
- **backend:** Torrent properties not synced more than once ([#2163](https://github.com/VueTorrent/VueTorrent/issues/2163))
  ([90c2a69](https://github.com/VueTorrent/VueTorrent/commit/90c2a693c66db35c6449aafafe8a23fc2f9cc39b))
- **Settings:** Add warning message when using high pagination values ([#2176](https://github.com/VueTorrent/VueTorrent/issues/2176))
  ([cbeb74e](https://github.com/VueTorrent/VueTorrent/commit/cbeb74eb0e7b385c8ddcfde04399dae3d1d390a4))

## [2.22.0](https://github.com/VueTorrent/VueTorrent/compare/v2.21.0...v2.22.0) (2025-02-01)

### Features

- **Dashboard:** Add missing fields as dashboard items ([#2144](https://github.com/VueTorrent/VueTorrent/issues/2144))
  ([a492884](https://github.com/VueTorrent/VueTorrent/commit/a4928841fe153a4ee9e31e03bc990ccf4365e198))

### Bug Fixes

- **backend:** Sort option isn't synced with table header ([#2128](https://github.com/VueTorrent/VueTorrent/issues/2128))
  ([1e00212](https://github.com/VueTorrent/VueTorrent/commit/1e0021213b671337d273ba968607917872f32064))
- **Overview:** Use correct selected size ([#2142](https://github.com/VueTorrent/VueTorrent/issues/2142))
  ([84bfef0](https://github.com/VueTorrent/VueTorrent/commit/84bfef0808d89bf6880c87a3c6822917ba96c5d3))
- **polyfills:** Add "toSorted" polyfill to support older browsers ([#2137](https://github.com/VueTorrent/VueTorrent/issues/2137))
  ([d92197c](https://github.com/VueTorrent/VueTorrent/commit/d92197cbc2e5e5da38a412ce6e57323cd51fc305))
- **Settings/Advanced:** Update unit conversions ([#2140](https://github.com/VueTorrent/VueTorrent/issues/2140))
  ([db85dd5](https://github.com/VueTorrent/VueTorrent/commit/db85dd5d2ff195c0c0578fa8df9725e41e3f5d1b))
- **Settings:** Update "delete torrent files afterwards" not working ([#2135](https://github.com/VueTorrent/VueTorrent/issues/2135))
  ([3dbfd06](https://github.com/VueTorrent/VueTorrent/commit/3dbfd067f9e2855c0f66ee78f12a794014a1a788))

### Improvements

- **Content:** Spacebar takes selection into account ([#2141](https://github.com/VueTorrent/VueTorrent/issues/2141))
  ([3bc6f06](https://github.com/VueTorrent/VueTorrent/commit/3bc6f06fae6430f1700f8de29eb767239885b02e))

## [2.21.0](https://github.com/VueTorrent/VueTorrent/compare/v2.20.1...v2.21.0) (2025-01-05)

### Features

- Add OLED theme ([#2125](https://github.com/VueTorrent/VueTorrent/issues/2125))
  ([02028c2](https://github.com/VueTorrent/VueTorrent/commit/02028c2954415cc9d050cb129482ff04463975ac))

### Bug Fixes

- **Dashboard:** Remove empty space when pagination is hidden ([#2120](https://github.com/VueTorrent/VueTorrent/issues/2120))
  ([8dfdd1a](https://github.com/VueTorrent/VueTorrent/commit/8dfdd1a9cebdc4df3cd8f1dd6d40fd9532e1dde8))

### Improvements

- **backend:** Reduce network sync requests ([#2122](https://github.com/VueTorrent/VueTorrent/issues/2122))
  ([e2492aa](https://github.com/VueTorrent/VueTorrent/commit/e2492aacbbcb2723828fcfb87b17d49afe6214c3))
- **backend:** Sync display mode and sort ([#2116](https://github.com/VueTorrent/VueTorrent/issues/2116))
  ([e0fc708](https://github.com/VueTorrent/VueTorrent/commit/e0fc70809d14c1f4ade69c5ab27b0e865e9b1c1c))

## [2.20.1](https://github.com/VueTorrent/VueTorrent/compare/v2.20.0...v2.20.1) (2024-12-31)

### Bug Fixes

- **content:** Revert vue-concurrency breaking reactivity ([a5ca21c](https://github.com/VueTorrent/VueTorrent/commit/a5ca21c376b77dbc379e56bafa443d28ec0d5038))

## [2.20.0](https://github.com/VueTorrent/VueTorrent/compare/v2.19.0...v2.20.0) (2024-12-31)

### Features

- **TorrentDetail:** Add torrent navigation buttons ([#2108](https://github.com/VueTorrent/VueTorrent/issues/2108))
  ([488958d](https://github.com/VueTorrent/VueTorrent/commit/488958db10245ec5eac3edd3f170690667254972))

### Bug Fixes

- **Content:** Tree not expanding on load ([#2095](https://github.com/VueTorrent/VueTorrent/issues/2095))
  ([8792e3d](https://github.com/VueTorrent/VueTorrent/commit/8792e3d1d85c429eafcf0ce882ea1e8bb28f99b8))
- **Logs:** Prevent duplication on page refresh ([#2100](https://github.com/VueTorrent/VueTorrent/issues/2100))
  ([4368af9](https://github.com/VueTorrent/VueTorrent/commit/4368af9e0122eec4f4e6da51fd60df61b4b8f8f1))
- **paste:** Prevent blocking paste event on some text boxes ([#2112](https://github.com/VueTorrent/VueTorrent/issues/2112))
  ([c761591](https://github.com/VueTorrent/VueTorrent/commit/c76159188bc777e670700f25332b3a8ef3622520))
- **RSS:** Display feeds with empty articles ([#2096](https://github.com/VueTorrent/VueTorrent/issues/2096))
  ([a6730ab](https://github.com/VueTorrent/VueTorrent/commit/a6730ab440c1a547d38db1a823ef31291616150d))

### Improvements

- **Dashboard:** Make scroll bars always visible ([#2109](https://github.com/VueTorrent/VueTorrent/issues/2109))
  ([a5c0330](https://github.com/VueTorrent/VueTorrent/commit/a5c0330031f7d641186a88e4232a83ed9a3c8b4d))
- **Dashboard:** Sort forced ETA 0s as infinity ([#2110](https://github.com/VueTorrent/VueTorrent/issues/2110))
  ([f262eca](https://github.com/VueTorrent/VueTorrent/commit/f262eca144b568f5abebebd688baf0dae8d8b7d0))
- Handle paste event globally ([#2099](https://github.com/VueTorrent/VueTorrent/issues/2099))
  ([098ee25](https://github.com/VueTorrent/VueTorrent/commit/098ee25593ff1a483999e3b67bab68dc5a97a278))
- **RightClick:** Add missing option for super seeding mode ([#2085](https://github.com/VueTorrent/VueTorrent/issues/2085))
  ([d1f0303](https://github.com/VueTorrent/VueTorrent/commit/d1f0303a572d7ba5faa555f92aea1c32fae7d53f))

## [2.19.0](https://github.com/VueTorrent/VueTorrent/compare/v2.18.0...v2.19.0) (2024-12-09)

### Features

- **Content:** Add expand / collapse all actions to right-click menu ([#2081](https://github.com/VueTorrent/VueTorrent/issues/2081))
  ([3ab44a5](https://github.com/VueTorrent/VueTorrent/commit/3ab44a5dfeb8eb909a068be018e61ccb4e3ccd0b))
- **RightClick:** Add bulk update tracker dialog ([#2057](https://github.com/VueTorrent/VueTorrent/issues/2057))
  ([7a57d22](https://github.com/VueTorrent/VueTorrent/commit/7a57d226389e143364e348532b798dcbe46ad0f4))

### Bug Fixes

- **filters:** Don't count offline torrent in "Not working" tracker filter ([#2051](https://github.com/VueTorrent/VueTorrent/issues/2051))
  ([d59cae7](https://github.com/VueTorrent/VueTorrent/commit/d59cae7ccff87abbc7b62dbb05013d04ee891895))
- **RSS:** Prevent wrap on "NEW" chip ([#2054](https://github.com/VueTorrent/VueTorrent/issues/2054))
  ([eb82416](https://github.com/VueTorrent/VueTorrent/commit/eb82416a31341c36f3dd0c6802db001ed84580e4))
- **Settings:** Fix unusable i2p settings ([#2076](https://github.com/VueTorrent/VueTorrent/issues/2076))
  ([9a2efcf](https://github.com/VueTorrent/VueTorrent/commit/9a2efcf8f0d5ec37c7f6beb271ede4b5549a7e65))
- **TorrentCreator:** Add source field for qbit 5.0.3+ ([#2069](https://github.com/VueTorrent/VueTorrent/issues/2069))
  ([9f73baa](https://github.com/VueTorrent/VueTorrent/commit/9f73baaa30674e7740280545a5409ffa132f125e))

### Improvements

- **backend:** Rework sync behaviour ([#2050](https://github.com/VueTorrent/VueTorrent/issues/2050))
  ([542e5c7](https://github.com/VueTorrent/VueTorrent/commit/542e5c7d002f5ad8e58ca53ebd8e8de830213acc))
- **Content:** Allow keyboard to collapse parent folder with left arrow ([#2080](https://github.com/VueTorrent/VueTorrent/issues/2080))
  ([3f18e20](https://github.com/VueTorrent/VueTorrent/commit/3f18e20a89c95ce1c0453e42dc1179acc5e00a8c))
- **SearchEngine:** Update mobile variant to be more compact ([#2059](https://github.com/VueTorrent/VueTorrent/issues/2059))
  ([2816e4f](https://github.com/VueTorrent/VueTorrent/commit/2816e4fb311c71818bb0839d4624f0b7b4999c17))
- **TorrentDetail:** Remember last opened tab ([#2082](https://github.com/VueTorrent/VueTorrent/issues/2082))
  ([5088d26](https://github.com/VueTorrent/VueTorrent/commit/5088d262c2fc996f9a59e459f6b213a6443cc5c8))
- **trackers:** Improve overall UX ([#2071](https://github.com/VueTorrent/VueTorrent/issues/2071))
  ([41afc40](https://github.com/VueTorrent/VueTorrent/commit/41afc40ba216a80be604afc1aae976b41a3850d3))

## [2.18.0](https://github.com/VueTorrent/VueTorrent/compare/v2.17.0...v2.18.0) (2024-11-17)

### Features

- **Logs:** Add sort support ([#2044](https://github.com/VueTorrent/VueTorrent/issues/2044))
  ([781c802](https://github.com/VueTorrent/VueTorrent/commit/781c80267e62e513f638f1c25a20363573877b76))
- **Navbar:** Make speed cards clickable to select dl & ul filters ([#2043](https://github.com/VueTorrent/VueTorrent/issues/2043))
  ([5a0ad41](https://github.com/VueTorrent/VueTorrent/commit/5a0ad417dc8b6d4dc64c15eb2ba50f8b5e4ffafc))

### Bug Fixes

- **filters:** Prevent re-enable on app launch ([#2039](https://github.com/VueTorrent/VueTorrent/issues/2039))
  ([82b9a91](https://github.com/VueTorrent/VueTorrent/commit/82b9a91b6374104e6316a58d04eb1bec6385d979))
- **Overview:** Update outdated locale keys ([#2045](https://github.com/VueTorrent/VueTorrent/issues/2045))
  ([4c4ff46](https://github.com/VueTorrent/VueTorrent/commit/4c4ff460313404b7550fb81690f6fff7f27e3b3a))
- **TableView:** Set max width of torrent name to 40% ([#2042](https://github.com/VueTorrent/VueTorrent/issues/2042))
  ([401d48d](https://github.com/VueTorrent/VueTorrent/commit/401d48d4bbe633ff7e2a165e0c83259f20e45bb9))

### Improvements

- **filters:** Differentiate "Untracked" and "Not working" trackers ([#2038](https://github.com/VueTorrent/VueTorrent/issues/2038))
  ([65fcd53](https://github.com/VueTorrent/VueTorrent/commit/65fcd534c06d9a840bf1193e06cf38b2ccb27463))

## [2.17.0](https://github.com/VueTorrent/VueTorrent/compare/v2.16.0...v2.17.0) (2024-11-09)

### Features

- Add remove unused tags/categories actions ([#2026](https://github.com/VueTorrent/VueTorrent/issues/2026))
  ([f962912](https://github.com/VueTorrent/VueTorrent/commit/f9629125a720c8ca225c1865d8687db4f06bf7f6))
- **Content:** Handle keyboard inputs ([#2014](https://github.com/VueTorrent/VueTorrent/issues/2014))
  ([8253831](https://github.com/VueTorrent/VueTorrent/commit/8253831de3f9a7b2dfe7421f64ffbab8b8ade9ce))
- **filters:** Add torrent count for each filter values ([#2024](https://github.com/VueTorrent/VueTorrent/issues/2024))
  ([a44b15d](https://github.com/VueTorrent/VueTorrent/commit/a44b15ddf1069377dce22545772ce973aca8ad59))

### Bug Fixes

- **Dashboard:** Make checkbox click events even with torrent card ([#2011](https://github.com/VueTorrent/VueTorrent/issues/2011))
  ([a3aa263](https://github.com/VueTorrent/VueTorrent/commit/a3aa26362d07e7c2635bfc136a5444840a8450ab))
- **filters:** Remove seeding state from inactive filter ([#2015](https://github.com/VueTorrent/VueTorrent/issues/2015))
  ([56d6124](https://github.com/VueTorrent/VueTorrent/commit/56d6124658c39516c143020c22ce2d4037fa0e67))
- **selection:** Filter out torrents not matching filters ([#2033](https://github.com/VueTorrent/VueTorrent/issues/2033))
  ([0b0be6f](https://github.com/VueTorrent/VueTorrent/commit/0b0be6fe05b0fbe668d8adea2dc1c9c006afb1b2))
- **Settings/Advanced:** Add missing disk IO type ([#2020](https://github.com/VueTorrent/VueTorrent/issues/2020))
  ([7c3c9ea](https://github.com/VueTorrent/VueTorrent/commit/7c3c9ea0ec665784d1e75be3b05316892c0c1fb9))
- **trackers:** Update "untracked" filter matching ([#2032](https://github.com/VueTorrent/VueTorrent/issues/2032))
  ([89fe1ff](https://github.com/VueTorrent/VueTorrent/commit/89fe1ff95358b7e0be3de823be2f279dab45e130))

### Improvements

- Adding secondary sorts for peers and seeds properties ([#2021](https://github.com/VueTorrent/VueTorrent/issues/2021))
  ([4827c28](https://github.com/VueTorrent/VueTorrent/commit/4827c28de0f848be0448f45c0339cb09d0ea47ad))
- **filters:** Add "stalled" states to offline preset ([#2013](https://github.com/VueTorrent/VueTorrent/issues/2013))
  ([d59f92a](https://github.com/VueTorrent/VueTorrent/commit/d59f92a6c77198855d79b4affdce2b4ed2987f71))
- **RSS:** Add "new" chip for increased contrast ([#2031](https://github.com/VueTorrent/VueTorrent/issues/2031))
  ([71a7c1f](https://github.com/VueTorrent/VueTorrent/commit/71a7c1f9e931f25e42ce469e87a2b1721b90bf3d))

## [2.16.0](https://github.com/VueTorrent/VueTorrent/compare/v2.15.0...v2.16.0) (2024-10-31)

### Features

- **settings:** Only fetch external IP data if enabled ([#2001](https://github.com/VueTorrent/VueTorrent/issues/2001))
  ([73076d8](https://github.com/VueTorrent/VueTorrent/commit/73076d87394ac35e07d9714a889c4ace6ac25d13))

### Bug Fixes

- **ActiveFilters:** Force-enable filter after clear ([#1998](https://github.com/VueTorrent/VueTorrent/issues/1998))
  ([9faddbd](https://github.com/VueTorrent/VueTorrent/commit/9faddbd95c6a6cc47b0ac25bd6831fba7aa9dda6))
- **AddTorrents:** Don't override savePath on empty category savePath ([#1999](https://github.com/VueTorrent/VueTorrent/issues/1999))
  ([119ab36](https://github.com/VueTorrent/VueTorrent/commit/119ab36e4c4a614c47bf5d7caa5c487192f4ff62))
- **Logs:** Persist filters in localStorage ([#2000](https://github.com/VueTorrent/VueTorrent/issues/2000))
  ([37317f8](https://github.com/VueTorrent/VueTorrent/commit/37317f8949531a3e981dfee199884853d0426ca0))
- **RightClick:** Handle issue where certain bottom values would not render ([#1985](https://github.com/VueTorrent/VueTorrent/issues/1985))
  ([2878286](https://github.com/VueTorrent/VueTorrent/commit/2878286580624442de9713305be7b97c290d0bae))
- **SearchEngine:** Fix broken category list ([#2006](https://github.com/VueTorrent/VueTorrent/issues/2006))
  ([ca23c5a](https://github.com/VueTorrent/VueTorrent/commit/ca23c5ab69b2d2186b9fe0b7aec518cc156480f1))
- **SearchEngine:** Sort plugins by name ([#2007](https://github.com/VueTorrent/VueTorrent/issues/2007))
  ([54f5289](https://github.com/VueTorrent/VueTorrent/commit/54f5289cb6b6dcd0b249af4b5d03a8bcbd02c6f8))

## [2.15.0](https://github.com/VueTorrent/VueTorrent/compare/v2.14.1...v2.15.0) (2024-10-20)

### Features

- **torrentCreator:** Add new torrent creator view ([#1973](https://github.com/VueTorrent/VueTorrent/issues/1973))
  ([6e6cc48](https://github.com/VueTorrent/VueTorrent/commit/6e6cc4848dd1942f86699517797cd95e30290160))

### Improvements

- **RightClick:** Overhaul of menu item generation for better performance ([#1976](https://github.com/VueTorrent/VueTorrent/issues/1976))
  ([d1301b1](https://github.com/VueTorrent/VueTorrent/commit/d1301b1b4a5e424b036949d17fda60e126c67482))

## [2.14.1](https://github.com/VueTorrent/VueTorrent/compare/v2.14.0...v2.14.1) (2024-10-10)

### Bug Fixes

- **Dashboard:** Update sort algorithm for queue position ([#1956](https://github.com/VueTorrent/VueTorrent/issues/1956))
  ([80d4975](https://github.com/VueTorrent/VueTorrent/commit/80d4975dfe17d58561dea70a9aa8934ffc779c7f))
- **export:** Prevent errors while generating zip ([#1961](https://github.com/VueTorrent/VueTorrent/issues/1961))
  ([4ce4beb](https://github.com/VueTorrent/VueTorrent/commit/4ce4beba5d021ce7eb0c64d9421077ad55c9e90c))
- **Peers:** Fix shifted columns when flag is missing ([#1958](https://github.com/VueTorrent/VueTorrent/issues/1958))
  ([1e7b288](https://github.com/VueTorrent/VueTorrent/commit/1e7b288651eff8b7f4a8f81851916d56da72ce68))

### Improvements

- **DeleteTorrentDialog:** Remap incorrect binding and persist on-demand ([#1953](https://github.com/VueTorrent/VueTorrent/issues/1953))
  ([df5e0a4](https://github.com/VueTorrent/VueTorrent/commit/df5e0a4d520fb209b8b262af569c75ec8cd55671))
- **SearchEngine:** Improve download feedback ([#1954](https://github.com/VueTorrent/VueTorrent/issues/1954))
  ([c237425](https://github.com/VueTorrent/VueTorrent/commit/c2374250ee1e6d3537527de4d15afc62e7b27938))
- **torrentState:** Add toggle for emojis ([#1962](https://github.com/VueTorrent/VueTorrent/issues/1962))
  ([7e24e13](https://github.com/VueTorrent/VueTorrent/commit/7e24e136cf100b7dbd6c955d3b0233ccdb23185f))

## [2.14.0](https://github.com/VueTorrent/VueTorrent/compare/v2.13.3...v2.14.0) (2024-10-06)

### Features

- Support qBittorrent v5 ([#1928](https://github.com/VueTorrent/VueTorrent/issues/1928))
  ([69e29d4](https://github.com/VueTorrent/VueTorrent/commit/69e29d4a91faca77163814456420e410acbc71e2))
- **V5:** Add new settings ([#1948](https://github.com/VueTorrent/VueTorrent/issues/1948))
  ([5ef1f92](https://github.com/VueTorrent/VueTorrent/commit/5ef1f921ee283e91e051b9afdbc9aac0f9a54f60))

### Bug Fixes

- **trackers:** Handle conflicts when several URLs resolve to the same entry ([#1939](https://github.com/VueTorrent/VueTorrent/issues/1939))
  ([53f75d3](https://github.com/VueTorrent/VueTorrent/commit/53f75d3b66ee901dbf550f233ae39bde8ade943b))

## [2.13.3](https://github.com/VueTorrent/VueTorrent/compare/v2.13.2...v2.13.3) (2024-09-30)

### Bug Fixes

- **CI:** Prevent error while bumping version ([bd37cdb](https://github.com/VueTorrent/VueTorrent/commit/bd37cdb6bf33abd30c8036181ec7cf630fcea65c))

## [2.13.2](https://github.com/VueTorrent/VueTorrent/compare/v2.13.1...v2.13.2) (2024-09-30)

### Bug Fixes

- **RSS:** Fix mark as read on single article ([#1921](https://github.com/VueTorrent/VueTorrent/issues/1921))
  ([9d57671](https://github.com/VueTorrent/VueTorrent/commit/9d57671963470def71fcd74dc2a74a3803458ecd))

### Improvements

- **RightClick:** Add "create" entries for tags / category ([#1927](https://github.com/VueTorrent/VueTorrent/issues/1927))
  ([1b99541](https://github.com/VueTorrent/VueTorrent/commit/1b9954123ac5170118a114f0b9e8cf95e1411fad))

## [2.13.1](https://github.com/VueTorrent/VueTorrent/compare/v2.13.0...v2.13.1) (2024-09-22)

### Bug Fixes

- **backend:** Update toast condition when backend unreachable ([#1911](https://github.com/VueTorrent/VueTorrent/issues/1911))
  ([79e3dce](https://github.com/VueTorrent/VueTorrent/commit/79e3dce190d5e0d4ea7f4a3e0c44fbe082ae96a1))
- **Light theme:** Use theme color for TorrentSearchbar ([#1905](https://github.com/VueTorrent/VueTorrent/issues/1905))
  ([e117f72](https://github.com/VueTorrent/VueTorrent/commit/e117f7237c2949ecfd83d253891828699d615ce7))
- **RSS:** Display all feeds even if empty ([#1913](https://github.com/VueTorrent/VueTorrent/issues/1913))
  ([d8969e0](https://github.com/VueTorrent/VueTorrent/commit/d8969e071eb1c2348e8f06cc52aa7929d57d8aef))

## [2.13.0](https://github.com/VueTorrent/VueTorrent/compare/v2.12.0...v2.13.0) (2024-09-19)

### Features

- **backend:** Auto-configure on load ([#1904](https://github.com/VueTorrent/VueTorrent/issues/1904))
  ([909d26a](https://github.com/VueTorrent/VueTorrent/commit/909d26a568de7d5d2d0bac5701a8cb3acb77316f))
- responsive search bar placement ([#1883](https://github.com/VueTorrent/VueTorrent/issues/1883))
  ([8b9a3a3](https://github.com/VueTorrent/VueTorrent/commit/8b9a3a36ce9197392c84757363d3340444e565fd))
- **settings:** Add pagination position configuration ([#1870](https://github.com/VueTorrent/VueTorrent/issues/1870))
  ([b82c124](https://github.com/VueTorrent/VueTorrent/commit/b82c1245f14c220c6a58812390c9016eff4e116f))
- tooltip on torrent state indicator for table view ([#1890](https://github.com/VueTorrent/VueTorrent/issues/1890))
  ([c6722b1](https://github.com/VueTorrent/VueTorrent/commit/c6722b17b54808e081d407ed411d1b546f3c195d))

### Bug Fixes

- Increase menu overflow threshold ([#1887](https://github.com/VueTorrent/VueTorrent/issues/1887))
  ([d02a29b](https://github.com/VueTorrent/VueTorrent/commit/d02a29b409611ced6201506e5fcea1453aad24a3))
- **RSS:** "mark as read" on feed not working ([#1897](https://github.com/VueTorrent/VueTorrent/issues/1897))
  ([c290202](https://github.com/VueTorrent/VueTorrent/commit/c290202e21e5609be207564daee27ea93431a9bb))

### Improvements

- Disallow robots indexing of the WebUI to reduce exposure ([#1903](https://github.com/VueTorrent/VueTorrent/issues/1903))
  ([b829924](https://github.com/VueTorrent/VueTorrent/commit/b8299245817b77f1c0826ed3cd33f7d9c7e25132))
- **Login:** Improve error message ([#1901](https://github.com/VueTorrent/VueTorrent/issues/1901))
  ([7c3fb61](https://github.com/VueTorrent/VueTorrent/commit/7c3fb619f92c7726974f0fe0ed37f80138793afa))
- **router:** Add catch-all route ([#1886](https://github.com/VueTorrent/VueTorrent/issues/1886))
  ([e7abdb2](https://github.com/VueTorrent/VueTorrent/commit/e7abdb2ab382604f3b69672abf57f42ce9a58346))

## [2.12.0](https://github.com/VueTorrent/VueTorrent/compare/v2.11.2...v2.12.0) (2024-08-18)

### Features

- Add global error handler ([#1834](https://github.com/VueTorrent/VueTorrent/issues/1834))
  ([b241617](https://github.com/VueTorrent/VueTorrent/commit/b241617e6f62a1e5e76e5c3a2ea2ffbc60044332))
- **filters:** Add conjunctive / disjunctive filter type ([#1855](https://github.com/VueTorrent/VueTorrent/issues/1855))
  ([31378e0](https://github.com/VueTorrent/VueTorrent/commit/31378e07bf5ca8cb54c0c837d60305f0f3fc4d93))

### Bug Fixes

- Can't add torrents after [#1855](https://github.com/VueTorrent/VueTorrent/issues/1855) ([#1860](https://github.com/VueTorrent/VueTorrent/issues/1860))
  ([8f89594](https://github.com/VueTorrent/VueTorrent/commit/8f895940cfa177d4d994794668c4d6a7dc74d3da))
- **Dashboard:** Remove shadow of "Select All" row ([#1858](https://github.com/VueTorrent/VueTorrent/issues/1858))
  ([fee292f](https://github.com/VueTorrent/VueTorrent/commit/fee292f007d3853d2b7ace923dbbc7044f8f1db4))
- **ETA:** Update incorrect max value ([#1853](https://github.com/VueTorrent/VueTorrent/issues/1853))
  ([2176bab](https://github.com/VueTorrent/VueTorrent/commit/2176babd5c17d3efa28702fb7a70a7448f596e1b))
- Remove latest Set methods usage ([#1844](https://github.com/VueTorrent/VueTorrent/issues/1844))
  ([483e8c4](https://github.com/VueTorrent/VueTorrent/commit/483e8c449f1596d0ae785f05749d0277c359e8fa))
- **TableView:** Ripple effect on safari ([#1864](https://github.com/VueTorrent/VueTorrent/issues/1864))
  ([5a25b7e](https://github.com/VueTorrent/VueTorrent/commit/5a25b7e4ae9582720c9e66ddb0eb1f4cb1e16753))
- Tags not updating after [#1844](https://github.com/VueTorrent/VueTorrent/issues/1844) ([#1859](https://github.com/VueTorrent/VueTorrent/issues/1859))
  ([0009e28](https://github.com/VueTorrent/VueTorrent/commit/0009e287601740ec478be7fb7686227fbe6d2619))

### Improvements

- **Content/bulk select:** Improve UX ([#1845](https://github.com/VueTorrent/VueTorrent/issues/1845))
  ([09f17b9](https://github.com/VueTorrent/VueTorrent/commit/09f17b97d6128cb2ed60ce5f265dcae5d2c70a9d))

## [2.11.2](https://github.com/VueTorrent/VueTorrent/compare/v2.11.1...v2.11.2) (2024-08-11)

### Bug Fixes

- **TableView:** Hide table with no torrents ([#1837](https://github.com/VueTorrent/VueTorrent/issues/1837))
  ([422cee2](https://github.com/VueTorrent/VueTorrent/commit/422cee264191e55eb98d84c0706ab84da6f6afde))

### Improvements

- Add configurable format for duration values ([#1826](https://github.com/VueTorrent/VueTorrent/issues/1826))
  ([831ac9b](https://github.com/VueTorrent/VueTorrent/commit/831ac9b52560b4d50a391ef2694ca1c385b38e62))
- **Dashboard:** Improve "sort by" keyboard interaction ([#1843](https://github.com/VueTorrent/VueTorrent/issues/1843))
  ([9b521af](https://github.com/VueTorrent/VueTorrent/commit/9b521afea7bb94d4a2027c33ffb682b782b204fc))
- **filters:** add additional presets to state filter ([#1836](https://github.com/VueTorrent/VueTorrent/issues/1836))
  ([32b104f](https://github.com/VueTorrent/VueTorrent/commit/32b104fc968c7e5618a1b6398b09f2302ac3446a))
- **SearchEngine:** Use last query as tab title ([#1822](https://github.com/VueTorrent/VueTorrent/issues/1822))
  ([fdab225](https://github.com/VueTorrent/VueTorrent/commit/fdab2250891f76bc34bbb81bc3d3e7809e07cd12))
- **TableView:** Allow click on headers for quick sort ([#1824](https://github.com/VueTorrent/VueTorrent/issues/1824))
  ([ed1209a](https://github.com/VueTorrent/VueTorrent/commit/ed1209ad20a703cca243f3649bb570b8ee92dab2))
- **trackers:** Use hostname instead of full URL ([#1833](https://github.com/VueTorrent/VueTorrent/issues/1833))
  ([a33ca1f](https://github.com/VueTorrent/VueTorrent/commit/a33ca1ff3c735571daed63271a596fb99cb88b3b))

## [2.11.1](https://github.com/VueTorrent/VueTorrent/compare/v2.11.0...v2.11.1) (2024-08-01)

### Bug Fixes

- Sort values correctly ([#1811](https://github.com/VueTorrent/VueTorrent/issues/1811))
  ([17700db](https://github.com/VueTorrent/VueTorrent/commit/17700db5985521787a139fb25db369b39708dac3))

### Improvements

- **Dashboard:** Merge pagination in toolbar on desktop ([#1808](https://github.com/VueTorrent/VueTorrent/issues/1808))
  ([6f80c7d](https://github.com/VueTorrent/VueTorrent/commit/6f80c7d8c458eb67906cbc2a67c15ed916e34691))
- Disable copy action if context not secure ([#1802](https://github.com/VueTorrent/VueTorrent/issues/1802))
  ([c8faa6a](https://github.com/VueTorrent/VueTorrent/commit/c8faa6adb9f2fe2fcbd1c6bef6c68c293c5bcdc6))
- Display speed limits in graph and navbar ([#1800](https://github.com/VueTorrent/VueTorrent/issues/1800))
  ([381953a](https://github.com/VueTorrent/VueTorrent/commit/381953ad4ec72a47a423546bc5c164ec316a357c))
- Increase mobile threshold for initial navbar open status ([#1807](https://github.com/VueTorrent/VueTorrent/issues/1807))
  ([8a9673e](https://github.com/VueTorrent/VueTorrent/commit/8a9673eacc32fee5cb143cae9c6c3a36f0f79f54))
- **navbar:** Persist opened state between sessions ([#1815](https://github.com/VueTorrent/VueTorrent/issues/1815))
  ([17f9759](https://github.com/VueTorrent/VueTorrent/commit/17f9759bbf9d4fea6f9989f01cdbd45f533ca4b9))
- **trackers:** Switch to table view ([#1813](https://github.com/VueTorrent/VueTorrent/issues/1813))
  ([3fd85a1](https://github.com/VueTorrent/VueTorrent/commit/3fd85a1e567c6bdc34f36139486b9c6dfe86ebbd))

## [2.11.0](https://github.com/VueTorrent/VueTorrent/compare/v2.10.2...v2.11.0) (2024-07-21)

### Features

- **export:** Zip files when exporting several torrents ([#1794](https://github.com/VueTorrent/VueTorrent/issues/1794))
  ([7236b23](https://github.com/VueTorrent/VueTorrent/commit/7236b232813b399dd18186425558808aa26033e9))
- **PWA:** Add \*.torrent file handler ([#1754](https://github.com/VueTorrent/VueTorrent/issues/1754))
  ([440a700](https://github.com/VueTorrent/VueTorrent/commit/440a700284fd2606158230bf1d29eb0d9f45bac3))

### Bug Fixes

- add missing triggers on shallow refs after [#1797](https://github.com/VueTorrent/VueTorrent/issues/1797)
  ([2d49f2a](https://github.com/VueTorrent/VueTorrent/commit/2d49f2ae6ebe7539e27723fea12871556bfbd0fe))
- **content:** Fix regressions after [#1779](https://github.com/VueTorrent/VueTorrent/issues/1779) ([#1785](https://github.com/VueTorrent/VueTorrent/issues/1785))
  ([b977713](https://github.com/VueTorrent/VueTorrent/commit/b977713b09fee8a9353e1a2f97f2bd2e38637acb))
- **Dashboard:** Clean removed data from local cache ([#1773](https://github.com/VueTorrent/VueTorrent/issues/1773))
  ([e3e6549](https://github.com/VueTorrent/VueTorrent/commit/e3e65492d181602f47fbd3b46c940e7575c93c25))
- **Dashboard:** Name sort not working ([#1769](https://github.com/VueTorrent/VueTorrent/issues/1769))
  ([394b86d](https://github.com/VueTorrent/VueTorrent/commit/394b86d6dc02c21909d5a84ddc962fb8cdfd739a))
- **Dashboard:** torrents not removed from local cache ([#1772](https://github.com/VueTorrent/VueTorrent/issues/1772))
  ([2f967ff](https://github.com/VueTorrent/VueTorrent/commit/2f967ff883a2d1350dc372da65f63805459368a9))
- **graph:** weird gradient ([#1761](https://github.com/VueTorrent/VueTorrent/issues/1761))
  ([57d6cdc](https://github.com/VueTorrent/VueTorrent/commit/57d6cdcc334bf7c187f8610a3253bb4cc42c76ff))
- **maindata:** Handle partial data with full_update after [#1762](https://github.com/VueTorrent/VueTorrent/issues/1762)
  ([#1784](https://github.com/VueTorrent/VueTorrent/issues/1784)) ([1eb0a93](https://github.com/VueTorrent/VueTorrent/commit/1eb0a93a1ca9eeb463a05221d001be5b8a384e94))
- **Navbar:** Graph values not pushed on full update ([#1777](https://github.com/VueTorrent/VueTorrent/issues/1777))
  ([89113dc](https://github.com/VueTorrent/VueTorrent/commit/89113dc5bab5a7bde2ff707be9af3a21dda18361))
- **Overview:** Filename not refreshing after rename ([#1765](https://github.com/VueTorrent/VueTorrent/issues/1765))
  ([fe1157a](https://github.com/VueTorrent/VueTorrent/commit/fe1157a5b95677ad9cc26a8d81d03e53aaffed82))

### Improvements

- **App:** Display loading when fetching initial login status ([#1793](https://github.com/VueTorrent/VueTorrent/issues/1793))
  ([1599b0f](https://github.com/VueTorrent/VueTorrent/commit/1599b0f5e776038e3943f2a29633be30fb8b37c0))
- **content:** Add bulk selection using filters ([#1795](https://github.com/VueTorrent/VueTorrent/issues/1795))
  ([7ccfc55](https://github.com/VueTorrent/VueTorrent/commit/7ccfc557595e4a74cc64ec8690974393aa45f43e))
- **content:** Add invert priority right click action ([#1791](https://github.com/VueTorrent/VueTorrent/issues/1791))
  ([bbd58ff](https://github.com/VueTorrent/VueTorrent/commit/bbd58ffaf72eaa0a868a1fcfa35d3df6af3255c0))
- **content:** Improve progress accuracy ([#1779](https://github.com/VueTorrent/VueTorrent/issues/1779))
  ([d04cbf3](https://github.com/VueTorrent/VueTorrent/commit/d04cbf3bd71f83aafb25bb005d62215b20deda4b))
- **Dashboard:** Allow to filter torrents by hash ([#1766](https://github.com/VueTorrent/VueTorrent/issues/1766))
  ([2300fce](https://github.com/VueTorrent/VueTorrent/commit/2300fce373681489a03a140400e3c1e43764882c))
- Drastically increase performance on dashboard and content view ([#1797](https://github.com/VueTorrent/VueTorrent/issues/1797))
  ([9d8982e](https://github.com/VueTorrent/VueTorrent/commit/9d8982ef56582b78c8b12b1bb835741720cb3f8a))
- **network:** Reduce API calls by using the maindata sync throughout the app ([#1762](https://github.com/VueTorrent/VueTorrent/issues/1762))
  ([7f01112](https://github.com/VueTorrent/VueTorrent/commit/7f01112af8b414ccca842da5685cde2643d33460))
- Remove openSideBarOnStart setting in favor of screen type ([#1796](https://github.com/VueTorrent/VueTorrent/issues/1796))
  ([2df6196](https://github.com/VueTorrent/VueTorrent/commit/2df6196a5cc289f660572b567a8fbe905b480e98))
- **sort system:** Group numbers when sorting names and paths ([#1771](https://github.com/VueTorrent/VueTorrent/issues/1771))
  ([c2d6e5c](https://github.com/VueTorrent/VueTorrent/commit/c2d6e5cdbcb1696b5d19b6f061c52f4a024b7966))

## [2.10.2](https://github.com/VueTorrent/VueTorrent/compare/v2.10.1...v2.10.2) (2024-06-28)

### Bug Fixes

- **CI:** Add missing output ([#1759](https://github.com/VueTorrent/VueTorrent/issues/1759))
  ([acbf51b](https://github.com/VueTorrent/VueTorrent/commit/acbf51b48c9548b1093ffbd6dba09e95847a7c03))

## [2.10.1](https://github.com/VueTorrent/VueTorrent/compare/v2.10.0...v2.10.1) (2024-06-28)

### Bug Fixes

- **CI:** Fix LSIO mod build ([#1757](https://github.com/VueTorrent/VueTorrent/issues/1757))
  ([766957c](https://github.com/VueTorrent/VueTorrent/commit/766957ce2f50b56631a499c169baf703226f4ced))

## [2.10.0](https://github.com/VueTorrent/VueTorrent/compare/v2.9.0...v2.10.0) (2024-06-28)

### Features

- **addons:** Add qbit Enhanced edition support ([#1718](https://github.com/VueTorrent/VueTorrent/issues/1718))
  ([d273ab8](https://github.com/VueTorrent/VueTorrent/commit/d273ab810fe52df882065b66ff51b1e7a0f0ff05))
- **Dashboard:** Add truncated hash and basename paths properties ([#1747](https://github.com/VueTorrent/VueTorrent/issues/1747))
  ([69f949a](https://github.com/VueTorrent/VueTorrent/commit/69f949a7ad400843eee406e4e0a61436b8fabd2a))
- **dashboard:** Use local sort system on all properties ([#1740](https://github.com/VueTorrent/VueTorrent/issues/1740))
  ([63dd06f](https://github.com/VueTorrent/VueTorrent/commit/63dd06fab1ea0190a9984e0984b1ab4d14e0e72c))
- **docker:** Build official LSIO mod docker image ([#1756](https://github.com/VueTorrent/VueTorrent/issues/1756))
  ([f4d460b](https://github.com/VueTorrent/VueTorrent/commit/f4d460b3dcecead4273242264c0fa09c6c7478fb))
- **Drag-and-Drop:** Add instant download zone ([#1750](https://github.com/VueTorrent/VueTorrent/issues/1750))
  ([feec23d](https://github.com/VueTorrent/VueTorrent/commit/feec23d93289a7034e240d7fe6016a523a199734))

### Bug Fixes

- **chips:** Use text instead of invisible pill ([#1712](https://github.com/VueTorrent/VueTorrent/issues/1712))
  ([c2beb03](https://github.com/VueTorrent/VueTorrent/commit/c2beb03c2a2566d38161e43f4a3ee2919bd40cbd))
- **colors:** Rework torrent state colors for better readability ([#1738](https://github.com/VueTorrent/VueTorrent/issues/1738))
  ([550570b](https://github.com/VueTorrent/VueTorrent/commit/550570b1aa0be43f6bc0f12a71317e0be64c14dd))
- **content:** Improve Windows path support ([#1714](https://github.com/VueTorrent/VueTorrent/issues/1714))
  ([27f37a4](https://github.com/VueTorrent/VueTorrent/commit/27f37a4fadb14787a94af87fcf2e664858036c1f))
- **content:** Prevent app from freezing when exiting too quickly ([38a33c4](https://github.com/VueTorrent/VueTorrent/commit/38a33c41c0117ebb62f391e2336f6f41960aa07a))
- **Dashboard:** Fix span selection after [#1740](https://github.com/VueTorrent/VueTorrent/issues/1740) ([#1746](https://github.com/VueTorrent/VueTorrent/issues/1746))
  ([24e8313](https://github.com/VueTorrent/VueTorrent/commit/24e831359bea8bac5f9105d11b5e9c6568885aba))
- **dashboard:** Prevent "Delete" action when search input is focused ([#1729](https://github.com/VueTorrent/VueTorrent/issues/1729))
  ([7589ebe](https://github.com/VueTorrent/VueTorrent/commit/7589ebe4abc6e0bc1ba2b6193ce91ea7fa785cb4))
- Do not wrap items to 2 or more lines in table view closes [#1538](https://github.com/VueTorrent/VueTorrent/issues/1538)
  ([#1716](https://github.com/VueTorrent/VueTorrent/issues/1716)) ([fa86db5](https://github.com/VueTorrent/VueTorrent/commit/fa86db59d5a5d7a4bd5f7416f4518fb8a8bd58eb))
- **peers:** Update 100% peer color after [#1740](https://github.com/VueTorrent/VueTorrent/issues/1740) ([#1753](https://github.com/VueTorrent/VueTorrent/issues/1753))
  ([0c1a65f](https://github.com/VueTorrent/VueTorrent/commit/0c1a65fc6c6522dd5c2f45d8ed7c3651833fb6dd))
- **pieceCanvas:** Fix color names after [#1740](https://github.com/VueTorrent/VueTorrent/issues/1740) ([#1745](https://github.com/VueTorrent/VueTorrent/issues/1745))
  ([60beb8a](https://github.com/VueTorrent/VueTorrent/commit/60beb8a387254cad36d3548f993c51bd11107e48))

## [2.9.0](https://github.com/VueTorrent/VueTorrent/compare/v2.8.1...v2.9.0) (2024-06-01)

### Features

- Add theme variants ([#1641](https://github.com/VueTorrent/VueTorrent/issues/1641))
  ([6a20007](https://github.com/VueTorrent/VueTorrent/commit/6a20007290b3f1846583dc6fd3330bc0b8a7a6e0))
- **pages:** Deploy mocked demo version ([#1690](https://github.com/VueTorrent/VueTorrent/issues/1690))
  ([f8695bf](https://github.com/VueTorrent/VueTorrent/commit/f8695bf9a6d16f8f073381c6ab0750b770c0de1c))
- **tags:** added remove all button for tags in rightClick menu ([#1701](https://github.com/VueTorrent/VueTorrent/issues/1701))
  ([2a4aedc](https://github.com/VueTorrent/VueTorrent/commit/2a4aedc86dacbb53e64031cb56cbb6fd4dc86a89))
- **tags:** option to have tags/categories without the “pill” shape ([#1492](https://github.com/VueTorrent/VueTorrent/issues/1492))
  ([#1708](https://github.com/VueTorrent/VueTorrent/issues/1708)) ([c3fc963](https://github.com/VueTorrent/VueTorrent/commit/c3fc9634652468a2f4edd537505b263754ca9d7d))

### Bug Fixes

- **content:** files not rendering under certain conditions ([#1696](https://github.com/VueTorrent/VueTorrent/issues/1696))
  ([b85e403](https://github.com/VueTorrent/VueTorrent/commit/b85e403829e5ca8b99703a09da7be3b4b4c5123d))
- **content:** Selected files stays at 0/0 ([#1702](https://github.com/VueTorrent/VueTorrent/issues/1702))
  ([ac9031d](https://github.com/VueTorrent/VueTorrent/commit/ac9031d2ad0a031822a90cc8c06a0005c478ce68))
- **filters:** "Untagged" value not using tracker filter when matched ([#1695](https://github.com/VueTorrent/VueTorrent/issues/1695))
  ([251472e](https://github.com/VueTorrent/VueTorrent/commit/251472e921d77da6665dffca0bf98ed8f877a709))

### Improvements

- **content:** Improve performance ([#1697](https://github.com/VueTorrent/VueTorrent/issues/1697))
  ([58341c6](https://github.com/VueTorrent/VueTorrent/commit/58341c63b7b405e5a38976c2871d98fc9a1ab267))
- **Peers:** Bring back sorting and filtering ([#1694](https://github.com/VueTorrent/VueTorrent/issues/1694))
  ([d6ed8dd](https://github.com/VueTorrent/VueTorrent/commit/d6ed8dd51a9d1760098a08849fa2ba573f26d10e))
- **RSS:** Rework RSS views ([#1685](https://github.com/VueTorrent/VueTorrent/issues/1685))
  ([baed303](https://github.com/VueTorrent/VueTorrent/commit/baed3032a21e9ac7ff3b80f5f0afc893d173b7d3))

## [2.8.1](https://github.com/VueTorrent/VueTorrent/compare/v2.8.0...v2.8.1) (2024-05-14)

### Bug Fixes

- **backend:** Exclude custom title from backend sync ([#1673](https://github.com/VueTorrent/VueTorrent/issues/1673))
  ([e9f78d4](https://github.com/VueTorrent/VueTorrent/commit/e9f78d4ebd96e4e4c38cf63e63e5a707b2792972))

### Improvements

- **MagnetHandler:** Add alias to old link for better compatibility ([#1682](https://github.com/VueTorrent/VueTorrent/issues/1682))
  ([3b1f5a3](https://github.com/VueTorrent/VueTorrent/commit/3b1f5a3cd909c54787a67e11cafb0c00f51b56db))
- **Peers:** Show client, peer_id, and i18n strings ([#1579](https://github.com/VueTorrent/VueTorrent/issues/1579))
  ([cbfe2c9](https://github.com/VueTorrent/VueTorrent/commit/cbfe2c92a71ebe626584e50f46e7868c9bf6f655))
- Reword torrent priority to queue position ([#1667](https://github.com/VueTorrent/VueTorrent/issues/1667))
  ([719a29d](https://github.com/VueTorrent/VueTorrent/commit/719a29d778040fa73228cbf3937a23ab08c7ae9d))
- **RSS:** add refresh all rss feeds button to rss articles ([#1679](https://github.com/VueTorrent/VueTorrent/issues/1679))
  ([4ddf5f3](https://github.com/VueTorrent/VueTorrent/commit/4ddf5f3469861f9dbc396ea18d9e9ae0de37a449))
- **settings:** Prettify exported JSON ([#1672](https://github.com/VueTorrent/VueTorrent/issues/1672))
  ([84b9c12](https://github.com/VueTorrent/VueTorrent/commit/84b9c12881ef81cac360e98af600fae9c69b255a))
- **TorrentDetail:** Use colors for ratio and chips ([#1662](https://github.com/VueTorrent/VueTorrent/issues/1662))
  ([c902d62](https://github.com/VueTorrent/VueTorrent/commit/c902d622b9684112108aab038db75d13ae474976))

## [2.8.0](https://github.com/VueTorrent/VueTorrent/compare/v2.7.3...v2.8.0) (2024-04-23)

### Features

- Add optional backend handling ([#1547](https://github.com/VueTorrent/VueTorrent/issues/1547))
  ([d513e09](https://github.com/VueTorrent/VueTorrent/commit/d513e097bf325088b434fbf9529dab4609a7ede7))
- **TorrentDetail:** add bulk renaming ([#1624](https://github.com/VueTorrent/VueTorrent/issues/1624))
  ([a7ebcb5](https://github.com/VueTorrent/VueTorrent/commit/a7ebcb59d95e03029f68ecee3632fdbe73eafa79))

### Bug Fixes

- Add missing forcedMetaDL state ([#1652](https://github.com/VueTorrent/VueTorrent/issues/1652))
  ([1013151](https://github.com/VueTorrent/VueTorrent/commit/1013151e718bde6bb41365bc249e01ba9a422e95))
- **AddTorrentParams:** Convert seeding time to minutes manually ([#1649](https://github.com/VueTorrent/VueTorrent/issues/1649))
  ([3d05859](https://github.com/VueTorrent/VueTorrent/commit/3d0585928da85e5d97c2e2d8f804afde477f372e))
- **MagnetHandler:** Don't show add dialog if not authenticated ([#1657](https://github.com/VueTorrent/VueTorrent/issues/1657))
  ([a0cdffd](https://github.com/VueTorrent/VueTorrent/commit/a0cdffd380634ef0c866657201b7af98e5f78f2c))
- seeds and peers shows same value ([#1632](https://github.com/VueTorrent/VueTorrent/issues/1632))
  ([bd09a8a](https://github.com/VueTorrent/VueTorrent/commit/bd09a8a4250ac6f1a0999c985f5afc3aee300eb8))
- **share limits:** Revert and fix display ([#1654](https://github.com/VueTorrent/VueTorrent/issues/1654))
  ([2eca39e](https://github.com/VueTorrent/VueTorrent/commit/2eca39e899956280a682c1c53a6d145020435599))
- **WebUI:** Bypass auth subnet whitelist not working ([#1645](https://github.com/VueTorrent/VueTorrent/issues/1645))
  ([4cbb456](https://github.com/VueTorrent/VueTorrent/commit/4cbb45679c0e4f39314c51937ebaa2593a86e994))

### Improvements

- **Content:** Better handle tree filtering ([#1631](https://github.com/VueTorrent/VueTorrent/issues/1631))
  ([f4e73aa](https://github.com/VueTorrent/VueTorrent/commit/f4e73aa7fcda207ef38873db4452fd84d931f0f3))
- **ratio colors:** Add feature toggle ([#1633](https://github.com/VueTorrent/VueTorrent/issues/1633))
  ([6874944](https://github.com/VueTorrent/VueTorrent/commit/68749446f6cb772b1d04970172b2c2bd160b13f3))

## [2.7.3](https://github.com/VueTorrent/VueTorrent/compare/v2.7.2...v2.7.3) (2024-04-02)

### Bug Fixes

- **AddTorrentDialog:** Unset download path if default is unchecked ([#1619](https://github.com/VueTorrent/VueTorrent/issues/1619))
  ([b6db317](https://github.com/VueTorrent/VueTorrent/commit/b6db3175997bb14d2c8f407e50cce8115d79ce01))
- announced IP not parsed correctly ([#1601](https://github.com/VueTorrent/VueTorrent/issues/1601))
  ([c76caef](https://github.com/VueTorrent/VueTorrent/commit/c76caef77d997ab91f878f49efb05b8241d7e41e))
- **RSS Rules:** Download limits not sent correctly to qbit ([#1622](https://github.com/VueTorrent/VueTorrent/issues/1622))
  ([a8dbea8](https://github.com/VueTorrent/VueTorrent/commit/a8dbea8652af7db8bbd0c6aff3cb6d2c77731ce7))
- **RSS Rules:** Fix last match not displaying ([#1618](https://github.com/VueTorrent/VueTorrent/issues/1618))
  ([a4ca1c9](https://github.com/VueTorrent/VueTorrent/commit/a4ca1c90c5752ee1338a0f94c3b8b7e25ccc7944))
- **RSS Rules:** Include deprecated fields for better retro-compatibility ([#1621](https://github.com/VueTorrent/VueTorrent/issues/1621))
  ([cca5a36](https://github.com/VueTorrent/VueTorrent/commit/cca5a364eff5e3754549069554dbba4cd17b2014))
- **ServiceWorker:** sw.js url ([#1609](https://github.com/VueTorrent/VueTorrent/issues/1609))
  ([702ff80](https://github.com/VueTorrent/VueTorrent/commit/702ff80ae364599d1b252da363e14d5232ccb9f3))
- **TorrentDetail:** Differentiate fullName for the root node([#1616](https://github.com/VueTorrent/VueTorrent/issues/1616))
  ([#1617](https://github.com/VueTorrent/VueTorrent/issues/1617)) ([4ce5eca](https://github.com/VueTorrent/VueTorrent/commit/4ce5eca6172fddb25211d82520958b19dabcb995))

### Improvements

- add title navigation ([#1590](https://github.com/VueTorrent/VueTorrent/issues/1590))
  ([13afd79](https://github.com/VueTorrent/VueTorrent/commit/13afd7920e453f8ebd211bdf8acb60b67eb5470e))
- **chip colors:** Add feature toggle ([#1600](https://github.com/VueTorrent/VueTorrent/issues/1600))
  ([d311a69](https://github.com/VueTorrent/VueTorrent/commit/d311a69bdc4f9c1e4ee5bb19cb73c4dc303cbcf7))
- fetch Geolocation & ISP details ([#1602](https://github.com/VueTorrent/VueTorrent/issues/1602))
  ([902b044](https://github.com/VueTorrent/VueTorrent/commit/902b0442595afb016791c2d685d30af121c1e65c))
- Replace ratio_time_limit by seeding_time_limit ([#1611](https://github.com/VueTorrent/VueTorrent/issues/1611))
  ([6edde21](https://github.com/VueTorrent/VueTorrent/commit/6edde21976c512ce75c2b2666e9b9d2d2cc382b8))
- special values for ratio limit ([#1613](https://github.com/VueTorrent/VueTorrent/issues/1613))
  ([2e379cf](https://github.com/VueTorrent/VueTorrent/commit/2e379cf242e5d1c0c4e229d3638cd9bea9e7b873))
- **torrentCard:** Add select all / none buttons ([#1604](https://github.com/VueTorrent/VueTorrent/issues/1604))
  ([492c0dd](https://github.com/VueTorrent/VueTorrent/commit/492c0ddad72425511bddd00a3306cde097a1641e))
- **TorrentCard:** decrease chip size ([#1608](https://github.com/VueTorrent/VueTorrent/issues/1608))
  ([08a49f0](https://github.com/VueTorrent/VueTorrent/commit/08a49f04b607b9185a90f1df653ad374c283fe37))
- **TorrentCard:** decrease chip size for table view ([#1610](https://github.com/VueTorrent/VueTorrent/issues/1610))
  ([3413ef0](https://github.com/VueTorrent/VueTorrent/commit/3413ef0e241bada21713795f35dd55d2a1b9d7de))

## [2.7.2](https://github.com/VueTorrent/VueTorrent/compare/v2.7.1...v2.7.2) (2024-03-19)

### Bug Fixes

- **rightClick:** Prevent queueing_enabled error when not logged in ([#1553](https://github.com/VueTorrent/VueTorrent/issues/1553))
  ([2ed76f0](https://github.com/VueTorrent/VueTorrent/commit/2ed76f05ffd6af22e6ef44b40f1356af0a7cfe02))
- support lower version browsers with top level await [#1563](https://github.com/VueTorrent/VueTorrent/issues/1563)
  ([38c590e](https://github.com/VueTorrent/VueTorrent/commit/38c590ed51e80e7f902cd1863e7f632202eb3ede))
- **TorrentDetail:** Application crash, execution timing ([#1572](https://github.com/VueTorrent/VueTorrent/issues/1572))
  ([073187b](https://github.com/VueTorrent/VueTorrent/commit/073187b42fbf4214658f120530f198eba3386002))

### Improvements

- Add category / tag chip color ([#1539](https://github.com/VueTorrent/VueTorrent/issues/1539))
  ([05b3e35](https://github.com/VueTorrent/VueTorrent/commit/05b3e357c998a74feb9816b9540dd47c0a92cd78))
- Add ratio colors ([#1581](https://github.com/VueTorrent/VueTorrent/issues/1581))
  ([4c6410d](https://github.com/VueTorrent/VueTorrent/commit/4c6410dee7e03ec4f3a0a1b1c104d7de04243f0d))
- **connection status:** Improve external IP error message ([#1587](https://github.com/VueTorrent/VueTorrent/issues/1587))
  ([d84f00e](https://github.com/VueTorrent/VueTorrent/commit/d84f00ef5459da5b89f184b9b43d3bc73eedeba4))
- **content:** Add clear icon on search input ([#1583](https://github.com/VueTorrent/VueTorrent/issues/1583))
  ([5a989aa](https://github.com/VueTorrent/VueTorrent/commit/5a989aa38585f6c4925a1222a8fc65f70c5de13c))
- **DnDZone:** Prevent stuck zone when leaving too early ([#1568](https://github.com/VueTorrent/VueTorrent/issues/1568))
  ([2943ed1](https://github.com/VueTorrent/VueTorrent/commit/2943ed11160e6ad4d2b1a6d799d7ebf7f9720854))
- **logs:** Bring back colors and improve responsive design ([#1580](https://github.com/VueTorrent/VueTorrent/issues/1580))
  ([ba2b0ef](https://github.com/VueTorrent/VueTorrent/commit/ba2b0efe27f7ecf3c40d89f716b9f263a2371cef))
- **RssArticles:** Prevent de-duplication of description dialog ([#1575](https://github.com/VueTorrent/VueTorrent/issues/1575))
  ([cd9a384](https://github.com/VueTorrent/VueTorrent/commit/cd9a3845a02812657ffc105908792c77c069798d))
- **SearchEngine:** Add description link ([#1574](https://github.com/VueTorrent/VueTorrent/issues/1574))
  ([61de1fa](https://github.com/VueTorrent/VueTorrent/commit/61de1fab44772778cd9e3840146a15baa711f15e))
- **search:** Handle dash (-) sign to exclude tokens from results ([#1551](https://github.com/VueTorrent/VueTorrent/issues/1551))
  ([78e6750](https://github.com/VueTorrent/VueTorrent/commit/78e6750ea75ac1dc412cffec0526f6d8b2575530))
- **TorrentDetail:** Overview Piece Renderer ([#1564](https://github.com/VueTorrent/VueTorrent/issues/1564))
  ([5ed280c](https://github.com/VueTorrent/VueTorrent/commit/5ed280c0ddabc5917721c685359d30530ab24ac7))

## [2.7.1](https://github.com/VueTorrent/VueTorrent/compare/v2.7.0...v2.7.1) (2024-02-26)

### Bug Fixes

- auto-reload in unsecure contexts ([#1532](https://github.com/VueTorrent/VueTorrent/issues/1532))
  ([e8c5e04](https://github.com/VueTorrent/VueTorrent/commit/e8c5e04161e9827f5bf056519d1c042d10ed01e4))
- auto-reload when disabling VueTorrent ([#1531](https://github.com/VueTorrent/VueTorrent/issues/1531))
  ([aaf2ecb](https://github.com/VueTorrent/VueTorrent/commit/aaf2ecbde11e085ef00f5058eede7beb697a0db7))
- **content:** Add right click workaround for apple devices ([#1521](https://github.com/VueTorrent/VueTorrent/issues/1521))
  ([94949ec](https://github.com/VueTorrent/VueTorrent/commit/94949ecca8194ad361131b2c9fddab9add76e2d8))
- **content:** file list not loading ([#1524](https://github.com/VueTorrent/VueTorrent/issues/1524))
  ([8a9bf16](https://github.com/VueTorrent/VueTorrent/commit/8a9bf16710e864d39934bd1c2f95a9bedef0ee98))
- **Peers:** Wrap IPv6 to display ban button ([#1517](https://github.com/VueTorrent/VueTorrent/issues/1517))
  ([dfd7bf7](https://github.com/VueTorrent/VueTorrent/commit/dfd7bf714836ca654f8097b963348ffd2f4eef40))
- pluralization logic in i18n.ts for "ru" ([#1537](https://github.com/VueTorrent/VueTorrent/issues/1537))
  ([bd60cb7](https://github.com/VueTorrent/VueTorrent/commit/bd60cb72e56b7831457678f154b96f2b5c705dbd))
- **preferences:** Update banned IP field when banning from the Peers tab ([#1518](https://github.com/VueTorrent/VueTorrent/issues/1518))
  ([55f4865](https://github.com/VueTorrent/VueTorrent/commit/55f4865ca1bf5a71f245c57c877e8fdcbc0216f3))
- **QbitProvider:** manually add indexes to getTorrentFiles response to provide compatibility with older version (&lt; 4.4.0)
  ([#1510](https://github.com/VueTorrent/VueTorrent/issues/1510)) ([512d177](https://github.com/VueTorrent/VueTorrent/commit/512d1770410e87bd6c896e10d5f22fbc0122bd69))
- **settings:** Infinite scroll value not recognized ([#1520](https://github.com/VueTorrent/VueTorrent/issues/1520))
  ([f540ccd](https://github.com/VueTorrent/VueTorrent/commit/f540ccd1ba910a715bb036f5d957dbcc611b3aea))

### Improvements

- **AddTorrentDialog:** Deduplicate AddTorrent form and AddTorrentParamsForm ([#1541](https://github.com/VueTorrent/VueTorrent/issues/1541))
  ([8e14e7c](https://github.com/VueTorrent/VueTorrent/commit/8e14e7c60d4cc9f256460089a259800316a465bc))
- **Content tab:** Allow filtering files by name ([#1542](https://github.com/VueTorrent/VueTorrent/issues/1542))
  ([47de865](https://github.com/VueTorrent/VueTorrent/commit/47de8657d6948913b4ed16596999b99713d8799d))
- **Info:** add torrent properties ([#1528](https://github.com/VueTorrent/VueTorrent/issues/1528))
  ([196f5e3](https://github.com/VueTorrent/VueTorrent/commit/196f5e33f3f93150d833dcb2c0940fb45b8ede49))
- **sw:** Use relative addresses for better compatibility with reverse proxies ([#1511](https://github.com/VueTorrent/VueTorrent/issues/1511))
  ([a3dc22e](https://github.com/VueTorrent/VueTorrent/commit/a3dc22e27e074674df14823b6e78fddf0fb924a3))
- **TorrentDetail:** Reduce API calls by centralizing files data ([#1529](https://github.com/VueTorrent/VueTorrent/issues/1529))
  ([e92d305](https://github.com/VueTorrent/VueTorrent/commit/e92d3051e8613e7774039d6800925940899426e2))

## [2.7.0](https://github.com/VueTorrent/VueTorrent/compare/v2.6.0...v2.7.0) (2024-02-07)

### Features

- **rss:** Update rule form to include `enabled` and `torrentParams` ([#1501](https://github.com/VueTorrent/VueTorrent/issues/1501))
  ([aefa996](https://github.com/VueTorrent/VueTorrent/commit/aefa996a6c69ae30c760161f905d884f17d71f30))

### Bug Fixes

- **import:** Update field validation to prevent false negative ([#1495](https://github.com/VueTorrent/VueTorrent/issues/1495))
  ([35d8700](https://github.com/VueTorrent/VueTorrent/commit/35d87002576beb9b19588730cb7600b67dfccc5c))
- **localization:** Add missing ru pluralization rule ([#1500](https://github.com/VueTorrent/VueTorrent/issues/1500))
  ([01ac1bb](https://github.com/VueTorrent/VueTorrent/commit/01ac1bb577bffb79630501bf49be3ed78ed36c10))
- **progress:** Remove striping on table view ([#1490](https://github.com/VueTorrent/VueTorrent/issues/1490))
  ([3256b1b](https://github.com/VueTorrent/VueTorrent/commit/3256b1b186106ce31a9398d9c22e110f8088d63c))
- **RSS:** Fetch feeds when opening the RSS Rule dialog ([#1496](https://github.com/VueTorrent/VueTorrent/issues/1496))
  ([7421e28](https://github.com/VueTorrent/VueTorrent/commit/7421e288397c522895e2cfd754e884566658e5e6))

### Improvements

- **autofill:** Add valid id on login fields ([#1507](https://github.com/VueTorrent/VueTorrent/issues/1507))
  ([fc76202](https://github.com/VueTorrent/VueTorrent/commit/fc762022375b3af7175be91b8aaf8848c390df02))
- **SpeedGraph:** Add time as X axis instead of computed step ([#1494](https://github.com/VueTorrent/VueTorrent/issues/1494))
  ([d750370](https://github.com/VueTorrent/VueTorrent/commit/d750370282d3c6d0df7daf96e3495511ba0d9ae4))

## [2.6.0](https://github.com/VueTorrent/VueTorrent/compare/v2.5.0...v2.6.0) (2024-01-28)

### Features

- Add Czech locale ([6a73a9c](https://github.com/VueTorrent/VueTorrent/commit/6a73a9c35b8c005f23d76c6237bc3a77cd120d4f))
- **content:** Rework content tab entirely ([#1470](https://github.com/VueTorrent/VueTorrent/issues/1470))
  ([6758072](https://github.com/VueTorrent/VueTorrent/commit/6758072296124abc9efcf4929ec4ec308c8a966a))

### Bug Fixes

- **accessibility:** Add name attributes to login form ([#1467](https://github.com/VueTorrent/VueTorrent/issues/1467))
  ([bf9566f](https://github.com/VueTorrent/VueTorrent/commit/bf9566fbbf36cbf18a69a8c2bf8cb289564394e8))
- bump font weight [#1390](https://github.com/VueTorrent/VueTorrent/issues/1390)
  ([5c40261](https://github.com/VueTorrent/VueTorrent/commit/5c40261463c733fd6c61c2b5a27aee4dbf02ca23))
- **clipboard:** Add missing toast on clipboard action ([#1452](https://github.com/VueTorrent/VueTorrent/issues/1452))
  ([9b81865](https://github.com/VueTorrent/VueTorrent/commit/9b81865ded1fcc57c105376418a1e76871b6626b))
- disable progress bar striping [#1324](https://github.com/VueTorrent/VueTorrent/issues/1324)
  ([5e06f6d](https://github.com/VueTorrent/VueTorrent/commit/5e06f6d1f2018f74307d8a7dc09ed485c1cca179))
- horizontal scroll mobile ([da5a917](https://github.com/VueTorrent/VueTorrent/commit/da5a917ed932847bf6658f20cdbca070796a59bb))
- ios pwa status bar [#545](https://github.com/VueTorrent/VueTorrent/issues/545)
  ([196aff6](https://github.com/VueTorrent/VueTorrent/commit/196aff6d6064d3132362e293c5dd2c9651e8cfeb))
- scrollbar styling [#1397](https://github.com/VueTorrent/VueTorrent/issues/1397)
  ([7fb4107](https://github.com/VueTorrent/VueTorrent/commit/7fb410732a21dbacac6c82e7f96fec2b92d03726))
- submenu broken [#1483](https://github.com/VueTorrent/VueTorrent/issues/1483) ([0a1cb1e](https://github.com/VueTorrent/VueTorrent/commit/0a1cb1ea6a1b36647863dcfa75e63890ab0e3173))
- use expansion panel for logs [#1420](https://github.com/VueTorrent/VueTorrent/issues/1420)
  ([6979c49](https://github.com/VueTorrent/VueTorrent/commit/6979c493ca65071633c4938a5f2bf8d5d236c9c2))
- **v-menu:** Prevent menu close on all menus ([#1487](https://github.com/VueTorrent/VueTorrent/issues/1487))
  ([71538e3](https://github.com/VueTorrent/VueTorrent/commit/71538e3d4ce7251e83c65c7a9d0040485f216383))

### Improvements

- add check latest version [#941](https://github.com/VueTorrent/VueTorrent/issues/941)
  ([6eb2c15](https://github.com/VueTorrent/VueTorrent/commit/6eb2c15e20f4706098664e674ffa20ee2ac98c21))
- bring back active filter [#1280](https://github.com/VueTorrent/VueTorrent/issues/1280)
  ([afe4fa5](https://github.com/VueTorrent/VueTorrent/commit/afe4fa578456b807bf78a1f0f357fc995eca3168))
- bring back settings import [#1322](https://github.com/VueTorrent/VueTorrent/issues/1322)
  ([53fe2e5](https://github.com/VueTorrent/VueTorrent/commit/53fe2e55b64ea6cd1990b0a6c42a822203ff1258))
- darkmode toggle [#1478](https://github.com/VueTorrent/VueTorrent/issues/1478)
  ([97def1d](https://github.com/VueTorrent/VueTorrent/commit/97def1d915e588918e3b3cfa43f1ccf8d4df16ca))
- **pagination:** Allow for custom values for pagination size ([#1482](https://github.com/VueTorrent/VueTorrent/issues/1482))
  ([8db1a29](https://github.com/VueTorrent/VueTorrent/commit/8db1a293ee01e3c1420051df9fd51850ff1bc9c3))
- **PWA:** Use Network-only strategy for service worker ([#1468](https://github.com/VueTorrent/VueTorrent/issues/1468))
  ([f4842c4](https://github.com/VueTorrent/VueTorrent/commit/f4842c444484a2e7eda14bd84ed2fba094a695b0))
- search box spacing ([#1458](https://github.com/VueTorrent/VueTorrent/issues/1458))
  ([4ec69b6](https://github.com/VueTorrent/VueTorrent/commit/4ec69b660cfe5ad037938d494295224e6902dfae))
- UI text ([#1481](https://github.com/VueTorrent/VueTorrent/issues/1481)) ([6b03b31](https://github.com/VueTorrent/VueTorrent/commit/6b03b312736a61f65e457f524b871f26b57b64af))
- use search bar [#891](https://github.com/VueTorrent/VueTorrent/issues/891) ([67d76b6](https://github.com/VueTorrent/VueTorrent/commit/67d76b63345b1f2b260d7a47af7680eb060c3a72))

## [2.5.0](https://github.com/WDaan/VueTorrent/compare/v2.4.0...v2.5.0) (2024-01-09)

### Features

- **RSS:** Allow edit feed URL (4.6.0+) ([#1433](https://github.com/WDaan/VueTorrent/issues/1433))
  ([ade6def](https://github.com/WDaan/VueTorrent/commit/ade6defb826f3868532ac4d16ad0bdb2eec5a556))

### Bug Fixes

- make info tab selectable [#1413](https://github.com/WDaan/VueTorrent/issues/1413) ([7e8cc9c](https://github.com/WDaan/VueTorrent/commit/7e8cc9cdbcaa741c2c91c79b8cb113587662174c))
- **sortBy:** Fix height overflow ([#1441](https://github.com/WDaan/VueTorrent/issues/1441))
  ([b261d15](https://github.com/WDaan/VueTorrent/commit/b261d1547a966155740e47227d6e29c316e9136a))
- sticky add button [#1415](https://github.com/WDaan/VueTorrent/issues/1415) ([64c595e](https://github.com/WDaan/VueTorrent/commit/64c595eeac6e48d86c11ddc533122f1658c1b6a8))

### Improvements

- **add-torrent:** Use scrollable dialog instead of manual infinite scroll ([#1442](https://github.com/WDaan/VueTorrent/issues/1442))
  ([7288861](https://github.com/WDaan/VueTorrent/commit/7288861515ffb81d23ddcbce6446f0ad7726cab2))
- center login screen ([f773756](https://github.com/WDaan/VueTorrent/commit/f773756b163f3dae13076bfa4008ba9f3c905ca9))
- **dev:** Add MockProvider ([#1435](https://github.com/WDaan/VueTorrent/issues/1435))
  ([f5524b7](https://github.com/WDaan/VueTorrent/commit/f5524b7d8b3c4e73369078636d8b67027f8f265b))
- **SpeedGraph:** Init values with null ([#1422](https://github.com/WDaan/VueTorrent/issues/1422))
  ([51d58cf](https://github.com/WDaan/VueTorrent/commit/51d58cfc4962f3c4fcc71d9e65a09863f695e025))
- tweak torrent title ([0e67cea](https://github.com/WDaan/VueTorrent/commit/0e67cea318170000ec8fa00ac6918724f3ede999))

## [2.4.0](https://github.com/WDaan/VueTorrent/compare/v2.3.0...v2.4.0) (2023-12-09)

### Features

- **Chips:** Add option to hide values if empty ([#1380](https://github.com/WDaan/VueTorrent/issues/1380))
  ([6b94f6e](https://github.com/WDaan/VueTorrent/commit/6b94f6e2c28d8f8271a3059e5a5d3b75ed360379))
- **dashboard:** Add display mode configuration ([#1184](https://github.com/WDaan/VueTorrent/issues/1184))
  ([cd695ab](https://github.com/WDaan/VueTorrent/commit/cd695ab96da160493f0e7c790e117a056989e4c8))

### Bug Fixes

- **AddTorrentDialog:** Fix falsy values not sent to qbit ([#1377](https://github.com/WDaan/VueTorrent/issues/1377))
  ([8abda97](https://github.com/WDaan/VueTorrent/commit/8abda97341d3446890ad41f5d45618b87c6ad03f))
- **duration:** Values greater than a month weren't displayed ([#1381](https://github.com/WDaan/VueTorrent/issues/1381))
  ([8ba6d12](https://github.com/WDaan/VueTorrent/commit/8ba6d120c699f68806e9735068c9a917de386323))
- **helpers:** Rework toPrecision ([#1394](https://github.com/WDaan/VueTorrent/issues/1394))
  ([69398e0](https://github.com/WDaan/VueTorrent/commit/69398e02a5efdeb226486839a5259ea9dbba2fef))

### Performance Improvements

- **DnDZone:** Open add dialog on drop ([#1374](https://github.com/WDaan/VueTorrent/issues/1374))
  ([5635099](https://github.com/WDaan/VueTorrent/commit/5635099eee2b14cfebb2a8f5775c59c02c3a61dc))
- **logs:** Prevent duplication and add message filter ([#1398](https://github.com/WDaan/VueTorrent/issues/1398))
  ([a1c900c](https://github.com/WDaan/VueTorrent/commit/a1c900c0b30405869634f8c7947de80875c36a2e))
- Prevent rounding for relative time values ([#1378](https://github.com/WDaan/VueTorrent/issues/1378))
  ([86bba4e](https://github.com/WDaan/VueTorrent/commit/86bba4e8937e1b8cbe8503efe894682e82c06aef))
- Update translations ([#1373](https://github.com/WDaan/VueTorrent/issues/1373)) ([a9d9721](https://github.com/WDaan/VueTorrent/commit/a9d972117999c8c24e24b35f71dbf79825b5b65d))

## [2.3.0](https://github.com/WDaan/VueTorrent/compare/v2.2.0...v2.3.0) (2023-11-29)

### Features

- **history:** Add history to some fields ([#1361](https://github.com/WDaan/VueTorrent/issues/1361))
  ([ef50c6c](https://github.com/WDaan/VueTorrent/commit/ef50c6c3411ce4745ed79eae3c156250fe68a7f4))
- **Settings:** Handle tab routes in settings ([#1355](https://github.com/WDaan/VueTorrent/issues/1355))
  ([fdad814](https://github.com/WDaan/VueTorrent/commit/fdad814b1fabf9b3f141f5685fc9291434866e26))

### Bug Fixes

- **Advanced:** Network interfaces doesn't fill properly ([#1337](https://github.com/WDaan/VueTorrent/issues/1337))
  ([3c44709](https://github.com/WDaan/VueTorrent/commit/3c447098c63c2fd758947067f3a3c2b3ea763078))
- **tabs:** Remove swipe gestures ([#1356](https://github.com/WDaan/VueTorrent/issues/1356))
  ([41e021c](https://github.com/WDaan/VueTorrent/commit/41e021c63c67e87146f354f6c5aecbb6906486ee))

### Improvements

- Add download path management ([#1359](https://github.com/WDaan/VueTorrent/issues/1359))
  ([988ecaa](https://github.com/WDaan/VueTorrent/commit/988ecaaa03116c2c4fa9a4cbb4ce4e284fa4c7c3))
- add translations cron ([#1367](https://github.com/WDaan/VueTorrent/issues/1367)) ([02d97f5](https://github.com/WDaan/VueTorrent/commit/02d97f5283cf7f6d9f6a0fff42f07287c9c8f2dd))
- **localization:** Add missing keys to Tolgee ([#1349](https://github.com/WDaan/VueTorrent/issues/1349))
  ([3adeea4](https://github.com/WDaan/VueTorrent/commit/3adeea456f7f74307f1e221be506f72ed9d94ea0))

## [2.2.0](https://github.com/WDaan/VueTorrent/compare/v2.1.1...v2.2.0) (2023-11-20)

### Features

- **AddTorrentDialog:** Rework dialog to add missing parameters ([#1323](https://github.com/WDaan/VueTorrent/issues/1323))
  ([f69851c](https://github.com/WDaan/VueTorrent/commit/f69851cc39bd7ca47f426a5eb5d900c5c428b758))
- **ConnectionStatusDialog:** Add DHT node and active peer connections ([#1312](https://github.com/WDaan/VueTorrent/issues/1312))
  ([6f01c00](https://github.com/WDaan/VueTorrent/commit/6f01c008e88ad3c4a45fab7f8624416975756033))
- **Content:** Add menu to set file priority ([#1333](https://github.com/WDaan/VueTorrent/issues/1333))
  ([f83fe06](https://github.com/WDaan/VueTorrent/commit/f83fe0691a939a99ed4490d22d8aba9c1994d67d))
- **Overview:** Add keyboard shortcuts ([#1335](https://github.com/WDaan/VueTorrent/issues/1335))
  ([15a20a3](https://github.com/WDaan/VueTorrent/commit/15a20a3a4e68d86ddf54c0ee13463ed2288ddfc9))
- **preferences:** Update settings page to include missing preferences ([#1296](https://github.com/WDaan/VueTorrent/issues/1296))
  ([e034071](https://github.com/WDaan/VueTorrent/commit/e0340710cc7dce842d260edaf0848e241a36208b))
- **RSS:** Add conf to use ID instead of link ([#1334](https://github.com/WDaan/VueTorrent/issues/1334))
  ([6af7537](https://github.com/WDaan/VueTorrent/commit/6af75375571fadd650d1342c132e34d3ec6c3f49))

### Bug Fixes

- **AddTorrentDialog:** Add autocomplete attribute ([#1331](https://github.com/WDaan/VueTorrent/issues/1331))
  ([aaa4cc1](https://github.com/WDaan/VueTorrent/commit/aaa4cc16e9e7cac207a8286ce950e924c7718327))
- **AddTorrentDialog:** Prevent undefined values from being sent through API ([#1330](https://github.com/WDaan/VueTorrent/issues/1330))
  ([6575ade](https://github.com/WDaan/VueTorrent/commit/6575ade19e0bb6443bc8e29187cf952ff4f67262))
- authentication race condition ([#1319](https://github.com/WDaan/VueTorrent/issues/1319))
  ([153268f](https://github.com/WDaan/VueTorrent/commit/153268f30d3f2f8c618083caebd51894a42bc32a))
- **dashboard:** Fix span selection not using filters ([#1311](https://github.com/WDaan/VueTorrent/issues/1311))
  ([06d1815](https://github.com/WDaan/VueTorrent/commit/06d1815f002b01843518a6bbf54b976c35be1054))
- reduce title size [#1288](https://github.com/WDaan/VueTorrent/issues/1288) ([aab5cc1](https://github.com/WDaan/VueTorrent/commit/aab5cc16edd7247196daf298a366e0d369cfb932))
- reduce title size [#1288](https://github.com/WDaan/VueTorrent/issues/1288) ([0c7701a](https://github.com/WDaan/VueTorrent/commit/0c7701a4d2cd46b7851760e46dc7cf85ef0b6f5a))
- **Settings/Speed:** Fix speed values conversion ([#1332](https://github.com/WDaan/VueTorrent/issues/1332))
  ([02c0496](https://github.com/WDaan/VueTorrent/commit/02c049692bb6fc88f1ca76faa1b271118eb7eb4a))
- **settings:** Update disabled state in Bittorrent tab ([#1301](https://github.com/WDaan/VueTorrent/issues/1301))
  ([f1cefe4](https://github.com/WDaan/VueTorrent/commit/f1cefe4e3ced36b81feab03e7e5fdf852b7b131e))
- **TRC:** Use all selected torrents for transfer limits ([#1329](https://github.com/WDaan/VueTorrent/issues/1329))
  ([3614081](https://github.com/WDaan/VueTorrent/commit/3614081f198e1bedd35a2fbf54aa18a366594cf6))

### Improvements

- **stores:** Rework store structure to prevent circular imports ([#1325](https://github.com/WDaan/VueTorrent/issues/1325))
  ([179af5a](https://github.com/WDaan/VueTorrent/commit/179af5a1d6886b9543b9170ae697f1011af501b9))

## [2.1.1](https://github.com/WDaan/VueTorrent/compare/v2.1.0...v2.1.1) (2023-11-10)

### Bug Fixes

- **Navbar:** Add missing bind on right drawer setting ([#1294](https://github.com/WDaan/VueTorrent/issues/1294))
  ([672ab08](https://github.com/WDaan/VueTorrent/commit/672ab0863f3ee41a5fb2fd17bdba81306fb91be3))
- **RightClickMenu:** Fix target not being selected on long press ([#1295](https://github.com/WDaan/VueTorrent/issues/1295))
  ([d80cc35](https://github.com/WDaan/VueTorrent/commit/d80cc35e94f3caa94520abf5ed83ba29b7d3bc2c))
- **settings:** Update drag handling to completed properties ([#1286](https://github.com/WDaan/VueTorrent/issues/1286))
  ([dd53e6f](https://github.com/WDaan/VueTorrent/commit/dd53e6fc9d299b506b8c3f28c19ee131aa811430))

### Improvements

- **MagnetHandler:** Open add dialog on magnet link ([#1293](https://github.com/WDaan/VueTorrent/issues/1293))
  ([0c546f1](https://github.com/WDaan/VueTorrent/commit/0c546f1b373b34162ea437c16a7a0574321a8a7f))

## [2.1.0](https://github.com/WDaan/VueTorrent/compare/v2.0.1...v2.1.0) (2023-11-08)

### Features

- **filters:** Allow to disable filters temporarily ([6f9ee5d](https://github.com/WDaan/VueTorrent/commit/6f9ee5d0e36bd0a9e1707f50edc84d8979ae7a51))
- **localization:** Bringing back Russian locale ([#1281](https://github.com/WDaan/VueTorrent/issues/1281))
  ([20dc684](https://github.com/WDaan/VueTorrent/commit/20dc6843aa587dd571362efa34cd6cc986af4591))
- **ShareLimit:** Add torrent share limit dialog ([ed0991e](https://github.com/WDaan/VueTorrent/commit/ed0991e0a5b3985dbea40d343dc6a3c8224e1f32))
- **title:** Ability to set custom browser tab title ([1f58005](https://github.com/WDaan/VueTorrent/commit/1f58005109ab5b8a1cf6d9575246e24a105cc3a8))

### Bug Fixes

- **TorrentCard:** Fix properties not being persisted ([#1252](https://github.com/WDaan/VueTorrent/issues/1252))
  ([c61b957](https://github.com/WDaan/VueTorrent/commit/c61b957683c5ee6591b27de755fdad062e93e16f))

### Improvements

- **faker:** Improve torrent mocking ([#1187](https://github.com/WDaan/VueTorrent/issues/1187))
  ([8b1f641](https://github.com/WDaan/VueTorrent/commit/8b1f641fca79ad580bcb6d94f41ad0f52c495e80))
- **localization:** Integrate Tolgee inside CI ([#1276](https://github.com/WDaan/VueTorrent/issues/1276))
  ([86e12da](https://github.com/WDaan/VueTorrent/commit/86e12da8d0f3ef5e2f7b335277590f8769daf104))
- **TorrentCard:** Only process drag on handle ([#1253](https://github.com/WDaan/VueTorrent/issues/1253))
  ([681e59f](https://github.com/WDaan/VueTorrent/commit/681e59f7c76eb5b984aa968782a81d08fd271cc3))
- **Torrent:** Wrap title ([55c2ef8](https://github.com/WDaan/VueTorrent/commit/55c2ef811543ebcc84124d3304689f2901064e77))

## [2.0.1](https://github.com/WDaan/VueTorrent/compare/v2.0.0...v2.0.1) (2023-11-04)

### Bug Fixes

- **dashboard:** Take filters into account when selecting all torrents ([9f4aa4a](https://github.com/WDaan/VueTorrent/commit/9f4aa4a119046d72eb5c2ad0047205c32c426c7a))
- **settings:** Add DnD exception on settings page ([d91070b](https://github.com/WDaan/VueTorrent/commit/d91070b4a28508d1ea7c4ad7e6e595f358194657))

### Improvements

- **settings reset:** Clear sessionStorage in addition to localStorage ([4eaaa33](https://github.com/WDaan/VueTorrent/commit/4eaaa33711f00fcb32515f58fedd6450d83f7cea))

## [2.0.0](https://github.com/WDaan/VueTorrent/compare/v1.8.0...v2.0.0) (2023-11-03)

### ⚠ BREAKING CHANGES

- Vue3 Rewrite ([#757](https://github.com/WDaan/VueTorrent/issues/757))

### Features

- **dashboard:** Add DL / UL Speed average to DashboardItems ([#1203](https://github.com/WDaan/VueTorrent/issues/1203))
  ([7af47f9](https://github.com/WDaan/VueTorrent/commit/7af47f9e3d375be39fe133f10c69eeee5fa3ff43))
- **filters:** Allow multiple selection ([#1202](https://github.com/WDaan/VueTorrent/issues/1202))
  ([41318c3](https://github.com/WDaan/VueTorrent/commit/41318c3d85da44833b7ce1e2afba9a613b07c624))
- **transfer limit:** Add callbacks for download / upload torrent limit ([#1217](https://github.com/WDaan/VueTorrent/issues/1217))
  ([1792df9](https://github.com/WDaan/VueTorrent/commit/1792df965ba78c83264b315b6f1ecbaca4b08e04))
- Vue3 Rewrite ([#757](https://github.com/WDaan/VueTorrent/issues/757)) ([575b071](https://github.com/WDaan/VueTorrent/commit/575b071f6db9edc01412fab45109d3f4d203552d))

### Bug Fixes

- **AddTorrentDialog:** Dialog was never initialized with default values ([#1214](https://github.com/WDaan/VueTorrent/issues/1214))
  ([44fd8d3](https://github.com/WDaan/VueTorrent/commit/44fd8d38619b7a468f8f0a7e04c71cf9cd94683b))
- **AddTorrentDialog:** Fix persistence not working ([#1213](https://github.com/WDaan/VueTorrent/issues/1213))
  ([9ee6533](https://github.com/WDaan/VueTorrent/commit/9ee65335e129139a4cff4ba307d94b8075f66558))
- **AddTorrent:** Error while accessing preferences ([#1216](https://github.com/WDaan/VueTorrent/issues/1216))
  ([c760072](https://github.com/WDaan/VueTorrent/commit/c76007241dbd604f6e31bc506b88a065dc57d920))
- Chinese translations([#1189](https://github.com/WDaan/VueTorrent/issues/1189)) ([3f34cfc](https://github.com/WDaan/VueTorrent/commit/3f34cfcfdb9b9ff0a0c1030e2cb82fd671c562a0))
- **dashboard:** Sort not working anymore ([#1211](https://github.com/WDaan/VueTorrent/issues/1211))
  ([b2bbcb9](https://github.com/WDaan/VueTorrent/commit/b2bbcb987e7569bfb58bf01930f4d6cbcb9e95c3))
- **rss:** Update overflow rules to handle long name without spaces ([#1228](https://github.com/WDaan/VueTorrent/issues/1228))
  ([e2ce2e8](https://github.com/WDaan/VueTorrent/commit/e2ce2e86f5ff59499834a91b8de6c3bc8aa1e156))

### Improvements

- add Chinese translations ([#1185](https://github.com/WDaan/VueTorrent/issues/1185))
  ([c50f1df](https://github.com/WDaan/VueTorrent/commit/c50f1df4d6027588e6d8fc9465d0bfeafd934f83))
- **AddTorrentDialog:** Add loading prop to add button ([#1192](https://github.com/WDaan/VueTorrent/issues/1192))
  ([ac3bb69](https://github.com/WDaan/VueTorrent/commit/ac3bb69a13e9b2bef3030f0b500ee37f1c79b0c5))
- **AddTorrentDialog:** persist form in sessionStorage ([#1193](https://github.com/WDaan/VueTorrent/issues/1193))
  ([e59f6bf](https://github.com/WDaan/VueTorrent/commit/e59f6bf206e7ace0fbc5eead955ada5caa63bd4a))
- **filters:** Reorder states ([197b9d7](https://github.com/WDaan/VueTorrent/commit/197b9d7d029c6669cccfb4c4fc183d62fed45de6))
- **rss:** Improve duplicate RSS article handling ([#1191](https://github.com/WDaan/VueTorrent/issues/1191))
  ([ee01382](https://github.com/WDaan/VueTorrent/commit/ee0138277177dbd9c5054ed81fb8ab11d5b919f0))
- **rss:** Right click mark article as read ([#1210](https://github.com/WDaan/VueTorrent/issues/1210))
  ([ee03b5c](https://github.com/WDaan/VueTorrent/commit/ee03b5cb58125df8fb073e264cc61bfda85ccd3b))
- **TorrentCard:** Darken selected item background ([#1215](https://github.com/WDaan/VueTorrent/issues/1215))
  ([8214a0e](https://github.com/WDaan/VueTorrent/commit/8214a0ebd43637bbe3eb7098f5b0ff5a5d0951b8))

## [1.8.0](https://github.com/WDaan/VueTorrent/compare/v1.7.4...v1.8.0) (2023-10-04)

### Features

- login with url query ([#1108](https://github.com/WDaan/VueTorrent/issues/1108)) ([459b7e0](https://github.com/WDaan/VueTorrent/commit/459b7e08f2c630f6e92a459fd39b3dade7ef7fdf))

### Bug Fixes

- hungarian translations ([#1127](https://github.com/WDaan/VueTorrent/issues/1127)) ([2c9c9d5](https://github.com/WDaan/VueTorrent/commit/2c9c9d5ac197c1e56fec2f26c20fc631c2dc86e1))

### Improvements

- Add autofocus on login page ([#1117](https://github.com/WDaan/VueTorrent/issues/1117))
  ([7ca220d](https://github.com/WDaan/VueTorrent/commit/7ca220dfa6eff9a6f943fcacd045ef6b8f2ce570))
- add Hungarian translations ([#1121](https://github.com/WDaan/VueTorrent/issues/1121))
  ([f584aad](https://github.com/WDaan/VueTorrent/commit/f584aadcea38e28251f7347a8d794eca8ce807a0))

## [1.7.4](https://github.com/WDaan/VueTorrent/compare/v1.7.3...v1.7.4) (2023-09-19)

### Bug Fixes

- change settings speed tab speed unit to KiBps ([#1082](https://github.com/WDaan/VueTorrent/issues/1082))
  ([587038a](https://github.com/WDaan/VueTorrent/commit/587038a7ae25fcedcb29b358a12e5f3a3b38ce64))
- formatDataValues for values with 4 digits or more ([#1083](https://github.com/WDaan/VueTorrent/issues/1083))
  ([ad562f0](https://github.com/WDaan/VueTorrent/commit/ad562f056a4976b484ae7f98da2eef8153f9b0c4))
- **logs:** wrong date parsing ([#1076](https://github.com/WDaan/VueTorrent/issues/1076))
  ([14a6b90](https://github.com/WDaan/VueTorrent/commit/14a6b90547dda3284254608f6cd203bc84634768))
- Revert "fix(logs): Wrong date parsing" ([#1099](https://github.com/WDaan/VueTorrent/issues/1099))
  ([1110bdb](https://github.com/WDaan/VueTorrent/commit/1110bdb8b780d9512366d1e46ed8aecadb2efa4d))

## [1.7.3](https://github.com/WDaan/VueTorrent/compare/v1.7.2...v1.7.3) (2023-08-31)

### Bug Fixes

- mobile long press [#911](https://github.com/WDaan/VueTorrent/issues/911) ([6871e54](https://github.com/WDaan/VueTorrent/commit/6871e54f94c19f4c5d54f6d5056a4f1b302a956a))
- revert longpress fix, unreliable on pwa [#911](https://github.com/WDaan/VueTorrent/issues/911)
  ([3214997](https://github.com/WDaan/VueTorrent/commit/3214997194f76d01b3ead9439589c3103eb2728c))

## [1.7.2](https://github.com/WDaan/VueTorrent/compare/v1.7.1...v1.7.2) (2023-08-31)

### Bug Fixes

- explicitly match the file ([#1065](https://github.com/WDaan/VueTorrent/issues/1065))
  ([7ea8ac3](https://github.com/WDaan/VueTorrent/commit/7ea8ac3ded7e523239c5c230f8a36b93095cc7f7))
- magnet handling issue caused by [#1041](https://github.com/WDaan/VueTorrent/issues/1041) ([#1056](https://github.com/WDaan/VueTorrent/issues/1056))
  ([6432dd9](https://github.com/WDaan/VueTorrent/commit/6432dd94168e37b8af2cd66241234cdec8c7738d))
- mobile long press [#911](https://github.com/WDaan/VueTorrent/issues/911) ([d394ab8](https://github.com/WDaan/VueTorrent/commit/d394ab885b6fec200f5878993c6918c906cc6f2f))

## [1.7.1](https://github.com/WDaan/VueTorrent/compare/v1.7.0...v1.7.1) (2023-08-16)

### Bug Fixes

- cache app.js in PWA mode ([#1038](https://github.com/WDaan/VueTorrent/issues/1038))
  ([9ea02fb](https://github.com/WDaan/VueTorrent/commit/9ea02fbf8c786363eb273d40d333eb50f34ce6e3))
- delayed torrent display on page opening ([#1022](https://github.com/WDaan/VueTorrent/issues/1022))
  ([ee6a73e](https://github.com/WDaan/VueTorrent/commit/ee6a73eacc1b7c922917a21bae6f966fa4b74c25))
- magnet handling ([#1041](https://github.com/WDaan/VueTorrent/issues/1041)) ([c57da2d](https://github.com/WDaan/VueTorrent/commit/c57da2d95a1100e43bdeb0d7f62512b88d27af10))
- **overview:** Canvas not displaying correctly ([#1032](https://github.com/WDaan/VueTorrent/issues/1032))
  ([b68c487](https://github.com/WDaan/VueTorrent/commit/b68c4870ef47001989735166440bfc2b3eca103a))
- progress and relavance numbers in DetailedPeers screen ([#1034](https://github.com/WDaan/VueTorrent/issues/1034))
  ([4cd7772](https://github.com/WDaan/VueTorrent/commit/4cd7772502f0dacf595aeb6d70e52bb458156330))
- **styles:** overflowing tab arrows with light theme [#1040](https://github.com/WDaan/VueTorrent/issues/1040)
  ([a91712a](https://github.com/WDaan/VueTorrent/commit/a91712a5da7db9951bd93e19ff0459c5e1c78934))
- **torrent:** Wrong date format on longer duration than month ([091244b](https://github.com/WDaan/VueTorrent/commit/091244b718081138beb6e71d27d10fe45ceadc27))

### Improvements

- adding darker color to files actively or force uploading ([#1035](https://github.com/WDaan/VueTorrent/issues/1035))
  ([e2078e4](https://github.com/WDaan/VueTorrent/commit/e2078e4444197e723aad6e052ca8a9e69266768b))
- cache fonts on PWA ([#1039](https://github.com/WDaan/VueTorrent/issues/1039)) ([a16fb34](https://github.com/WDaan/VueTorrent/commit/a16fb342b814a8b5e58d9b9316138b8bb0bab3c4))
- Inifite scroll view ([#1049](https://github.com/WDaan/VueTorrent/issues/1049)) ([c17f1b6](https://github.com/WDaan/VueTorrent/commit/c17f1b6e8ab5d94a03bc6c43fd2a8bf1526b45fa))
- **overview:** Disable canvas first-time render ([#1029](https://github.com/WDaan/VueTorrent/issues/1029))
  ([d679ad4](https://github.com/WDaan/VueTorrent/commit/d679ad4c3e3515af00429c2eeb0a7796f0cf35c3))

## [1.7.0](https://github.com/WDaan/VueTorrent/compare/v1.6.1...v1.7.0) (2023-08-01)

### Features

- **units:** customizable units ([#984](https://github.com/WDaan/VueTorrent/issues/984))
  ([0594af3](https://github.com/WDaan/VueTorrent/commit/0594af387f9679610fd1bc887db3915ce345c65b))

### Bug Fixes

- App not redirecting to login page ([#1008](https://github.com/WDaan/VueTorrent/issues/1008))
  ([cd1e77b](https://github.com/WDaan/VueTorrent/commit/cd1e77b0c22d7905ee34478187205f252856e4b9))
- **Content:** Fix percent progress not displaying properly ([#1007](https://github.com/WDaan/VueTorrent/issues/1007))
  ([ef546cb](https://github.com/WDaan/VueTorrent/commit/ef546cb96cc0ce255883bd9c2b2645c3abb48784))
- **dashboard:** Not able to delete torrent in certain cases ([#975](https://github.com/WDaan/VueTorrent/issues/975))
  ([4445d37](https://github.com/WDaan/VueTorrent/commit/4445d371390463d4a801dc6fa1edc04bf76b7847))
- locale key for [#967](https://github.com/WDaan/VueTorrent/issues/967) ([#973](https://github.com/WDaan/VueTorrent/issues/973))
  ([6b2a444](https://github.com/WDaan/VueTorrent/commit/6b2a44495c26600e016732a71e8bc634d8e6414d))
- logout behaviour ([8533344](https://github.com/WDaan/VueTorrent/commit/8533344d888bb02e8e5ecaf2182b18351ea9ae70))
- Remove savePath rule when creating category ([#970](https://github.com/WDaan/VueTorrent/issues/970))
  ([9f59632](https://github.com/WDaan/VueTorrent/commit/9f59632d912acc58f022f9aacfd288d0cd66effc))

### Improvements

- Fixed intervals ([#1002](https://github.com/WDaan/VueTorrent/issues/1002)) ([898040d](https://github.com/WDaan/VueTorrent/commit/898040d5c926a49d6e168465347cd4c78c9c62c9))
- **overview:** Add quick actions buttons ([#967](https://github.com/WDaan/VueTorrent/issues/967))
  ([10ada6e](https://github.com/WDaan/VueTorrent/commit/10ada6ed23800f535e99f4e515a265dda4b71501))
- **RssArticles:** Add clearable property to filter ([#992](https://github.com/WDaan/VueTorrent/issues/992))
  ([5b24a02](https://github.com/WDaan/VueTorrent/commit/5b24a0235b2607d1f92e88e7561200d2ce32e832))
- **search:** autofocus and / shortcut to open search ([#949](https://github.com/WDaan/VueTorrent/issues/949))
  ([b2edc32](https://github.com/WDaan/VueTorrent/commit/b2edc3274d00c8d0fbf8b2718087c94da3e7247d))
- **search:** Rework search data to save in store ([#991](https://github.com/WDaan/VueTorrent/issues/991))
  ([470ae36](https://github.com/WDaan/VueTorrent/commit/470ae36cb57cbd501312f993f690e14c94bc7ccc))
- **Torrent Card:** Highlight torrent card when TRC menu is showed ([#966](https://github.com/WDaan/VueTorrent/issues/966))
  ([1ba0881](https://github.com/WDaan/VueTorrent/commit/1ba088163cc88ebd9917086995c911605c57b57a))
- **Torrent Detail:** Add escape exception if modals ([#974](https://github.com/WDaan/VueTorrent/issues/974))
  ([28aeb3e](https://github.com/WDaan/VueTorrent/commit/28aeb3e8f36b2ccfc1eb09bdbd6b06834a147954))
- **torrentDetail:** top actions fire on current torrent ([#994](https://github.com/WDaan/VueTorrent/issues/994))
  ([b547d9d](https://github.com/WDaan/VueTorrent/commit/b547d9d2174922002cf7086e269a6dfd55a1d44d))
- **TRC:** display "set priority" visibility when queuing is enabled only ([#976](https://github.com/WDaan/VueTorrent/issues/976))
  ([f2cd9e1](https://github.com/WDaan/VueTorrent/commit/f2cd9e19a118a2492170a4e99445cff5a956209a))

## [1.6.1](https://github.com/WDaan/VueTorrent/compare/v1.6.0...v1.6.1) (2023-07-13)

### Bug Fixes

- AddModal button not present on desktop ([#935](https://github.com/WDaan/VueTorrent/issues/935))
  ([8a2e2bf](https://github.com/WDaan/VueTorrent/commit/8a2e2bf8a215d66b8cc5a17375e6a7372bd3b675))
- light theme handling ([#937](https://github.com/WDaan/VueTorrent/issues/937)) ([3d3b1bf](https://github.com/WDaan/VueTorrent/commit/3d3b1bf4d847bf2c7ffc86e6fe6fcc3a286261e2))
- mobile plus button not working ([#945](https://github.com/WDaan/VueTorrent/issues/945))
  ([d1fda81](https://github.com/WDaan/VueTorrent/commit/d1fda8155d79ed6be7417f4984911370fa96b595))
- Repair broken keybinds ([#942](https://github.com/WDaan/VueTorrent/issues/942)) ([5a861de](https://github.com/WDaan/VueTorrent/commit/5a861deeb25eeda086ac3e07bc31815c67a0f165))
- **search:** remove limit parameter ([#946](https://github.com/WDaan/VueTorrent/issues/946))
  ([7b77162](https://github.com/WDaan/VueTorrent/commit/7b77162871bc1eae202ac6a13a5236471d344928))
- **tags:** Fix tags being duplicated ([#959](https://github.com/WDaan/VueTorrent/issues/959))
  ([2cca039](https://github.com/WDaan/VueTorrent/commit/2cca039e1860d0eb7dc2fdb483243f61c5ccabfa))
- transparent bg for speed dial ([#927](https://github.com/WDaan/VueTorrent/issues/927))
  ([5b1a1bc](https://github.com/WDaan/VueTorrent/commit/5b1a1bc91758cb7998203e468283c40bdac6f0d4)), closes [#926](https://github.com/WDaan/VueTorrent/issues/926)

### Improvements

- **modals:** add autofocus ([#955](https://github.com/WDaan/VueTorrent/issues/955))
  ([5f33d94](https://github.com/WDaan/VueTorrent/commit/5f33d94d88eff213bbbecf59876fcd9c4f3e90be))
- **overview:** Disable canvas generation on large torrents ([#947](https://github.com/WDaan/VueTorrent/issues/947))
  ([b56caef](https://github.com/WDaan/VueTorrent/commit/b56caef1dbc6fe6d5276e4f362be2bd34f40a192))
- **overview:** Fixes spacing for tag chips ([#957](https://github.com/WDaan/VueTorrent/issues/957))
  ([373e825](https://github.com/WDaan/VueTorrent/commit/373e825cca5d76fa8974026ec25e116c1b11fef0))
- **overview:** Use selected file count instead of total file count to preview filename ([#944](https://github.com/WDaan/VueTorrent/issues/944))
  ([cf5e53c](https://github.com/WDaan/VueTorrent/commit/cf5e53cbca22df9496fc6fc00f4d8d9745a52ae5))
- Rework Content tab ([#940](https://github.com/WDaan/VueTorrent/issues/940)) ([516f1d7](https://github.com/WDaan/VueTorrent/commit/516f1d7913f934a7fcd5f9718cefc9244dde7774))
- **search:** Add tabs + reset results on new search ([#958](https://github.com/WDaan/VueTorrent/issues/958))
  ([2de5f85](https://github.com/WDaan/VueTorrent/commit/2de5f85798cf879c39732edd3c3ecf374110b5ce))

## [1.6.0](https://github.com/WDaan/VueTorrent/compare/v1.5.12...v1.6.0) (2023-07-03)

### Features

- add logs view ([#904](https://github.com/WDaan/VueTorrent/issues/904)) ([0c6e9d8](https://github.com/WDaan/VueTorrent/commit/0c6e9d86d599679eb5f352fed7a5a51190cfb927))
- Add TorrentDetail overview tab ([#917](https://github.com/WDaan/VueTorrent/issues/917))
  ([4e67040](https://github.com/WDaan/VueTorrent/commit/4e6704081dd8210f9de2559f6755f789bfa09034))

### Bug Fixes

- events not working properly on views ([#912](https://github.com/WDaan/VueTorrent/issues/912))
  ([906da74](https://github.com/WDaan/VueTorrent/commit/906da74ee4a167e8fcd8d908d3f84fbfffcdbca3))
- searchFilter is sometimes null ([#918](https://github.com/WDaan/VueTorrent/issues/918))
  ([f5adce6](https://github.com/WDaan/VueTorrent/commit/f5adce657de72b421d22d6ae19e53daa6b7ed909))
- size error ([#900](https://github.com/WDaan/VueTorrent/issues/900)) ([d1d5498](https://github.com/WDaan/VueTorrent/commit/d1d5498e31c6d672ba5a413784aad7c50f152c43))

### Improvements

- Add qbit refresh interval setting ([#923](https://github.com/WDaan/VueTorrent/issues/923))
  ([d2cae69](https://github.com/WDaan/VueTorrent/commit/d2cae697b83988da8d496c693b821c8af51c8ac3))
- Add text filter in active filter tooltip ([#915](https://github.com/WDaan/VueTorrent/issues/915))
  ([b0d7a25](https://github.com/WDaan/VueTorrent/commit/b0d7a257525c8e348a762b0b28748ac50fa44333))
- change manual keyboard shortcuts to vue events ([#905](https://github.com/WDaan/VueTorrent/issues/905))
  ([e7171dc](https://github.com/WDaan/VueTorrent/commit/e7171dca90d744211f43d610b6d7d5c97727e36f))
- overview improvements ([#920](https://github.com/WDaan/VueTorrent/issues/920)) ([e0c5fb5](https://github.com/WDaan/VueTorrent/commit/e0c5fb5488638da09fd3db4e0ea94bb6bd3a9468))
- search on enter and customfilter ([#903](https://github.com/WDaan/VueTorrent/issues/903))
  ([754aeb9](https://github.com/WDaan/VueTorrent/commit/754aeb9959353a8f08ca39f83ebb07048c03118f))

## [1.5.12](https://github.com/WDaan/VueTorrent/compare/v1.5.11...v1.5.12) (2023-06-26)

### Bug Fixes

- favicons ([#898](https://github.com/WDaan/VueTorrent/issues/898)) ([942b1a9](https://github.com/WDaan/VueTorrent/commit/942b1a9f65798dab602ce40f945c81ee53db8ce2))
- size error when deleting torrents under certain conditions ([#870](https://github.com/WDaan/VueTorrent/issues/870))
  ([09828cb](https://github.com/WDaan/VueTorrent/commit/09828cb9ab33c12c4d3176695a0a6ddedae35e4b))

### Improvements

- Add active filter ([#868](https://github.com/WDaan/VueTorrent/issues/868)) ([e007289](https://github.com/WDaan/VueTorrent/commit/e007289b4817dbbc2ea65961ab675a17a315e38d))
- Add hook to repaint piece state canvas on update ([#869](https://github.com/WDaan/VueTorrent/issues/869))
  ([87038f4](https://github.com/WDaan/VueTorrent/commit/87038f48b9a4d8ace9f5234f9e36f62892c1f940))
- Add right click exception on link elements ([#899](https://github.com/WDaan/VueTorrent/issues/899))
  ([b8324d9](https://github.com/WDaan/VueTorrent/commit/b8324d96d8aae2d068fa775cddc4599a2aaa115a))

## [1.5.11](https://github.com/WDaan/VueTorrent/compare/v1.5.10...v1.5.11) (2023-06-15)

### Bug Fixes

- bugs introduced with search engine ([#853](https://github.com/WDaan/VueTorrent/issues/853))
  ([ff301f2](https://github.com/WDaan/VueTorrent/commit/ff301f249ca76d7fb0f26d3a26f78ddeaf43df17))
- size error when deleting torrents under certain conditions ([#862](https://github.com/WDaan/VueTorrent/issues/862))
  ([fe1f962](https://github.com/WDaan/VueTorrent/commit/fe1f962c3308ed398f652ccea60a1e864b20827a))

### Improvements

- Allow native find ([#864](https://github.com/WDaan/VueTorrent/issues/864)) ([7221a3d](https://github.com/WDaan/VueTorrent/commit/7221a3db4f7d465bcde5187174e52aa344d4692d))
- Improve responsive design on AddModal ([#865](https://github.com/WDaan/VueTorrent/issues/865))
  ([a92b583](https://github.com/WDaan/VueTorrent/commit/a92b583b8b48a8b3dd1c4b2de37c939a34b7d27f))

## [1.5.10](https://github.com/WDaan/VueTorrent/compare/v1.5.9...v1.5.10) (2023-06-05)

### Bug Fixes

- context-menu not appearing ([#848](https://github.com/WDaan/VueTorrent/issues/848))
  ([6810ec7](https://github.com/WDaan/VueTorrent/commit/6810ec7cb4234088004709b4ae3c97c0d5d6a989))

### Improvements

- enable manual sort for priority ([#845](https://github.com/WDaan/VueTorrent/issues/845))
  ([3bf470b](https://github.com/WDaan/VueTorrent/commit/3bf470b890fae52a51e545cc3dec00796e040d9a))
- Merge MatchingArticles into RuleForm ([#844](https://github.com/WDaan/VueTorrent/issues/844))
  ([2e3efe7](https://github.com/WDaan/VueTorrent/commit/2e3efe7b2a08861b426825db91fa85c64f3eef0e))
- Rework search engine ([#819](https://github.com/WDaan/VueTorrent/issues/819)) ([834827f](https://github.com/WDaan/VueTorrent/commit/834827fed40902b318613f1aa509c69819a126b8))
- **rss-rules:** Add Select All / None buttons ([#849](https://github.com/WDaan/VueTorrent/issues/849))
  ([e9a0ad7](https://github.com/WDaan/VueTorrent/commit/e9a0ad72ff85a7034c7a8e4e3b2303ffc9541c8b))

## [1.5.9](https://github.com/WDaan/VueTorrent/compare/v1.5.8...v1.5.9) (2023-05-28)

### Bug Fixes

- navbar capitalisation ([#835](https://github.com/WDaan/VueTorrent/issues/835)) ([8ad5b94](https://github.com/WDaan/VueTorrent/commit/8ad5b9425e0eca17cc73a04ab0fe4f218b42be7e))
- revert old proxy types ([#832](https://github.com/WDaan/VueTorrent/issues/832)) ([f3694e9](https://github.com/WDaan/VueTorrent/commit/f3694e990aa6e90fcc0654ac66e00a10fb006ea9))

### Improvements

- Add whenSeedingTimeReaches hint ([#826](https://github.com/WDaan/VueTorrent/issues/826))
  ([2e5ddcb](https://github.com/WDaan/VueTorrent/commit/2e5ddcb319cb1c2d5d83098ea1c6b8e90e9b4ca9))

## [1.5.8](https://github.com/WDaan/VueTorrent/compare/v1.5.7...v1.5.8) (2023-05-21)

### Bug Fixes

- Add custom key to prevent duplicate keys ([#814](https://github.com/WDaan/VueTorrent/issues/814))
  ([b63a7e0](https://github.com/WDaan/VueTorrent/commit/b63a7e039d3b39a61dd6a647ad45b015490cba40))
- invalid v-model for auto add trackers ([#820](https://github.com/WDaan/VueTorrent/issues/820))
  ([9d4b30c](https://github.com/WDaan/VueTorrent/commit/9d4b30c5647571757786db5d334d1089084af854))
- Remove capitalization ([#807](https://github.com/WDaan/VueTorrent/issues/807)) ([856b3d7](https://github.com/WDaan/VueTorrent/commit/856b3d7b5ce4f750f7961e88f27789a6bba8d3e5))
- select label color is white (regardless of the selected theme) ([#812](https://github.com/WDaan/VueTorrent/issues/812))
  ([ef333b2](https://github.com/WDaan/VueTorrent/commit/ef333b23668916430b864f620ab849b6511cd7d2))
- WebUI Password may be sent as empty string ([#823](https://github.com/WDaan/VueTorrent/issues/823))
  ([abdaa0f](https://github.com/WDaan/VueTorrent/commit/abdaa0fefb61587774eb189d1cb5c6f8af6d0806))

### Improvements

- add multi-sort support ([#815](https://github.com/WDaan/VueTorrent/issues/815)) ([a253f17](https://github.com/WDaan/VueTorrent/commit/a253f17f2e81ff451a45ac4ac0fa75b61cdfdb03))
- Add progress bar toggle for mobile card ([#822](https://github.com/WDaan/VueTorrent/issues/822))
  ([2c43383](https://github.com/WDaan/VueTorrent/commit/2c4338383b3f131fa7df231d2dd128ed158f4d42))
- Extend RSS Feeds / Rules to use full width instead of half ([#811](https://github.com/WDaan/VueTorrent/issues/811))
  ([5056133](https://github.com/WDaan/VueTorrent/commit/5056133c256013bd30355f027ca7984b4bbdf022))

## [1.5.7](https://github.com/WDaan/VueTorrent/compare/v1.5.6...v1.5.7) (2023-05-09)

### Bug Fixes

- prevent mark all to send useless requests between single mark ([#799](https://github.com/WDaan/VueTorrent/issues/799))
  ([2fdeb63](https://github.com/WDaan/VueTorrent/commit/2fdeb63c83eee6bbcdcc0bc639a4d3d303f10e20))

### Improvements

- Add Escape / Enter keybinds to RSS modals ([#797](https://github.com/WDaan/VueTorrent/issues/797))
  ([b276004](https://github.com/WDaan/VueTorrent/commit/b276004b2875391cf648247abbec026b71b598b5))
- Add mark all as read button in RssArticles view ([#798](https://github.com/WDaan/VueTorrent/issues/798))
  ([93d3fdc](https://github.com/WDaan/VueTorrent/commit/93d3fdc85ae714ffe55a3fbf6c2330c2b6c4c89d))
- Add Monitored folders ([#802](https://github.com/WDaan/VueTorrent/issues/802)) ([0deb6f8](https://github.com/WDaan/VueTorrent/commit/0deb6f8e47e3fcd4b4d2a1b0cf0aa560ab219493))
- Add sum of selected torrents' size to selectedTorrentCountString ([#803](https://github.com/WDaan/VueTorrent/issues/803))
  ([cf66103](https://github.com/WDaan/VueTorrent/commit/cf66103aca48ae80822e92f573b26df19d54c0a0))
- include all settings ([#793](https://github.com/WDaan/VueTorrent/issues/793)) ([3e7f351](https://github.com/WDaan/VueTorrent/commit/3e7f35107b1b70aef0e0fb13f9d5c322154e87d2))
- limit updateMainData to one request at once ([#800](https://github.com/WDaan/VueTorrent/issues/800))
  ([30bedda](https://github.com/WDaan/VueTorrent/commit/30beddaab425348d020e762bab49b3399f86b9be))
- Register magnet handler ([#784](https://github.com/WDaan/VueTorrent/issues/784)) ([82310c8](https://github.com/WDaan/VueTorrent/commit/82310c843d270e203705fa6ed8d98f355ffdb2e9))
- Show autorun command tooltip when either checkbox is checked ([#789](https://github.com/WDaan/VueTorrent/issues/789))
  ([d1ffa2b](https://github.com/WDaan/VueTorrent/commit/d1ffa2b143c87d9875c4c05b2c97c37705b68ca5))

## [1.5.6](https://github.com/WDaan/VueTorrent/compare/v1.5.5...v1.5.6) (2023-04-27)

### Bug Fixes

- Remove unneeded classes to prevent unexpected color background in MobileCard ([#782](https://github.com/WDaan/VueTorrent/issues/782))
  ([6745c91](https://github.com/WDaan/VueTorrent/commit/6745c91a3ca20476bdc97127d506d182bb899560))

## [1.5.5](https://github.com/WDaan/VueTorrent/compare/v1.5.4...v1.5.5) (2023-04-25)

### Bug Fixes

- Chinese word order problem ([#765](https://github.com/WDaan/VueTorrent/issues/765))
  ([f1bb9b7](https://github.com/WDaan/VueTorrent/commit/f1bb9b7b354ab2ba47f5d0180dfe3d4a8f824e43))

### Improvements

- Add Refresh All button for RSS feeds ([#775](https://github.com/WDaan/VueTorrent/issues/775))
  ([3e1d5fb](https://github.com/WDaan/VueTorrent/commit/3e1d5fb76598ee7a432a56ea8b073a2bfe7dcba7))
- all-time ratio card ([#777](https://github.com/WDaan/VueTorrent/issues/777)) ([f970564](https://github.com/WDaan/VueTorrent/commit/f970564bf90aa82b553eb0e92911d3100b2e6150))

## [1.5.4](https://github.com/WDaan/VueTorrent/compare/v1.5.3...v1.5.4) (2023-04-02)

### Improvements

- Add missing torrent properties to TorrentDetail &gt; Info ([#744](https://github.com/WDaan/VueTorrent/issues/744))
  ([ecd8a4e](https://github.com/WDaan/VueTorrent/commit/ecd8a4e608d687c80209ee6d5b6dad6a26bb943c))
- Prevent storing dashboard items label in store ([#748](https://github.com/WDaan/VueTorrent/issues/748))
  ([237de79](https://github.com/WDaan/VueTorrent/commit/237de79e3392ac12f2f84e21c30a89c036413118))

## [1.5.3](https://github.com/WDaan/VueTorrent/compare/v1.5.2...v1.5.3) (2023-03-27)

### Bug Fixes

- capitalization [#740](https://github.com/WDaan/VueTorrent/issues/740) ([54b4f57](https://github.com/WDaan/VueTorrent/commit/54b4f578d1b3c0491d16024e6d377090d520cac5))

### Improvements

- complete RSS rule settings ([#731](https://github.com/WDaan/VueTorrent/issues/731)) @Larsluph
  ([3690170](https://github.com/WDaan/VueTorrent/commit/36901701c31ada48196b7258381fdf8725abda55))
- improve format when using timestamp 0 on SeenComplete ([#737](https://github.com/WDaan/VueTorrent/issues/737))
  ([3d5f6c8](https://github.com/WDaan/VueTorrent/commit/3d5f6c86dfc48ea76223685634e641d086f7c50b))
- Sort folders before files ([#730](https://github.com/WDaan/VueTorrent/issues/730))
  ([521c6e6](https://github.com/WDaan/VueTorrent/commit/521c6e6c7f0aaacd80c764f056498ad3bf53dc1a))

## [1.5.2](https://github.com/WDaan/VueTorrent/compare/v1.5.1...v1.5.2) (2023-03-21)

### Bug Fixes

- Missing state filters ([#718](https://github.com/WDaan/VueTorrent/issues/718)) ([74cfeca](https://github.com/WDaan/VueTorrent/commit/74cfecace0a46abc4fbe843b15131ce85e8fbb79))
- state glitching [#724](https://github.com/WDaan/VueTorrent/issues/724) ([260c1c6](https://github.com/WDaan/VueTorrent/commit/260c1c6960dcd7e505e8643db9f362b0acc3cbc7))
- translation of properties ([3e95230](https://github.com/WDaan/VueTorrent/commit/3e95230ae822673d6340874518e7557e0e20bf52))

### Improvements

- Progress component sizing on Desktop ([#720](https://github.com/WDaan/VueTorrent/issues/720))
  ([c991417](https://github.com/WDaan/VueTorrent/commit/c9914172b55ac1f3e1cdf89a01caec2666f153e3))

## [1.5.1](https://github.com/WDaan/VueTorrent/compare/v1.5.0...v1.5.1) (2023-03-19)

### Bug Fixes

- cmd select torrent ([#702](https://github.com/WDaan/VueTorrent/issues/702)) ([97f7705](https://github.com/WDaan/VueTorrent/commit/97f77050f0b9926fd2c40da0fd2e6d8c5e930fe9))
- Ctrl key not being handled on Windows ([#715](https://github.com/WDaan/VueTorrent/issues/715))
  ([ba77afb](https://github.com/WDaan/VueTorrent/commit/ba77afb35dcddc658de778da61b233ed113e9e0c))
- Trackers view ([#700](https://github.com/WDaan/VueTorrent/issues/700)) ([ee4cb7e](https://github.com/WDaan/VueTorrent/commit/ee4cb7ec1f6de1f362962f1545e2d361c0baab46))

### Improvements

- Add missing fields in dashboard / sortOptions ([#713](https://github.com/WDaan/VueTorrent/issues/713)) @Larsluph
  ([57b9aca](https://github.com/WDaan/VueTorrent/commit/57b9acaeef407e16853103593a440a725b6f3964))
- add refresh icon to RSS feeds ([#709](https://github.com/WDaan/VueTorrent/issues/709))
  ([a583b42](https://github.com/WDaan/VueTorrent/commit/a583b42d68864c7280d6667706a7902b9b4e9fd1))
- Add seeds sort options ([#711](https://github.com/WDaan/VueTorrent/issues/711)) ([2c3afa5](https://github.com/WDaan/VueTorrent/commit/2c3afa57994f651457b1aa29ee4205583eb72d44))
- reset selected torrents when changing filters ([#712](https://github.com/WDaan/VueTorrent/issues/712))
  ([b1b3212](https://github.com/WDaan/VueTorrent/commit/b1b32127e8fb811d01ec376e42694761a48ba23c))
- Sort files alphabetically in Content tab ([#714](https://github.com/WDaan/VueTorrent/issues/714))
  ([baf17c7](https://github.com/WDaan/VueTorrent/commit/baf17c769544c7dba62ae504d4e8f57932c0ebf1))

## [1.5.0](https://github.com/WDaan/VueTorrent/compare/v1.4.0...v1.5.0) (2023-03-05)

### Features

- Add settings to Show/Hide fields in mobile torrent card ([#687](https://github.com/WDaan/VueTorrent/issues/687)) @Larsluph
  ([88bc931](https://github.com/WDaan/VueTorrent/commit/88bc9317c9864145712b897905cce7cab073066c))

### Bug Fixes

- Duplicate intervals ([#689](https://github.com/WDaan/VueTorrent/issues/689)) @Larsluph
  ([a822702](https://github.com/WDaan/VueTorrent/commit/a822702e69ad1c2b2ff9f58d82b07dd89e8ec605))
- error from context menu when deleting torrent ([2dcf9d2](https://github.com/WDaan/VueTorrent/commit/2dcf9d268cc12a3705955c51aaccdc67193a22d0))
- mobile page search layout [#635](https://github.com/WDaan/VueTorrent/issues/635) ([d1def31](https://github.com/WDaan/VueTorrent/commit/d1def31d055cb51a01bfeae12b1385dbca0b7e71))
- redirect to login when auth expires [#607](https://github.com/WDaan/VueTorrent/issues/607)
  ([0cc22ae](https://github.com/WDaan/VueTorrent/commit/0cc22ae1ea14649e4ca01620671f87181d10469f))

### Improvements

- Add 'Ctrl + F' shortcut to focus search filter ([#692](https://github.com/WDaan/VueTorrent/issues/692)) @Larsluph
  ([cff2191](https://github.com/WDaan/VueTorrent/commit/cff2191c760a18331bb89289062840bf44efa8c8))
- Add switch to hide Shutdown button ([#685](https://github.com/WDaan/VueTorrent/issues/685)) @Larsluph
  ([19e4eef](https://github.com/WDaan/VueTorrent/commit/19e4eef0b893a0e78580e04bd204fe2afb6af1fd))
- scroll to top if tab is changed ([#688](https://github.com/WDaan/VueTorrent/issues/688))
  ([763c3d3](https://github.com/WDaan/VueTorrent/commit/763c3d31e026a319f4ebf280954d8deb0fbb085c))
- support command key for mac + unfocus on escape ([acb75a6](https://github.com/WDaan/VueTorrent/commit/acb75a6a81e9634531f53107876b7ccbeeecf82a))

## [1.4.0](https://github.com/WDaan/VueTorrent/compare/v1.3.2...v1.4.0) (2023-02-28)

### Features

- Add import / export settings button ([#659](https://github.com/WDaan/VueTorrent/issues/659)) @Larsluph
  ([7caa19a](https://github.com/WDaan/VueTorrent/commit/7caa19ab889464d00d58630f93a84e98fbb82eca))
- Add tracker host in Dashboard ([#679](https://github.com/WDaan/VueTorrent/issues/679)) [@flashlab](https://github.com/flashlab)
  ([bf9484b](https://github.com/WDaan/VueTorrent/commit/bf9484b1426ad8de166b725745b409c898cc56e5))

### Bug Fixes

- 400 when adding trackers ([#674](https://github.com/WDaan/VueTorrent/issues/674)) @Larsluph
  ([9d31ff4](https://github.com/WDaan/VueTorrent/commit/9d31ff4360997b03273751b7aa45c143b6ac0cf8))
- Drag-and-Drop not working ([#669](https://github.com/WDaan/VueTorrent/issues/669)) @Larsluph
  ([141318a](https://github.com/WDaan/VueTorrent/commit/141318affc5e26e98abcd8d292e75e0636b7a3db))
- Fix JSON validation not working ([#682](https://github.com/WDaan/VueTorrent/issues/682))
  ([2784ab9](https://github.com/WDaan/VueTorrent/commit/2784ab97cf67f019ab259471eda2b957ed81f6a2))
- Handle Windows path separators ([#675](https://github.com/WDaan/VueTorrent/issues/675)) @Larsluph
  ([f4646e2](https://github.com/WDaan/VueTorrent/commit/f4646e2e669191e51f06f1abeb0d37bf1aa7663c))
- incorrect enum values for MaxRatioAction ([#673](https://github.com/WDaan/VueTorrent/issues/673)) @Larsluph
  ([afa9f0e](https://github.com/WDaan/VueTorrent/commit/afa9f0ef3065702c0d55f1a7ca5a78066610264c))

### Improvements

- Rework toast msg for clipboard API ([#677](https://github.com/WDaan/VueTorrent/issues/677))
  ([3e2466a](https://github.com/WDaan/VueTorrent/commit/3e2466ac8fb383efb735845c74c89b3adf314045))
- Sort tags alphabetically ([#683](https://github.com/WDaan/VueTorrent/issues/683)) @Larsluph
  ([3d1415d](https://github.com/WDaan/VueTorrent/commit/3d1415deab5a90ebca718e086bc8bfc13dca88cc))

### [1.3.2](https://github.com/WDaan/VueTorrent/compare/v1.3.1...v1.3.2) (2023-02-19)

### Bug Fixes

- dark theme color [#662](https://github.com/WDaan/VueTorrent/issues/662) ([2921cca](https://github.com/WDaan/VueTorrent/commit/2921cca79cb50280c4f6fbc84dc4aebb48aa0c39))
- peers not showing up ([#660](https://github.com/WDaan/VueTorrent/issues/660)) ([d8ca97d](https://github.com/WDaan/VueTorrent/commit/d8ca97d92821eaf455079a4248d7af95d643fe34))
- phone check shutdown modal ([ff9f159](https://github.com/WDaan/VueTorrent/commit/ff9f1594cdebb73aa2daf97f83e6520d77dbcd4b))
- Replace root_folder param with contentLayout & stopCondition ([#665](https://github.com/WDaan/VueTorrent/issues/665)) @Larsluph
  ([f0ddc60](https://github.com/WDaan/VueTorrent/commit/f0ddc603bdab2c5ee155e2289d573818407cf4d9))
- Unwanted torrent selection during search ([#664](https://github.com/WDaan/VueTorrent/issues/664)) @MBR-0001
  ([a56aa63](https://github.com/WDaan/VueTorrent/commit/a56aa63ab9988a689b9fb40a34e345d8e239bafa))

### Improvements

- Add RSS unread filter ([#657](https://github.com/WDaan/VueTorrent/issues/657)) @Larsluph
  ([bc5695b](https://github.com/WDaan/VueTorrent/commit/bc5695b8703704c5a540c515fa754f6b53428fcb))

## [2.0.0](https://github.com/lyaschuchenko/VueTorrent/compare/v1.3.1...v2.0.0) (2023-02-15)

### ⚠ BREAKING CHANGES

- move to vite + typescript => BREAKS PWA, please re-install! (#352)

### Features

- 1st torrent progress in title [#166](https://github.com/lyaschuchenko/VueTorrent/issues/166)
  ([5faa248](https://github.com/lyaschuchenko/VueTorrent/commit/5faa248395e6edd4e892717fcd0ce41ae27efe08))
- Add Batch change location ([#574](https://github.com/lyaschuchenko/VueTorrent/issues/574))
  ([060c3c3](https://github.com/lyaschuchenko/VueTorrent/commit/060c3c3a1c463e988014fe1ae52569921a68d545))
- add completed on [#571](https://github.com/lyaschuchenko/VueTorrent/issues/571)
  ([e242bad](https://github.com/lyaschuchenko/VueTorrent/commit/e242bad1af2c4a2f7824b2d0018e28a3e3ac580b))
- add dialog missing options [#418](https://github.com/lyaschuchenko/VueTorrent/issues/418)
  ([68223f5](https://github.com/lyaschuchenko/VueTorrent/commit/68223f5f45da3a4819b43398707fed1e172468e8))
- add directory to dashboard and sort [#538](https://github.com/lyaschuchenko/VueTorrent/issues/538)
  ([f474709](https://github.com/lyaschuchenko/VueTorrent/commit/f474709d4f28b20fe4c0ef92f56de76b924f5d0b))
- Add globalSpeed and globalVolume computed values to torrent properties ([#599](https://github.com/lyaschuchenko/VueTorrent/issues/599)) @Larsluph
  ([3e1d341](https://github.com/lyaschuchenko/VueTorrent/commit/3e1d3411b7158ec7b8665f2d677b62eca8846d66))
- add max_ratio_act handling ([#523](https://github.com/lyaschuchenko/VueTorrent/issues/523)) [@giacomocerquone](https://github.com/giacomocerquone)
  ([b05dcd0](https://github.com/lyaschuchenko/VueTorrent/commit/b05dcd0569e526f66420c9e2d30ef5f4e9fc864b))
- add pending pieces color to canvas ([#592](https://github.com/lyaschuchenko/VueTorrent/issues/592)) @Larsluph
  ([5132d4d](https://github.com/lyaschuchenko/VueTorrent/commit/5132d4decf207d508e91f8b65ced31d50dc3f838))
- Add shutdown button in TopActions ([#633](https://github.com/lyaschuchenko/VueTorrent/issues/633)) @Larsluph
  ([ab75f32](https://github.com/lyaschuchenko/VueTorrent/commit/ab75f32c5f6225fb9b2615f2880b2ef40037820a))
- Add support for "autorun on torrent added" option ([#580](https://github.com/lyaschuchenko/VueTorrent/issues/580)) @Larsluph
  ([19bf989](https://github.com/lyaschuchenko/VueTorrent/commit/19bf989c7ea8d8f3ed16ab35416575bfcdc3c21c))
- add support for setting global speed limits ([#406](https://github.com/lyaschuchenko/VueTorrent/issues/406))
  ([23fee41](https://github.com/lyaschuchenko/VueTorrent/commit/23fee419fd1561f440f88e4b354ac3745ed813cd))
- Add tag support in Dashboard, TorrentDetail and Add Modal ([#570](https://github.com/lyaschuchenko/VueTorrent/issues/570))
  ([0a175cc](https://github.com/lyaschuchenko/VueTorrent/commit/0a175ccb437f9ad5609b85482a63dfbc2e6f0e9a))
- add uploaded property ([#145](https://github.com/lyaschuchenko/VueTorrent/issues/145))
  ([0a58d98](https://github.com/lyaschuchenko/VueTorrent/commit/0a58d98b9f50affee99f05fb4f93d9b37d38ac76))
- Add/Ban peers support ([#598](https://github.com/lyaschuchenko/VueTorrent/issues/598)) @Larsluph
  ([59b47db](https://github.com/lyaschuchenko/VueTorrent/commit/59b47dbc8d28675d78892651be79536db3df9b33))
- additional connection settings [#317](https://github.com/lyaschuchenko/VueTorrent/issues/317)
  ([54b3456](https://github.com/lyaschuchenko/VueTorrent/commit/54b345682f18b45fc6f6fe5d7a732bb87932f664))
- auto install search plugins when none installed ([abc5457](https://github.com/lyaschuchenko/VueTorrent/commit/abc5457882892ce4840ae0eef7a438e5ea4c7c90))
- auto refresh peers ([dfd10be](https://github.com/lyaschuchenko/VueTorrent/commit/dfd10beeab4c757ff1ac0c3eecbdc4e740573a75))
- auto releasing ci ([#146](https://github.com/lyaschuchenko/VueTorrent/issues/146))
  ([d217627](https://github.com/lyaschuchenko/VueTorrent/commit/d217627d9ad15535bfe67116790a78414c44c673))
- basic fake torrent generator [#518](https://github.com/lyaschuchenko/VueTorrent/issues/518)
  ([d3cda1a](https://github.com/lyaschuchenko/VueTorrent/commit/d3cda1a6499fcc2a7c4a548862b9c1e4fa338c23))
- basic limit share ratio [#308](https://github.com/lyaschuchenko/VueTorrent/issues/308)
  ([2c1fc34](https://github.com/lyaschuchenko/VueTorrent/commit/2c1fc34ebdc6f096628d23a6072ea1970764b267))
- basic multilang support ([#320](https://github.com/lyaschuchenko/VueTorrent/issues/320))
  ([a7cc03c](https://github.com/lyaschuchenko/VueTorrent/commit/a7cc03c3ba60f7dbc2d18fff78a0b5f5c6db4b1a))
- basic proxy support [#261](https://github.com/lyaschuchenko/VueTorrent/issues/261)
  ([71a09fc](https://github.com/lyaschuchenko/VueTorrent/commit/71a09fc58a9c29037cfc87fa6c6f0cfdb645233e))
- Basic rss interface ([#447](https://github.com/lyaschuchenko/VueTorrent/issues/447))
  ([732e519](https://github.com/lyaschuchenko/VueTorrent/commit/732e5193ec76d521249ac6fb73c4a6e975091476))
- bypass authentication ([#310](https://github.com/lyaschuchenko/VueTorrent/issues/310))
  ([b069ce4](https://github.com/lyaschuchenko/VueTorrent/commit/b069ce490e74baf003c9c92cd780c51414702c13))
- checkbox + button with color feedback for TorrentDeleteModal ([a83ea14](https://github.com/lyaschuchenko/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- copy name/hash/magnet [#277](https://github.com/lyaschuchenko/VueTorrent/issues/277)
  ([42afd92](https://github.com/lyaschuchenko/VueTorrent/commit/42afd921274c0be3fc122a4d5b8d2aeae5fe0c13))
- create nightly build ([1cdbb95](https://github.com/lyaschuchenko/VueTorrent/commit/1cdbb95f8ca258430f85eb7d3385dc134d5c3b48))
- custom date format support [#340](https://github.com/lyaschuchenko/VueTorrent/issues/340)
  ([e08a445](https://github.com/lyaschuchenko/VueTorrent/commit/e08a4456ee3ce76af3c3a47c7a15cbb5141a4663))
- drawer on right side [#276](https://github.com/lyaschuchenko/VueTorrent/issues/276)
  ([a18bded](https://github.com/lyaschuchenko/VueTorrent/commit/a18bded9cb9792b3301008cc717b52053191c8f9))
- fullscreen toggle on torrent info modal (desktop) ([1de9e64](https://github.com/lyaschuchenko/VueTorrent/commit/1de9e6459657c386332d146352c3ed765f70fa3c))
- improved per-torrent speed limits modal ([#172](https://github.com/lyaschuchenko/VueTorrent/issues/172))
  ([7bed9ee](https://github.com/lyaschuchenko/VueTorrent/commit/7bed9eef12321e06bb143d96f02326d967e6f739))
- Last Activity support [#217](https://github.com/lyaschuchenko/VueTorrent/issues/217)
  ([1d9279a](https://github.com/lyaschuchenko/VueTorrent/commit/1d9279a3764578fbc25ded4c0b035be855d04163))
- Links in torrent details view are now clickable ([#506](https://github.com/lyaschuchenko/VueTorrent/issues/506))
  ([f1536cb](https://github.com/lyaschuchenko/VueTorrent/commit/f1536cb010e2ebc8d7d026a62be491e8a3a04cfa))
- move to vite + typescript => BREAKS PWA, please re-install! ([#352](https://github.com/lyaschuchenko/VueTorrent/issues/352))
  ([5aa83fa](https://github.com/lyaschuchenko/VueTorrent/commit/5aa83fa95e0c072822b1c13910455b18f7a6bbb8))
- New Logo ([b2858a4](https://github.com/lyaschuchenko/VueTorrent/commit/b2858a4f68238867996cfe5e61e0947dae3af022))
- New select mode color ([8f8d3db](https://github.com/lyaschuchenko/VueTorrent/commit/8f8d3dbb765d950baa9c5e7654a356e2d300ed28))
- open addmodal when dragging a file into the dashboard ([5807db5](https://github.com/lyaschuchenko/VueTorrent/commit/5807db5e99ac84436261e9d0e2b9a6767d851ba2))
- optional top pagination [#539](https://github.com/lyaschuchenko/VueTorrent/issues/539)
  ([8a59d10](https://github.com/lyaschuchenko/VueTorrent/commit/8a59d10483e351ae95a8c32e878189411ce50ec1))
- piece states progress bar ([#426](https://github.com/lyaschuchenko/VueTorrent/issues/426))
  ([1722a14](https://github.com/lyaschuchenko/VueTorrent/commit/1722a14dba74dafca3b373d50c6dcd94814ab074))
- PWA splash & bar color ([dfbed5c](https://github.com/lyaschuchenko/VueTorrent/commit/dfbed5cb05c0b6974c09c86c6e82e1478f1100d6))
- remember delete with files preference [#291](https://github.com/lyaschuchenko/VueTorrent/issues/291)
  ([684bbec](https://github.com/lyaschuchenko/VueTorrent/commit/684bbecff0f7fe239f0ee05dfb5392b4a6401069))
- remove torrent files with checkbox [#199](https://github.com/lyaschuchenko/VueTorrent/issues/199)
  ([0eddf64](https://github.com/lyaschuchenko/VueTorrent/commit/0eddf6458ea3b72ce19282fbcd07e19ff96fd3f8))
- render "active time" in torrent info tab ([#537](https://github.com/lyaschuchenko/VueTorrent/issues/537)) [@invakid404](https://github.com/invakid404)
  ([d3cf4d5](https://github.com/lyaschuchenko/VueTorrent/commit/d3cf4d5795b1a62a8bc1e5a4645408657c4956cd))
- run external program on torrent completion [#258](https://github.com/lyaschuchenko/VueTorrent/issues/258)
  ([99fa1c4](https://github.com/lyaschuchenko/VueTorrent/commit/99fa1c419d47516a1e265e753c127fedf370ffec))
- Show connection status at the bottom of Navbar ([#255](https://github.com/lyaschuchenko/VueTorrent/issues/255))
  ([204d74c](https://github.com/lyaschuchenko/VueTorrent/commit/204d74c4e84df5404819796e9e5078c01106990a))
- show created by info [#279](https://github.com/lyaschuchenko/VueTorrent/issues/279)
  ([7a7562e](https://github.com/lyaschuchenko/VueTorrent/commit/7a7562e54e66aebbf782baefa89b1f17e5119afa))
- sidebar on launch option [#182](https://github.com/lyaschuchenko/VueTorrent/issues/182)
  ([fca51c5](https://github.com/lyaschuchenko/VueTorrent/commit/fca51c536fe8cb96c878501c386efcb4ee868ff6))
- Speed cards as pills with icon in first column and speed on top of the unit in second column ([#169](https://github.com/lyaschuchenko/VueTorrent/issues/169))
  ([354fe4f](https://github.com/lyaschuchenko/VueTorrent/commit/354fe4f5f870bb48613ef390341c4c1971e2936e))
- support for renaming folders ([#500](https://github.com/lyaschuchenko/VueTorrent/issues/500))
  ([cf8f43a](https://github.com/lyaschuchenko/VueTorrent/commit/cf8f43aac3c235cf616bed4c1ce1ceda0fad8fe4))
- torrent detail infinity sign for unlimited speeds ([#173](https://github.com/lyaschuchenko/VueTorrent/issues/173))
  ([6f9a5d5](https://github.com/lyaschuchenko/VueTorrent/commit/6f9a5d5fefd9c0a2622ce62588ee717f762b7eee))
- use confirmation modal when deleting from context menu [#191](https://github.com/lyaschuchenko/VueTorrent/issues/191)
  ([53c548b](https://github.com/lyaschuchenko/VueTorrent/commit/53c548b502bacc95bab59026b836eb2bb2b785ec))

### Bug Fixes

- "405 Method Not Allowed" when renaming torrent ([#551](https://github.com/lyaschuchenko/VueTorrent/issues/551))
  ([66dc741](https://github.com/lyaschuchenko/VueTorrent/commit/66dc74182545705003e3bcb4460224a18a57e830))
- "409 Conflict" on file/folder rename ([#597](https://github.com/lyaschuchenko/VueTorrent/issues/597))
  ([004c8f5](https://github.com/lyaschuchenko/VueTorrent/commit/004c8f57d2db1da9032848e783497bcc3c239df2))
- 0 speed when no speed data returned ([a7b8ed9](https://github.com/lyaschuchenko/VueTorrent/commit/a7b8ed9da3dbca8d2f3be0665880d3cda5f5a50b))
- Add caret color to dark theme ([#564](https://github.com/lyaschuchenko/VueTorrent/issues/564))
  ([45c65ae](https://github.com/lyaschuchenko/VueTorrent/commit/45c65ae394db6fc722afa13408ba74b4a55bf240))
- add progress border + percentage [#430](https://github.com/lyaschuchenko/VueTorrent/issues/430)
  ([acc0733](https://github.com/lyaschuchenko/VueTorrent/commit/acc07335d31b027cd7ca989959c6d450a957010e))
- add tracker dialog bug [#187](https://github.com/lyaschuchenko/VueTorrent/issues/187)
  ([7c7e40d](https://github.com/lyaschuchenko/VueTorrent/commit/7c7e40d4a5105ce3e0e9422551ad6cd2673da932))
- allow native context menu in input elements ([#428](https://github.com/lyaschuchenko/VueTorrent/issues/428))
  ([b8ad965](https://github.com/lyaschuchenko/VueTorrent/commit/b8ad965763fd647b230f7fcbd9798d182cefd762))
- altspeed value ([aadb3f2](https://github.com/lyaschuchenko/VueTorrent/commit/aadb3f2171d38d5a94f9ca9847c50137669055b3))
- always fetch full data (more reliable) ([89cf6ba](https://github.com/lyaschuchenko/VueTorrent/commit/89cf6ba32c7a4b24cd0ea4d358e56e1d859d4665))
- anonymous mode [#362](https://github.com/lyaschuchenko/VueTorrent/issues/362)
  ([27a0717](https://github.com/lyaschuchenko/VueTorrent/commit/27a07179f08225292e2e26fb57bbfa6f846b272b))
- application version getter ([#222](https://github.com/lyaschuchenko/VueTorrent/issues/222))
  ([6535ac5](https://github.com/lyaschuchenko/VueTorrent/commit/6535ac56265d3062c877f35fa5e44b9635e26fcd))
- broken build [#453](https://github.com/lyaschuchenko/VueTorrent/issues/453)
  ([8f1a12d](https://github.com/lyaschuchenko/VueTorrent/commit/8f1a12d15fa438e55194a9c807bbdc0115a3deda))
- category create validation ([#552](https://github.com/lyaschuchenko/VueTorrent/issues/552))
  ([edc0330](https://github.com/lyaschuchenko/VueTorrent/commit/edc0330bafdedc98e2e5f7df6bc2894bbcf5a281))
- category download folder [#435](https://github.com/lyaschuchenko/VueTorrent/issues/435)
  ([5a0ec26](https://github.com/lyaschuchenko/VueTorrent/commit/5a0ec26ddb7b9c7fc1a03102684fd2268b2ae33f))
- category download folder not showing correctly ([#448](https://github.com/lyaschuchenko/VueTorrent/issues/448))
  ([06579c8](https://github.com/lyaschuchenko/VueTorrent/commit/06579c8bbee5f991f195df596054da8751d0ea72))
- change rss-unread color from white to #ccc ([#643](https://github.com/lyaschuchenko/VueTorrent/issues/643)) [@hqwuzhaoyi](https://github.com/hqwuzhaoyi)
  ([dd02cdb](https://github.com/lyaschuchenko/VueTorrent/commit/dd02cdb564803495af0ea60a61c65562b3fe8ea5))
- chart flickering ([#644](https://github.com/lyaschuchenko/VueTorrent/issues/644)) @Hans1208
  ([5e3d6b7](https://github.com/lyaschuchenko/VueTorrent/commit/5e3d6b778892fc6b157ba533f288e77ceed091c7))
- connection password type [#456](https://github.com/lyaschuchenko/VueTorrent/issues/456)
  ([a8616cc](https://github.com/lyaschuchenko/VueTorrent/commit/a8616cce545ed579e39db9e64c0005a74eee63d5))
- connection status [#482](https://github.com/lyaschuchenko/VueTorrent/issues/482)
  ([e047467](https://github.com/lyaschuchenko/VueTorrent/commit/e0474671042dc7b1c4f2490018c5484e4730ccf1))
- Context menu placement ([ed08c91](https://github.com/lyaschuchenko/VueTorrent/commit/ed08c914ebde9fba53e8b24f58c0a80918569b26))
- Cookies not sent with request for Web App manifest.json ([#504](https://github.com/lyaschuchenko/VueTorrent/issues/504))
  ([2efe73a](https://github.com/lyaschuchenko/VueTorrent/commit/2efe73ad7e51c7b45ad65827503d4c3fcebd58a4))
- copy to clipboard on non secure context (no SSL) [#521](https://github.com/lyaschuchenko/VueTorrent/issues/521)
  ([058766f](https://github.com/lyaschuchenko/VueTorrent/commit/058766f617e39f57bd56d68557b32797d70d4947))
- dark theme glitch ([2b913d5](https://github.com/lyaschuchenko/VueTorrent/commit/2b913d5064d6c5135ed19c720cdccaaaf792fe4c))
- Dashboard items not using $store.state reference ([#601](https://github.com/lyaschuchenko/VueTorrent/issues/601))
  ([add11c9](https://github.com/lyaschuchenko/VueTorrent/commit/add11c9548472396a7c4e2c483128de25380b616))
- Default change location not prefilling ([#583](https://github.com/lyaschuchenko/VueTorrent/issues/583)) @Larsluph
  ([b53c331](https://github.com/lyaschuchenko/VueTorrent/commit/b53c331d4c98635f38945d9898ab72358bb7bf34))
- disabling plugins [#443](https://github.com/lyaschuchenko/VueTorrent/issues/443)
  ([3b98949](https://github.com/lyaschuchenko/VueTorrent/commit/3b989499b867f00618a0a567831c9a1dcdc65418))
- double click opens info [#287](https://github.com/lyaschuchenko/VueTorrent/issues/287)
  ([c8ffce5](https://github.com/lyaschuchenko/VueTorrent/commit/c8ffce59b1ebb7b72575f8797d35942bdfe62ef4))
- Duplicate reference in dashboard settings ([#618](https://github.com/lyaschuchenko/VueTorrent/issues/618)) @Larsluph
  ([ea7e68c](https://github.com/lyaschuchenko/VueTorrent/commit/ea7e68ca2a48b19292d9b9b5388bcba8664d04bb))
- Establish Service WalkerRules ([#227](https://github.com/lyaschuchenko/VueTorrent/issues/227))
  ([04971dc](https://github.com/lyaschuchenko/VueTorrent/commit/04971dcf874c2f952f57c3abef94d8d92337e488))
- favicon [#441](https://github.com/lyaschuchenko/VueTorrent/issues/441) ([745376c](https://github.com/lyaschuchenko/VueTorrent/commit/745376c02be7a1d9398feb5181bebe9026d22638))
- favicon [#441](https://github.com/lyaschuchenko/VueTorrent/issues/441) ([b7e7de1](https://github.com/lyaschuchenko/VueTorrent/commit/b7e7de1e9095228d9207845201c0ceff814623a4))
- font-size difference in right click menu ([#505](https://github.com/lyaschuchenko/VueTorrent/issues/505))
  ([a8f28dd](https://github.com/lyaschuchenko/VueTorrent/commit/a8f28dd5b468924f7dcf09d101e438a15e1269ba))
- Forced state not present in MobileCard ([#632](https://github.com/lyaschuchenko/VueTorrent/issues/632)) @Larsluph
  ([7114ce1](https://github.com/lyaschuchenko/VueTorrent/commit/7114ce12df6bf7a0992406245277093c52d16002))
- free space toggle [#541](https://github.com/lyaschuchenko/VueTorrent/issues/541)
  ([f8c3b7d](https://github.com/lyaschuchenko/VueTorrent/commit/f8c3b7dc38ff1a7a52a130982f86d82cc4fb61c4))
- general fixes and README update ([#562](https://github.com/lyaschuchenko/VueTorrent/issues/562))
  ([8b6caf0](https://github.com/lyaschuchenko/VueTorrent/commit/8b6caf03359128581077471ce1d80d1308f1a2b6))
- Global Speed Title (upload & download were switched) ([#218](https://github.com/lyaschuchenko/VueTorrent/issues/218))
  ([906f6d5](https://github.com/lyaschuchenko/VueTorrent/commit/906f6d5f872b848fc7b3c5071c51a9696ce7c734))
- interrupted divider in torrenfinfo [#151](https://github.com/lyaschuchenko/VueTorrent/issues/151)
  ([d362aef](https://github.com/lyaschuchenko/VueTorrent/commit/d362aef27574bb6a60c3675eef52655f1a57bebe))
- Invalid deconstruct on qbit service ([#623](https://github.com/lyaschuchenko/VueTorrent/issues/623))
  ([5a2ed4e](https://github.com/lyaschuchenko/VueTorrent/commit/5a2ed4ea99a81f5566e3276acb8faae42adcc035))
- invisble close button on modal [#314](https://github.com/lyaschuchenko/VueTorrent/issues/314) [#297](https://github.com/lyaschuchenko/VueTorrent/issues/297)
  ([8001dc9](https://github.com/lyaschuchenko/VueTorrent/commit/8001dc91c738e4b9bfa9dd8a6b6b52249e727f5a))
- issue where 'torrent details' modal does not work properly on iOS ([a83ea14](https://github.com/lyaschuchenko/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- layout issues + remove vue-perfect-scrollbar + refactor context menu ([a83ea14](https://github.com/lyaschuchenko/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- load default folder [#417](https://github.com/lyaschuchenko/VueTorrent/issues/417)
  ([c63d0a4](https://github.com/lyaschuchenko/VueTorrent/commit/c63d0a403939c99a442a10563789cb8753d67771))
- load missing filters at startup ([#567](https://github.com/lyaschuchenko/VueTorrent/issues/567))
  ([87de795](https://github.com/lyaschuchenko/VueTorrent/commit/87de79555b5aad8827fd5f15dbf53239cdea10c9))
- login autocomplete render issue [#474](https://github.com/lyaschuchenko/VueTorrent/issues/474)
  ([ef64c38](https://github.com/lyaschuchenko/VueTorrent/commit/ef64c38f099fca1be5db45741c60afc04fff3065))
- login console error on refresh ([254d7c8](https://github.com/lyaschuchenko/VueTorrent/commit/254d7c8562e3fec5a16b4f65a4de0382ef7662c1))
- login prompt being displayed when whitelisted ([#511](https://github.com/lyaschuchenko/VueTorrent/issues/511))
  ([077cf54](https://github.com/lyaschuchenko/VueTorrent/commit/077cf54c6bb5ccc7e5ccf9b94731ec468bd17ecd))
- logout [#286](https://github.com/lyaschuchenko/VueTorrent/issues/286) ([9121230](https://github.com/lyaschuchenko/VueTorrent/commit/912123098e5fca6193ebb6f66ad06c8442d07861))
- low visibility text in dark theme ([#390](https://github.com/lyaschuchenko/VueTorrent/issues/390))
  ([84750af](https://github.com/lyaschuchenko/VueTorrent/commit/84750af3d4d584f5fc0fd8f3cbabd1b0ecfa2e9f))
- magnet text area max size [#413](https://github.com/lyaschuchenko/VueTorrent/issues/413)
  ([4dd81f7](https://github.com/lyaschuchenko/VueTorrent/commit/4dd81f7cd49ab807fddeb50ff2e871364fd955e5))
- margin when freespace card is disabled ([6be41e3](https://github.com/lyaschuchenko/VueTorrent/commit/6be41e33cfb0eb365df18e53c396cd4a36d4b8e5))
- mention QBittorent [#356](https://github.com/lyaschuchenko/VueTorrent/issues/356)
  ([bbc31fb](https://github.com/lyaschuchenko/VueTorrent/commit/bbc31fb8c5be1cc1189000e53f90ba7886e05ba8))
- mobile search [#156](https://github.com/lyaschuchenko/VueTorrent/issues/156) - maybe redesign in future
  ([463dabd](https://github.com/lyaschuchenko/VueTorrent/commit/463dabde00a34c495d238aff4fd82ea65acc9e54))
- mobile search [#156](https://github.com/lyaschuchenko/VueTorrent/issues/156) - maybe redesign in future
  ([0f62f4d](https://github.com/lyaschuchenko/VueTorrent/commit/0f62f4df6763e4449b1ceab946092f9b67b06411))
- no autocapitalize on login form [#489](https://github.com/lyaschuchenko/VueTorrent/issues/489)
  ([e352de0](https://github.com/lyaschuchenko/VueTorrent/commit/e352de0643dec66256f5565be6a686ee00f040e5))
- non-capital words ([#432](https://github.com/lyaschuchenko/VueTorrent/issues/432))
  ([ce1e7c3](https://github.com/lyaschuchenko/VueTorrent/commit/ce1e7c3546c150243fede941bd8b4b724e4a5c27))
- Persistent add modal ([d517d9f](https://github.com/lyaschuchenko/VueTorrent/commit/d517d9f3341e59de572118922b43a9e1adb8c9ad))
- proper unit for up/dl speed in details ([#547](https://github.com/lyaschuchenko/VueTorrent/issues/547))
  ([b2ceda2](https://github.com/lyaschuchenko/VueTorrent/commit/b2ceda28e548849f11f28503e27a081ad3818317))
- proper unit for up/dl speed in graph ([#548](https://github.com/lyaschuchenko/VueTorrent/issues/548))
  ([a6dac31](https://github.com/lyaschuchenko/VueTorrent/commit/a6dac31fbc5b902e3df562c97497daab121abee3))
- push precompiled release in a public folder ([adfc6a0](https://github.com/lyaschuchenko/VueTorrent/commit/adfc6a00f2e0b2e09f7f4e67a2efc3dc1db50194))
- PWA manifest [#405](https://github.com/lyaschuchenko/VueTorrent/issues/405)
  ([94727a1](https://github.com/lyaschuchenko/VueTorrent/commit/94727a142a1822c533c665d558ad4af6c207d5b9))
- Qbittorrent title on tab ([05bcc9e](https://github.com/lyaschuchenko/VueTorrent/commit/05bcc9e58783e4de49d698cfd25c902fad7776de))
- refresh torrent detail data from store ([#509](https://github.com/lyaschuchenko/VueTorrent/issues/509))
  ([5270619](https://github.com/lyaschuchenko/VueTorrent/commit/5270619a5d27eba380a33a8f12632c2c61611886))
- release build ([7a74275](https://github.com/lyaschuchenko/VueTorrent/commit/7a74275a4d15280205ec1e749415da1cb0cd7e41))
- remove black box on iOS PWA [#180](https://github.com/lyaschuchenko/VueTorrent/issues/180)
  ([f918ff5](https://github.com/lyaschuchenko/VueTorrent/commit/f918ff5ee5c0ddd1c288caa261bbd95e40de4d24))
- remove device darkmode because its unreliable [#285](https://github.com/lyaschuchenko/VueTorrent/issues/285)
  ([e6c0863](https://github.com/lyaschuchenko/VueTorrent/commit/e6c0863545c4a6a24ecc57158ff61421d17f9070))
- remove gesture feature on tabs (buggy anyway) ([0960962](https://github.com/lyaschuchenko/VueTorrent/commit/0960962441e424c28c8ad6014a79f733f495b881))
- remove search shortcut [#561](https://github.com/lyaschuchenko/VueTorrent/issues/561)
  ([0c6562e](https://github.com/lyaschuchenko/VueTorrent/commit/0c6562efb374a98b51749b7fba93a8be730c1169))
- remove vue-context import ([edcd825](https://github.com/lyaschuchenko/VueTorrent/commit/edcd825969f6876b1962dc8875be4b9447704820))
- replace v-html with conditional rendering in torrent details view ([#513](https://github.com/lyaschuchenko/VueTorrent/issues/513))
  ([6d873e7](https://github.com/lyaschuchenko/VueTorrent/commit/6d873e76fc63544673bda673ff377c0b9b810706))
- Russian language ([#494](https://github.com/lyaschuchenko/VueTorrent/issues/494))
  ([72548fa](https://github.com/lyaschuchenko/VueTorrent/commit/72548fac4ad7e5002a83b80c0b9cdb6b2d82e075))
- save path on category [#481](https://github.com/lyaschuchenko/VueTorrent/issues/481)
  ([954560e](https://github.com/lyaschuchenko/VueTorrent/commit/954560ee9675ce40f7131482fec83f87e7ef4296))
- scrollbar ([c460e29](https://github.com/lyaschuchenko/VueTorrent/commit/c460e29d95eb034266b3ae1006ebb57001f5aa83))
- search results not loading until stopped ([#391](https://github.com/lyaschuchenko/VueTorrent/issues/391))
  ([8b126d8](https://github.com/lyaschuchenko/VueTorrent/commit/8b126d8df5607f1c31174fec81f86091f4ad47cf))
- searchmodal pagination layout ([a9a9aff](https://github.com/lyaschuchenko/VueTorrent/commit/a9a9aff74f1310df724b0661011c97f798cdfaf6))
- selection list not cleared when closing deletemodal without button press ([80573f4](https://github.com/lyaschuchenko/VueTorrent/commit/80573f436498def7edae86e161535ef378c538e7))
- Settings>VueTorrent>Dashboard layout & UX ([d93e540](https://github.com/lyaschuchenko/VueTorrent/commit/d93e540a71c72bb274da14f36ae5fd72404bc65d))
- show torrent comment [#292](https://github.com/lyaschuchenko/VueTorrent/issues/292)
  ([4c3c2d3](https://github.com/lyaschuchenko/VueTorrent/commit/4c3c2d36d713c5f5fda2393a4cfc14b68b09244f))
- speed limit dialog incorrect text display and zh-hant fix ([#425](https://github.com/lyaschuchenko/VueTorrent/issues/425))
  ([45b244f](https://github.com/lyaschuchenko/VueTorrent/commit/45b244fbcf1ed63ebb2757a821343ed384a832f4))
- speedcard value cutoff [#141](https://github.com/lyaschuchenko/VueTorrent/issues/141)
  ([a81b1ea](https://github.com/lyaschuchenko/VueTorrent/commit/a81b1ea2e878b7e890b1c01037b54abba514f969))
- spelling mistake in README and "qBittorrent" casing ([#368](https://github.com/lyaschuchenko/VueTorrent/issues/368))
  ([90d6623](https://github.com/lyaschuchenko/VueTorrent/commit/90d66237115f50828a38edec7b10caf817a55b66))
- temporarily disable render link feat for security ([#512](https://github.com/lyaschuchenko/VueTorrent/issues/512))
  ([13e6584](https://github.com/lyaschuchenko/VueTorrent/commit/13e6584c5d9a541d01e770d901c9a6266e7c9b24))
- toggle in right-click menu not updating ([91fcfee](https://github.com/lyaschuchenko/VueTorrent/commit/91fcfeeba6b65c63fdb996d14d0a14c4b6319530))
- Torrent Detail modal with multiple tags shows only one tag selected [#167](https://github.com/lyaschuchenko/VueTorrent/issues/167)
  ([1973b5d](https://github.com/lyaschuchenko/VueTorrent/commit/1973b5dc520ed23682b7788a1ace3905d55c36d8))
- torrent done color to similar to seeding [#162](https://github.com/lyaschuchenko/VueTorrent/issues/162)
  ([bd71906](https://github.com/lyaschuchenko/VueTorrent/commit/bd7190685fd598d08ced9af9923e7cd3cfe50c5a))
- torrent progress color [#410](https://github.com/lyaschuchenko/VueTorrent/issues/410)
  ([886bc13](https://github.com/lyaschuchenko/VueTorrent/commit/886bc13f10d82b8973d6ea63fa051ae873b8aea2))
- torrent search ([#478](https://github.com/lyaschuchenko/VueTorrent/issues/478)) @Anteus
  ([baba4ac](https://github.com/lyaschuchenko/VueTorrent/commit/baba4acda4adcc2414d0a0cab6e7b13446152050))
- torrent search on enter [#149](https://github.com/lyaschuchenko/VueTorrent/issues/149)
  ([51fbec1](https://github.com/lyaschuchenko/VueTorrent/commit/51fbec13240f57dccd0177ee8e435f6aba290540))
- tweak search treshold [#250](https://github.com/lyaschuchenko/VueTorrent/issues/250)
  ([bdbc87b](https://github.com/lyaschuchenko/VueTorrent/commit/bdbc87b72423891a04a9c8c7a5de69e1d4ccd755))
- type errors Russian ([#495](https://github.com/lyaschuchenko/VueTorrent/issues/495))
  ([83c572b](https://github.com/lyaschuchenko/VueTorrent/commit/83c572b81df5ecd5e1afed0943fa841041ae2b1c))
- Unable to delete / create tags and categories ([#628](https://github.com/lyaschuchenko/VueTorrent/issues/628))
  ([4fa63ac](https://github.com/lyaschuchenko/VueTorrent/commit/4fa63ac1625d9858f70bfe6e51f71abe6030bd6a))
- Update Paramaters Sent to /torrents/renameFile ([#470](https://github.com/lyaschuchenko/VueTorrent/issues/470))
  ([1ccdf08](https://github.com/lyaschuchenko/VueTorrent/commit/1ccdf08b606bfff9e9e016765c0d03ed0e2e7715))
- Update registerServiceWorker.js (delete all cache on when new version is released)
  ([d846c92](https://github.com/lyaschuchenko/VueTorrent/commit/d846c924937c99746cbf5a102b0de8ed27381a5d))
- viewport ([60ecfc5](https://github.com/lyaschuchenko/VueTorrent/commit/60ecfc547b594e5ccbeede1d4d99ef0faa854c80))
- white scrollbar [#433](https://github.com/lyaschuchenko/VueTorrent/issues/433)
  ([db86506](https://github.com/lyaschuchenko/VueTorrent/commit/db86506c5e493e2bb69e441e56d86d78667df54b))
- wrong tempPathEnabled state [#284](https://github.com/lyaschuchenko/VueTorrent/issues/284)
  ([d8e2610](https://github.com/lyaschuchenko/VueTorrent/commit/d8e26104196120fdbb3475b36f4976c3619ba464))

### Improvements

- 'Vue2-perfect-scrollbar' is no longer dependent ([a83ea14](https://github.com/lyaschuchenko/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- Add "Completed On" to dashboard customization settings ([#578](https://github.com/lyaschuchenko/VueTorrent/issues/578))
  ([02db288](https://github.com/lyaschuchenko/VueTorrent/commit/02db288db287a3d423a4c14e946cfb6a44cc2ed9))
- add all-time stats [#351](https://github.com/lyaschuchenko/VueTorrent/issues/351)
  ([a268e77](https://github.com/lyaschuchenko/VueTorrent/commit/a268e774def5875354129c06122898bad018d5ed))
- Add Enter / Escape keybinds to modals and views ([#608](https://github.com/lyaschuchenko/VueTorrent/issues/608)) @Larsluph
  ([ee9bbc1](https://github.com/lyaschuchenko/VueTorrent/commit/ee9bbc1245448768570547f37e3115ff7390b836))
- Add export torrent to trc menu ([#625](https://github.com/lyaschuchenko/VueTorrent/issues/625)) @Larsluph
  ([353e26d](https://github.com/lyaschuchenko/VueTorrent/commit/353e26d51df1d44df16b7ea297f2b89144942977))
- add French translations ([#337](https://github.com/lyaschuchenko/VueTorrent/issues/337))
  ([30d5dc0](https://github.com/lyaschuchenko/VueTorrent/commit/30d5dc01c4349e0f52c5c58ec8f602ded16e706d))
- add Indonesian ([#361](https://github.com/lyaschuchenko/VueTorrent/issues/361))
  ([908af5b](https://github.com/lyaschuchenko/VueTorrent/commit/908af5b3faaa07a327665df51f296a977ddef9e6))
- add Japanese language support ([#401](https://github.com/lyaschuchenko/VueTorrent/issues/401))
  ([a178205](https://github.com/lyaschuchenko/VueTorrent/commit/a1782058c8417e6a8c06acd22ce56418b4fe9419))
- add mark as read behavior for rss articles ([#640](https://github.com/lyaschuchenko/VueTorrent/issues/640)) @Larsluph
  ([3cfc82f](https://github.com/lyaschuchenko/VueTorrent/commit/3cfc82f055bcc2a917e64e49c27137401d0a0810))
- add Portugese ([#350](https://github.com/lyaschuchenko/VueTorrent/issues/350))
  ([abb4c5b](https://github.com/lyaschuchenko/VueTorrent/commit/abb4c5ba69a779b729d99bb404fd59d25afb8b72))
- add reset settings button [#326](https://github.com/lyaschuchenko/VueTorrent/issues/326)
  ([0ada50b](https://github.com/lyaschuchenko/VueTorrent/commit/0ada50ba4ab49cf2edc74ac410ae982d162dc7ae))
- Add RSS articles view ([#622](https://github.com/lyaschuchenko/VueTorrent/issues/622)) @Larsluph
  ([f8fcafa](https://github.com/lyaschuchenko/VueTorrent/commit/f8fcafa1b114da877430daa258087fed6382258b))
- add Russian translations ([#493](https://github.com/lyaschuchenko/VueTorrent/issues/493)) [@reysonk](https://github.com/reysonk)
  ([9b6deb9](https://github.com/lyaschuchenko/VueTorrent/commit/9b6deb90371ac4e56ac2691002bda578e25758ea))
- Add scroll support in TorrentRightClickMenu ([#589](https://github.com/lyaschuchenko/VueTorrent/issues/589)) @Larsluph
  ([cd2f764](https://github.com/lyaschuchenko/VueTorrent/commit/cd2f7647e6178805c7f276aeee1c2e35087a532a))
- add sort none option [#128](https://github.com/lyaschuchenko/VueTorrent/issues/128)
  ([bf406e5](https://github.com/lyaschuchenko/VueTorrent/commit/bf406e5cfdda039f09add706c121db049328e65e))
- add Spanish Language ([#385](https://github.com/lyaschuchenko/VueTorrent/issues/385))
  ([d0f7055](https://github.com/lyaschuchenko/VueTorrent/commit/d0f7055148b6e88bb00c1c8cd58ec1fa123488e9))
- Add toast when renameFile and renameFolder returns 409 Conflict ([#588](https://github.com/lyaschuchenko/VueTorrent/issues/588)) @Larsluph
  ([e01d9a0](https://github.com/lyaschuchenko/VueTorrent/commit/e01d9a0b42886646a09cc3439e97efb16a5316ca))
- Add toasts for copy/paste success/error ([#620](https://github.com/lyaschuchenko/VueTorrent/issues/620))
  ([6cabef1](https://github.com/lyaschuchenko/VueTorrent/commit/6cabef1b56598f3fb896f37c619dc4a8effa6858))
- add ukranian ([e063168](https://github.com/lyaschuchenko/VueTorrent/commit/e06316812134df15ac1f5fbb73034436eb7d519c))
- add Vietnamese ([#392](https://github.com/lyaschuchenko/VueTorrent/issues/392))
  ([6019759](https://github.com/lyaschuchenko/VueTorrent/commit/6019759260d6561af29dbeb1a95497028b2b8b87))
- better authenticated check ([#411](https://github.com/lyaschuchenko/VueTorrent/issues/411))
  ([ce698e3](https://github.com/lyaschuchenko/VueTorrent/commit/ce698e38a80fb7ba1dee01251451865df75f68d4))
- better share limit modal ([#316](https://github.com/lyaschuchenko/VueTorrent/issues/316))
  ([9f2ca42](https://github.com/lyaschuchenko/VueTorrent/commit/9f2ca4230da46431965d6ed0777f465554926494))
- Chinese translations ([#363](https://github.com/lyaschuchenko/VueTorrent/issues/363))
  ([6c7372b](https://github.com/lyaschuchenko/VueTorrent/commit/6c7372b41ef72387c7781e0dcfd51fb046fb7881))
- complete French translation ([#438](https://github.com/lyaschuchenko/VueTorrent/issues/438))
  ([3a8ec90](https://github.com/lyaschuchenko/VueTorrent/commit/3a8ec90ca20dd20bf22d4af468031d347de7f686))
- Content tab for mobile users ([#602](https://github.com/lyaschuchenko/VueTorrent/issues/602)) @Larsluph
  ([fc371a2](https://github.com/lyaschuchenko/VueTorrent/commit/fc371a296cd8c2287b3fb45597f2d924d30c3847))
- Context (right click) menu refactor! Works way better on mobile ([a83ea14](https://github.com/lyaschuchenko/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- Convert locale data to json ([#616](https://github.com/lyaschuchenko/VueTorrent/issues/616)) @Larsluph
  ([e990d34](https://github.com/lyaschuchenko/VueTorrent/commit/e990d344d2b6d779c66af294bb168da78788200c))
- debounce torrent search field ([#542](https://github.com/lyaschuchenko/VueTorrent/issues/542))
  ([bb76c23](https://github.com/lyaschuchenko/VueTorrent/commit/bb76c23b98689c956ab1c068a155e9fb081081ea))
- Disable hide condition on page scroll ([#603](https://github.com/lyaschuchenko/VueTorrent/issues/603)) @Larsluph
  ([f175a6a](https://github.com/lyaschuchenko/VueTorrent/commit/f175a6af6521988c84357c761cddb1116e6f83e1))
- extra add button for mobile [#466](https://github.com/lyaschuchenko/VueTorrent/issues/466)
  ([e2dcb8e](https://github.com/lyaschuchenko/VueTorrent/commit/e2dcb8e6f08e9f75f00276c0529af97a873d7e5b))
- Fill data table width to whole page ([#626](https://github.com/lyaschuchenko/VueTorrent/issues/626))
  ([d2c0817](https://github.com/lyaschuchenko/VueTorrent/commit/d2c0817bee904ac5a4dcda5079307b705f1ac7e7))
- full Typescript migration + restructure ([#612](https://github.com/lyaschuchenko/VueTorrent/issues/612)) @Larsluph
  ([e09e8a0](https://github.com/lyaschuchenko/VueTorrent/commit/e09e8a0300551b813432dfba5d867be3f6709694))
- improve russian translations ([#593](https://github.com/lyaschuchenko/VueTorrent/issues/593)) @Balya
  ([684690a](https://github.com/lyaschuchenko/VueTorrent/commit/684690ac7b7a443212e6aadc08aedfca91fc1dc4))
- Improved Ukrainian translation ([#457](https://github.com/lyaschuchenko/VueTorrent/issues/457))
  ([b56a16f](https://github.com/lyaschuchenko/VueTorrent/commit/b56a16f7cebaf3b434f85c621b73e2d3e3385ba8))
- lazy load pages for smaller chunk sizes ([abe909e](https://github.com/lyaschuchenko/VueTorrent/commit/abe909e14d740f4a78267564d87e2d46ef3c08a8))
- more chinese translations ([65943ae](https://github.com/lyaschuchenko/VueTorrent/commit/65943aea02b1a349719a704492f2905b1f8f2f81))
- more translations ([4f8c697](https://github.com/lyaschuchenko/VueTorrent/commit/4f8c697757d818eeaf70d1c6970cd1f6000d6497))
- move notification banner to botton [#389](https://github.com/lyaschuchenko/VueTorrent/issues/389)
  ([4b90d56](https://github.com/lyaschuchenko/VueTorrent/commit/4b90d56df5a43bf466acafd3c7bb43a960bffab8))
- only update changed data + code cleanup ([664e4db](https://github.com/lyaschuchenko/VueTorrent/commit/664e4dbe2ff9bf04a2ef766fe2726d5f994b1228))
- paste button for magnet links [#307](https://github.com/lyaschuchenko/VueTorrent/issues/307)
  ([797ba8c](https://github.com/lyaschuchenko/VueTorrent/commit/797ba8c66687c3cfb654874189fc96808d4bbb34))
- persist searchfilter + page [#462](https://github.com/lyaschuchenko/VueTorrent/issues/462)
  ([67b1551](https://github.com/lyaschuchenko/VueTorrent/commit/67b1551b36c94849d46c0a0dd5dadfda181df589))
- Remove redundant dialog code, use Modal Mixin ([33cf62f](https://github.com/lyaschuchenko/VueTorrent/commit/33cf62ff9b6ea671dc1022e345a65705bd814640))
- reset pageNumber when changing filters to prevent value overflow ([#591](https://github.com/lyaschuchenko/VueTorrent/issues/591)) @Larsluph
  ([719c5e9](https://github.com/lyaschuchenko/VueTorrent/commit/719c5e9ebafff56cfe077b8836d55823ae78b947))
- Rework desktop cards ([#627](https://github.com/lyaschuchenko/VueTorrent/issues/627)) @Larsluph
  ([5aeb653](https://github.com/lyaschuchenko/VueTorrent/commit/5aeb65352fc9335112b7747641420579fcd55c47))
- softer red color [#155](https://github.com/lyaschuchenko/VueTorrent/issues/155)
  ([cbf845a](https://github.com/lyaschuchenko/VueTorrent/commit/cbf845a8a407895e8d6093c584ea96497c45cac0))
- sort dropdown in dashboard [#309](https://github.com/lyaschuchenko/VueTorrent/issues/309)
  ([b557db4](https://github.com/lyaschuchenko/VueTorrent/commit/b557db48e8ef33fb68fa802e35d9b77921c5a52d))
- support more translations + add Simplified Chinese translations ([#415](https://github.com/lyaschuchenko/VueTorrent/issues/415))
  ([ddd28ae](https://github.com/lyaschuchenko/VueTorrent/commit/ddd28ae6192862928ef26c1e1135565f6303095b))
- topmenu tooltip delay [#399](https://github.com/lyaschuchenko/VueTorrent/issues/399)
  ([2d5ad9d](https://github.com/lyaschuchenko/VueTorrent/commit/2d5ad9d44227f2ffd3e180eff9740e82ba0281cb))
- translation fixes ([#419](https://github.com/lyaschuchenko/VueTorrent/issues/419))
  ([521ac58](https://github.com/lyaschuchenko/VueTorrent/commit/521ac5804a622c68d788de1f5730b0c43f49f0a1))
- Update and realign locales ([#573](https://github.com/lyaschuchenko/VueTorrent/issues/573))
  ([c45bf20](https://github.com/lyaschuchenko/VueTorrent/commit/c45bf208dedc72db108ee1b3115d338a0349f19e))
- Update Simplified Chinese translation. ([#454](https://github.com/lyaschuchenko/VueTorrent/issues/454))
  ([20f4a67](https://github.com/lyaschuchenko/VueTorrent/commit/20f4a67f4988629d1bc74ec18226cd858e2469e1))
- update Traditional Chinese translations ([#422](https://github.com/lyaschuchenko/VueTorrent/issues/422))
  ([964b145](https://github.com/lyaschuchenko/VueTorrent/commit/964b1451a1758522856fae2c730af9db66e351a1))
- updated japanese translate file ([#491](https://github.com/lyaschuchenko/VueTorrent/issues/491))
  ([7e5cc48](https://github.com/lyaschuchenko/VueTorrent/commit/7e5cc4891a61d441429c155ec759d5a668c3498f))
- use pages instead of modals [#398](https://github.com/lyaschuchenko/VueTorrent/issues/398) ([#450](https://github.com/lyaschuchenko/VueTorrent/issues/450))
  ([fcb0219](https://github.com/lyaschuchenko/VueTorrent/commit/fcb021972ae62ee36e91bbbf5cba0ee6dc87725a))
- use quick-score instead of fuse.js [#306](https://github.com/lyaschuchenko/VueTorrent/issues/306)
  ([f9434c3](https://github.com/lyaschuchenko/VueTorrent/commit/f9434c375663689f605e57e7749bd010fc87ad7a))

### [1.3.1](https://github.com/WDaan/VueTorrent/compare/v1.3.0...v1.3.1) (2023-02-08)

### Bug Fixes

- change rss-unread color from white to #ccc ([#643](https://github.com/WDaan/VueTorrent/issues/643)) [@hqwuzhaoyi](https://github.com/hqwuzhaoyi)
  ([dd02cdb](https://github.com/WDaan/VueTorrent/commit/dd02cdb564803495af0ea60a61c65562b3fe8ea5))
- chart flickering ([#644](https://github.com/WDaan/VueTorrent/issues/644)) @Hans1208
  ([5e3d6b7](https://github.com/WDaan/VueTorrent/commit/5e3d6b778892fc6b157ba533f288e77ceed091c7))

## [1.3.0](https://github.com/WDaan/VueTorrent/compare/v1.2.0...v1.3.0) (2023-02-07)

### Features

- Add shutdown button in TopActions ([#633](https://github.com/WDaan/VueTorrent/issues/633)) @Larsluph
  ([ab75f32](https://github.com/WDaan/VueTorrent/commit/ab75f32c5f6225fb9b2615f2880b2ef40037820a))

### Bug Fixes

- Duplicate reference in dashboard settings ([#618](https://github.com/WDaan/VueTorrent/issues/618)) @Larsluph
  ([ea7e68c](https://github.com/WDaan/VueTorrent/commit/ea7e68ca2a48b19292d9b9b5388bcba8664d04bb))
- Forced state not present in MobileCard ([#632](https://github.com/WDaan/VueTorrent/issues/632)) @Larsluph
  ([7114ce1](https://github.com/WDaan/VueTorrent/commit/7114ce12df6bf7a0992406245277093c52d16002))
- Invalid deconstruct on qbit service ([#623](https://github.com/WDaan/VueTorrent/issues/623))
  ([5a2ed4e](https://github.com/WDaan/VueTorrent/commit/5a2ed4ea99a81f5566e3276acb8faae42adcc035))
- Unable to delete / create tags and categories ([#628](https://github.com/WDaan/VueTorrent/issues/628))
  ([4fa63ac](https://github.com/WDaan/VueTorrent/commit/4fa63ac1625d9858f70bfe6e51f71abe6030bd6a))

### Improvements

- Add Enter / Escape keybinds to modals and views ([#608](https://github.com/WDaan/VueTorrent/issues/608)) @Larsluph
  ([ee9bbc1](https://github.com/WDaan/VueTorrent/commit/ee9bbc1245448768570547f37e3115ff7390b836))
- Add export torrent to trc menu ([#625](https://github.com/WDaan/VueTorrent/issues/625)) @Larsluph
  ([353e26d](https://github.com/WDaan/VueTorrent/commit/353e26d51df1d44df16b7ea297f2b89144942977))
- add mark as read behavior for rss articles ([#640](https://github.com/WDaan/VueTorrent/issues/640)) @Larsluph
  ([3cfc82f](https://github.com/WDaan/VueTorrent/commit/3cfc82f055bcc2a917e64e49c27137401d0a0810))
- Add RSS articles view ([#622](https://github.com/WDaan/VueTorrent/issues/622)) @Larsluph
  ([f8fcafa](https://github.com/WDaan/VueTorrent/commit/f8fcafa1b114da877430daa258087fed6382258b))
- Add toasts for copy/paste success/error ([#620](https://github.com/WDaan/VueTorrent/issues/620))
  ([6cabef1](https://github.com/WDaan/VueTorrent/commit/6cabef1b56598f3fb896f37c619dc4a8effa6858))
- Content tab for mobile users ([#602](https://github.com/WDaan/VueTorrent/issues/602)) @Larsluph
  ([fc371a2](https://github.com/WDaan/VueTorrent/commit/fc371a296cd8c2287b3fb45597f2d924d30c3847))
- Convert locale data to json ([#616](https://github.com/WDaan/VueTorrent/issues/616)) @Larsluph
  ([e990d34](https://github.com/WDaan/VueTorrent/commit/e990d344d2b6d779c66af294bb168da78788200c))
- Disable hide condition on page scroll ([#603](https://github.com/WDaan/VueTorrent/issues/603)) @Larsluph
  ([f175a6a](https://github.com/WDaan/VueTorrent/commit/f175a6af6521988c84357c761cddb1116e6f83e1))
- Fill data table width to whole page ([#626](https://github.com/WDaan/VueTorrent/issues/626))
  ([d2c0817](https://github.com/WDaan/VueTorrent/commit/d2c0817bee904ac5a4dcda5079307b705f1ac7e7))
- full Typescript migration + restructure ([#612](https://github.com/WDaan/VueTorrent/issues/612)) @Larsluph
  ([e09e8a0](https://github.com/WDaan/VueTorrent/commit/e09e8a0300551b813432dfba5d867be3f6709694))
- Rework desktop cards ([#627](https://github.com/WDaan/VueTorrent/issues/627)) @Larsluph
  ([5aeb653](https://github.com/WDaan/VueTorrent/commit/5aeb65352fc9335112b7747641420579fcd55c47))

## [1.2.0](https://github.com/WDaan/VueTorrent/compare/v1.1.0...v1.2.0) (2023-01-11)

### Features

- Add globalSpeed and globalVolume computed values to torrent properties ([#599](https://github.com/WDaan/VueTorrent/issues/599)) @Larsluph
  ([3e1d341](https://github.com/WDaan/VueTorrent/commit/3e1d3411b7158ec7b8665f2d677b62eca8846d66))
- add pending pieces color to canvas ([#592](https://github.com/WDaan/VueTorrent/issues/592)) @Larsluph
  ([5132d4d](https://github.com/WDaan/VueTorrent/commit/5132d4decf207d508e91f8b65ced31d50dc3f838))
- Add support for "autorun on torrent added" option ([#580](https://github.com/WDaan/VueTorrent/issues/580)) @Larsluph
  ([19bf989](https://github.com/WDaan/VueTorrent/commit/19bf989c7ea8d8f3ed16ab35416575bfcdc3c21c))
- Add/Ban peers support ([#598](https://github.com/WDaan/VueTorrent/issues/598)) @Larsluph
  ([59b47db](https://github.com/WDaan/VueTorrent/commit/59b47dbc8d28675d78892651be79536db3df9b33))

### Bug Fixes

- "409 Conflict" on file/folder rename ([#597](https://github.com/WDaan/VueTorrent/issues/597))
  ([004c8f5](https://github.com/WDaan/VueTorrent/commit/004c8f57d2db1da9032848e783497bcc3c239df2))
- Dashboard items not using $store.state reference ([#601](https://github.com/WDaan/VueTorrent/issues/601))
  ([add11c9](https://github.com/WDaan/VueTorrent/commit/add11c9548472396a7c4e2c483128de25380b616))
- Default change location not prefilling ([#583](https://github.com/WDaan/VueTorrent/issues/583)) @Larsluph
  ([b53c331](https://github.com/WDaan/VueTorrent/commit/b53c331d4c98635f38945d9898ab72358bb7bf34))

### Improvements

- Add "Completed On" to dashboard customization settings ([#578](https://github.com/WDaan/VueTorrent/issues/578))
  ([02db288](https://github.com/WDaan/VueTorrent/commit/02db288db287a3d423a4c14e946cfb6a44cc2ed9))
- Add scroll support in TorrentRightClickMenu ([#589](https://github.com/WDaan/VueTorrent/issues/589)) @Larsluph
  ([cd2f764](https://github.com/WDaan/VueTorrent/commit/cd2f7647e6178805c7f276aeee1c2e35087a532a))
- Add toast when renameFile and renameFolder returns 409 Conflict ([#588](https://github.com/WDaan/VueTorrent/issues/588)) @Larsluph
  ([e01d9a0](https://github.com/WDaan/VueTorrent/commit/e01d9a0b42886646a09cc3439e97efb16a5316ca))
- improve russian translations ([#593](https://github.com/WDaan/VueTorrent/issues/593)) @Balya
  ([684690a](https://github.com/WDaan/VueTorrent/commit/684690ac7b7a443212e6aadc08aedfca91fc1dc4))
- reset pageNumber when changing filters to prevent value overflow ([#591](https://github.com/WDaan/VueTorrent/issues/591)) @Larsluph
  ([719c5e9](https://github.com/WDaan/VueTorrent/commit/719c5e9ebafff56cfe077b8836d55823ae78b947))

## [1.1.0](https://github.com/WDaan/VueTorrent/compare/v1.0.1...v1.1.0) (2022-12-30)

### Features

- Add Batch change location ([#574](https://github.com/WDaan/VueTorrent/issues/574))
  ([060c3c3](https://github.com/WDaan/VueTorrent/commit/060c3c3a1c463e988014fe1ae52569921a68d545))
- add completed on [#571](https://github.com/WDaan/VueTorrent/issues/571) ([e242bad](https://github.com/WDaan/VueTorrent/commit/e242bad1af2c4a2f7824b2d0018e28a3e3ac580b))
- Add tag support in Dashboard, TorrentDetail and Add Modal ([#570](https://github.com/WDaan/VueTorrent/issues/570))
  ([0a175cc](https://github.com/WDaan/VueTorrent/commit/0a175ccb437f9ad5609b85482a63dfbc2e6f0e9a))

### Bug Fixes

- Add caret color to dark theme ([#564](https://github.com/WDaan/VueTorrent/issues/564))
  ([45c65ae](https://github.com/WDaan/VueTorrent/commit/45c65ae394db6fc722afa13408ba74b4a55bf240))
- general fixes and README update ([#562](https://github.com/WDaan/VueTorrent/issues/562))
  ([8b6caf0](https://github.com/WDaan/VueTorrent/commit/8b6caf03359128581077471ce1d80d1308f1a2b6))
- load missing filters at startup ([#567](https://github.com/WDaan/VueTorrent/issues/567))
  ([87de795](https://github.com/WDaan/VueTorrent/commit/87de79555b5aad8827fd5f15dbf53239cdea10c9))
- remove search shortcut [#561](https://github.com/WDaan/VueTorrent/issues/561) ([0c6562e](https://github.com/WDaan/VueTorrent/commit/0c6562efb374a98b51749b7fba93a8be730c1169))
- toggle in right-click menu not updating ([91fcfee](https://github.com/WDaan/VueTorrent/commit/91fcfeeba6b65c63fdb996d14d0a14c4b6319530))

### Improvements

- add reset settings button [#326](https://github.com/WDaan/VueTorrent/issues/326) ([0ada50b](https://github.com/WDaan/VueTorrent/commit/0ada50ba4ab49cf2edc74ac410ae982d162dc7ae))
- Update and realign locales ([#573](https://github.com/WDaan/VueTorrent/issues/573))
  ([c45bf20](https://github.com/WDaan/VueTorrent/commit/c45bf208dedc72db108ee1b3115d338a0349f19e))

### [1.0.1](https://github.com/WDaan/VueTorrent/compare/v1.0.0...v1.0.1) (2022-11-25)

### Bug Fixes

- "405 Method Not Allowed" when renaming torrent ([#551](https://github.com/WDaan/VueTorrent/issues/551))
  ([66dc741](https://github.com/WDaan/VueTorrent/commit/66dc74182545705003e3bcb4460224a18a57e830))
- category create validation ([#552](https://github.com/WDaan/VueTorrent/issues/552))
  ([edc0330](https://github.com/WDaan/VueTorrent/commit/edc0330bafdedc98e2e5f7df6bc2894bbcf5a281))
- free space toggle [#541](https://github.com/WDaan/VueTorrent/issues/541) ([f8c3b7d](https://github.com/WDaan/VueTorrent/commit/f8c3b7dc38ff1a7a52a130982f86d82cc4fb61c4))
- proper unit for up/dl speed in details ([#547](https://github.com/WDaan/VueTorrent/issues/547))
  ([b2ceda2](https://github.com/WDaan/VueTorrent/commit/b2ceda28e548849f11f28503e27a081ad3818317))
- proper unit for up/dl speed in graph ([#548](https://github.com/WDaan/VueTorrent/issues/548))
  ([a6dac31](https://github.com/WDaan/VueTorrent/commit/a6dac31fbc5b902e3df562c97497daab121abee3))

### Improvements

- debounce torrent search field ([#542](https://github.com/WDaan/VueTorrent/issues/542))
  ([bb76c23](https://github.com/WDaan/VueTorrent/commit/bb76c23b98689c956ab1c068a155e9fb081081ea))
- paste button for magnet links [#307](https://github.com/WDaan/VueTorrent/issues/307)
  ([797ba8c](https://github.com/WDaan/VueTorrent/commit/797ba8c66687c3cfb654874189fc96808d4bbb34))

## [1.0.0](https://github.com/WDaan/VueTorrent/compare/v0.19.1...v1.0.0) (2022-11-16)

### ⚠ BREAKING CHANGES

- move to vite + typescript => BREAKS PWA, please re-install! (#352)

### Features

- add directory to dashboard and sort [#538](https://github.com/WDaan/VueTorrent/issues/538)
  ([f474709](https://github.com/WDaan/VueTorrent/commit/f474709d4f28b20fe4c0ef92f56de76b924f5d0b))
- add max_ratio_act handling ([#523](https://github.com/WDaan/VueTorrent/issues/523)) [@giacomocerquone](https://github.com/giacomocerquone)
  ([b05dcd0](https://github.com/WDaan/VueTorrent/commit/b05dcd0569e526f66420c9e2d30ef5f4e9fc864b))
- additional connection settings [#317](https://github.com/WDaan/VueTorrent/issues/317)
  ([54b3456](https://github.com/WDaan/VueTorrent/commit/54b345682f18b45fc6f6fe5d7a732bb87932f664))
- basic fake torrent generator [#518](https://github.com/WDaan/VueTorrent/issues/518)
  ([d3cda1a](https://github.com/WDaan/VueTorrent/commit/d3cda1a6499fcc2a7c4a548862b9c1e4fa338c23))
- create nightly build ([1cdbb95](https://github.com/WDaan/VueTorrent/commit/1cdbb95f8ca258430f85eb7d3385dc134d5c3b48))
- custom date format support [#340](https://github.com/WDaan/VueTorrent/issues/340) ([e08a445](https://github.com/WDaan/VueTorrent/commit/e08a4456ee3ce76af3c3a47c7a15cbb5141a4663))
- Last Activity support [#217](https://github.com/WDaan/VueTorrent/issues/217) ([1d9279a](https://github.com/WDaan/VueTorrent/commit/1d9279a3764578fbc25ded4c0b035be855d04163))
- move to vite + typescript => BREAKS PWA, please re-install! ([#352](https://github.com/WDaan/VueTorrent/issues/352))
  ([5aa83fa](https://github.com/WDaan/VueTorrent/commit/5aa83fa95e0c072822b1c13910455b18f7a6bbb8))
- optional top pagination [#539](https://github.com/WDaan/VueTorrent/issues/539) ([8a59d10](https://github.com/WDaan/VueTorrent/commit/8a59d10483e351ae95a8c32e878189411ce50ec1))
- render "active time" in torrent info tab ([#537](https://github.com/WDaan/VueTorrent/issues/537)) [@invakid404](https://github.com/invakid404)
  ([d3cf4d5](https://github.com/WDaan/VueTorrent/commit/d3cf4d5795b1a62a8bc1e5a4645408657c4956cd))
- sidebar on launch option [#182](https://github.com/WDaan/VueTorrent/issues/182) ([fca51c5](https://github.com/WDaan/VueTorrent/commit/fca51c536fe8cb96c878501c386efcb4ee868ff6))

### Bug Fixes

- copy to clipboard on non secure context (no SSL) [#521](https://github.com/WDaan/VueTorrent/issues/521)
  ([058766f](https://github.com/WDaan/VueTorrent/commit/058766f617e39f57bd56d68557b32797d70d4947))
- dark theme glitch ([2b913d5](https://github.com/WDaan/VueTorrent/commit/2b913d5064d6c5135ed19c720cdccaaaf792fe4c))
- disabling plugins [#443](https://github.com/WDaan/VueTorrent/issues/443) ([3b98949](https://github.com/WDaan/VueTorrent/commit/3b989499b867f00618a0a567831c9a1dcdc65418))
- login autocomplete render issue [#474](https://github.com/WDaan/VueTorrent/issues/474)
  ([ef64c38](https://github.com/WDaan/VueTorrent/commit/ef64c38f099fca1be5db45741c60afc04fff3065))
- replace v-html with conditional rendering in torrent details view ([#513](https://github.com/WDaan/VueTorrent/issues/513))
  ([6d873e7](https://github.com/WDaan/VueTorrent/commit/6d873e76fc63544673bda673ff377c0b9b810706))
- save path on category [#481](https://github.com/WDaan/VueTorrent/issues/481) ([954560e](https://github.com/WDaan/VueTorrent/commit/954560ee9675ce40f7131482fec83f87e7ef4296))
- viewport ([60ecfc5](https://github.com/WDaan/VueTorrent/commit/60ecfc547b594e5ccbeede1d4d99ef0faa854c80))

### Improvements

- add sort none option [#128](https://github.com/WDaan/VueTorrent/issues/128) ([bf406e5](https://github.com/WDaan/VueTorrent/commit/bf406e5cfdda039f09add706c121db049328e65e))
- extra add button for mobile [#466](https://github.com/WDaan/VueTorrent/issues/466)
  ([e2dcb8e](https://github.com/WDaan/VueTorrent/commit/e2dcb8e6f08e9f75f00276c0529af97a873d7e5b))
- persist searchfilter + page [#462](https://github.com/WDaan/VueTorrent/issues/462)
  ([67b1551](https://github.com/WDaan/VueTorrent/commit/67b1551b36c94849d46c0a0dd5dadfda181df589))
- sort dropdown in dashboard [#309](https://github.com/WDaan/VueTorrent/issues/309) ([b557db4](https://github.com/WDaan/VueTorrent/commit/b557db48e8ef33fb68fa802e35d9b77921c5a52d))
- use quick-score instead of fuse.js [#306](https://github.com/WDaan/VueTorrent/issues/306)
  ([f9434c3](https://github.com/WDaan/VueTorrent/commit/f9434c375663689f605e57e7749bd010fc87ad7a))

### [0.19.1](https://github.com/WDaan/VueTorrent/compare/v0.19.0...v0.19.1) (2022-10-11)

### Bug Fixes

- login console error on refresh ([254d7c8](https://github.com/WDaan/VueTorrent/commit/254d7c8562e3fec5a16b4f65a4de0382ef7662c1))
- login prompt being displayed when whitelisted ([#511](https://github.com/WDaan/VueTorrent/issues/511))
  ([077cf54](https://github.com/WDaan/VueTorrent/commit/077cf54c6bb5ccc7e5ccf9b94731ec468bd17ecd))
- refresh torrent detail data from store ([#509](https://github.com/WDaan/VueTorrent/issues/509))
  ([5270619](https://github.com/WDaan/VueTorrent/commit/5270619a5d27eba380a33a8f12632c2c61611886))
- temporarily disable render link feat for security ([#512](https://github.com/WDaan/VueTorrent/issues/512))
  ([13e6584](https://github.com/WDaan/VueTorrent/commit/13e6584c5d9a541d01e770d901c9a6266e7c9b24))

## [0.19.0](https://github.com/WDaan/VueTorrent/compare/v0.18.2...v0.19.0) (2022-10-10)

### Features

- Links in torrent details view are now clickable ([#506](https://github.com/WDaan/VueTorrent/issues/506))
  ([f1536cb](https://github.com/WDaan/VueTorrent/commit/f1536cb010e2ebc8d7d026a62be491e8a3a04cfa))
- support for renaming folders ([#500](https://github.com/WDaan/VueTorrent/issues/500))
  ([cf8f43a](https://github.com/WDaan/VueTorrent/commit/cf8f43aac3c235cf616bed4c1ce1ceda0fad8fe4))

### Bug Fixes

- Cookies not sent with request for Web App manifest.json ([#504](https://github.com/WDaan/VueTorrent/issues/504))
  ([2efe73a](https://github.com/WDaan/VueTorrent/commit/2efe73ad7e51c7b45ad65827503d4c3fcebd58a4))
- font-size difference in right click menu ([#505](https://github.com/WDaan/VueTorrent/issues/505))
  ([a8f28dd](https://github.com/WDaan/VueTorrent/commit/a8f28dd5b468924f7dcf09d101e438a15e1269ba))

### [0.18.2](https://github.com/WDaan/VueTorrent/compare/v0.18.1...v0.18.2) (2022-09-13)

### Bug Fixes

- anonymous mode [#362](https://github.com/WDaan/VueTorrent/issues/362) ([27a0717](https://github.com/WDaan/VueTorrent/commit/27a07179f08225292e2e26fb57bbfa6f846b272b))
- connection password type [#456](https://github.com/WDaan/VueTorrent/issues/456) ([a8616cc](https://github.com/WDaan/VueTorrent/commit/a8616cce545ed579e39db9e64c0005a74eee63d5))
- connection status [#482](https://github.com/WDaan/VueTorrent/issues/482) ([e047467](https://github.com/WDaan/VueTorrent/commit/e0474671042dc7b1c4f2490018c5484e4730ccf1))
- no autocapitalize on login form [#489](https://github.com/WDaan/VueTorrent/issues/489)
  ([e352de0](https://github.com/WDaan/VueTorrent/commit/e352de0643dec66256f5565be6a686ee00f040e5))
- Russian language ([#494](https://github.com/WDaan/VueTorrent/issues/494)) ([72548fa](https://github.com/WDaan/VueTorrent/commit/72548fac4ad7e5002a83b80c0b9cdb6b2d82e075))
- torrent search ([#478](https://github.com/WDaan/VueTorrent/issues/478)) @Anteus ([baba4ac](https://github.com/WDaan/VueTorrent/commit/baba4acda4adcc2414d0a0cab6e7b13446152050))
- Update Paramaters Sent to /torrents/renameFile ([#470](https://github.com/WDaan/VueTorrent/issues/470))
  ([1ccdf08](https://github.com/WDaan/VueTorrent/commit/1ccdf08b606bfff9e9e016765c0d03ed0e2e7715))

### Improvements

- add Russian translations ([#493](https://github.com/WDaan/VueTorrent/issues/493)) [@reysonk](https://github.com/reysonk)
  ([9b6deb9](https://github.com/WDaan/VueTorrent/commit/9b6deb90371ac4e56ac2691002bda578e25758ea))
- Improved Ukrainian translation ([#457](https://github.com/WDaan/VueTorrent/issues/457))
  ([b56a16f](https://github.com/WDaan/VueTorrent/commit/b56a16f7cebaf3b434f85c621b73e2d3e3385ba8))
- updated japanese translate file ([#491](https://github.com/WDaan/VueTorrent/issues/491))
  ([7e5cc48](https://github.com/WDaan/VueTorrent/commit/7e5cc4891a61d441429c155ec759d5a668c3498f))

### [0.18.1](https://github.com/WDaan/VueTorrent/compare/v0.18.0...v0.18.1) (2022-07-05)

### Bug Fixes

- broken build [#453](https://github.com/WDaan/VueTorrent/issues/453) ([8f1a12d](https://github.com/WDaan/VueTorrent/commit/8f1a12d15fa438e55194a9c807bbdc0115a3deda))
- release build ([7a74275](https://github.com/WDaan/VueTorrent/commit/7a74275a4d15280205ec1e749415da1cb0cd7e41))

### Improvements

- lazy load pages for smaller chunk sizes ([abe909e](https://github.com/WDaan/VueTorrent/commit/abe909e14d740f4a78267564d87e2d46ef3c08a8))
- Update Simplified Chinese translation. ([#454](https://github.com/WDaan/VueTorrent/issues/454))
  ([20f4a67](https://github.com/WDaan/VueTorrent/commit/20f4a67f4988629d1bc74ec18226cd858e2469e1))

## [0.18.0](https://github.com/WDaan/VueTorrent/compare/v0.17.1...v0.18.0) (2022-07-04)

### Features

- basic proxy support [#261](https://github.com/WDaan/VueTorrent/issues/261) ([71a09fc](https://github.com/WDaan/VueTorrent/commit/71a09fc58a9c29037cfc87fa6c6f0cfdb645233e))
- Basic rss interface ([#447](https://github.com/WDaan/VueTorrent/issues/447)) ([732e519](https://github.com/WDaan/VueTorrent/commit/732e5193ec76d521249ac6fb73c4a6e975091476))

### Bug Fixes

- category download folder not showing correctly ([#448](https://github.com/WDaan/VueTorrent/issues/448))
  ([06579c8](https://github.com/WDaan/VueTorrent/commit/06579c8bbee5f991f195df596054da8751d0ea72))
- favicon [#441](https://github.com/WDaan/VueTorrent/issues/441) ([745376c](https://github.com/WDaan/VueTorrent/commit/745376c02be7a1d9398feb5181bebe9026d22638))
- favicon [#441](https://github.com/WDaan/VueTorrent/issues/441) ([b7e7de1](https://github.com/WDaan/VueTorrent/commit/b7e7de1e9095228d9207845201c0ceff814623a4))

### Improvements

- add ukranian ([e063168](https://github.com/WDaan/VueTorrent/commit/e06316812134df15ac1f5fbb73034436eb7d519c))
- use pages instead of modals [#398](https://github.com/WDaan/VueTorrent/issues/398) ([#450](https://github.com/WDaan/VueTorrent/issues/450))
  ([fcb0219](https://github.com/WDaan/VueTorrent/commit/fcb021972ae62ee36e91bbbf5cba0ee6dc87725a))

### [0.17.1](https://github.com/WDaan/VueTorrent/compare/v0.17.0...v0.17.1) (2022-06-11)

### Bug Fixes

- add progress border + percentage [#430](https://github.com/WDaan/VueTorrent/issues/430)
  ([acc0733](https://github.com/WDaan/VueTorrent/commit/acc07335d31b027cd7ca989959c6d450a957010e))
- category download folder [#435](https://github.com/WDaan/VueTorrent/issues/435) ([5a0ec26](https://github.com/WDaan/VueTorrent/commit/5a0ec26ddb7b9c7fc1a03102684fd2268b2ae33f))
- non-capital words ([#432](https://github.com/WDaan/VueTorrent/issues/432)) ([ce1e7c3](https://github.com/WDaan/VueTorrent/commit/ce1e7c3546c150243fede941bd8b4b724e4a5c27))
- white scrollbar [#433](https://github.com/WDaan/VueTorrent/issues/433) ([db86506](https://github.com/WDaan/VueTorrent/commit/db86506c5e493e2bb69e441e56d86d78667df54b))

### Improvements

- complete French translation ([#438](https://github.com/WDaan/VueTorrent/issues/438))
  ([3a8ec90](https://github.com/WDaan/VueTorrent/commit/3a8ec90ca20dd20bf22d4af468031d347de7f686))

## [0.17.0](https://github.com/WDaan/VueTorrent/compare/v0.16.3...v0.17.0) (2022-06-05)

### Features

- add dialog missing options [#418](https://github.com/WDaan/VueTorrent/issues/418) ([68223f5](https://github.com/WDaan/VueTorrent/commit/68223f5f45da3a4819b43398707fed1e172468e8))
- piece states progress bar ([#426](https://github.com/WDaan/VueTorrent/issues/426))
  ([1722a14](https://github.com/WDaan/VueTorrent/commit/1722a14dba74dafca3b373d50c6dcd94814ab074))

### Bug Fixes

- allow native context menu in input elements ([#428](https://github.com/WDaan/VueTorrent/issues/428))
  ([b8ad965](https://github.com/WDaan/VueTorrent/commit/b8ad965763fd647b230f7fcbd9798d182cefd762))
- load default folder [#417](https://github.com/WDaan/VueTorrent/issues/417) ([c63d0a4](https://github.com/WDaan/VueTorrent/commit/c63d0a403939c99a442a10563789cb8753d67771))

### [0.16.3](https://github.com/WDaan/VueTorrent/compare/v0.16.2...v0.16.3) (2022-05-14)

### Bug Fixes

- speed limit dialog incorrect text display and zh-hant fix ([#425](https://github.com/WDaan/VueTorrent/issues/425))
  ([45b244f](https://github.com/WDaan/VueTorrent/commit/45b244fbcf1ed63ebb2757a821343ed384a832f4))

### Improvements

- update Traditional Chinese translations ([#422](https://github.com/WDaan/VueTorrent/issues/422))
  ([964b145](https://github.com/WDaan/VueTorrent/commit/964b1451a1758522856fae2c730af9db66e351a1))

### [0.16.2](https://github.com/WDaan/VueTorrent/compare/v0.16.1...v0.16.2) (2022-05-08)

### Bug Fixes

- magnet text area max size [#413](https://github.com/WDaan/VueTorrent/issues/413) ([4dd81f7](https://github.com/WDaan/VueTorrent/commit/4dd81f7cd49ab807fddeb50ff2e871364fd955e5))

### Improvements

- support more translations + add Simplified Chinese translations ([#415](https://github.com/WDaan/VueTorrent/issues/415))
  ([ddd28ae](https://github.com/WDaan/VueTorrent/commit/ddd28ae6192862928ef26c1e1135565f6303095b))
- translation fixes ([#419](https://github.com/WDaan/VueTorrent/issues/419)) ([521ac58](https://github.com/WDaan/VueTorrent/commit/521ac5804a622c68d788de1f5730b0c43f49f0a1))

### [0.16.1](https://www.github.com/WDaan/VueTorrent/compare/v0.16.0...v0.16.1) (2022-04-17)

### Bug Fixes

- torrent progress color [#410](https://www.github.com/WDaan/VueTorrent/issues/410)
  ([886bc13](https://www.github.com/WDaan/VueTorrent/commit/886bc13f10d82b8973d6ea63fa051ae873b8aea2))

### Improvements

- add all-time stats [#351](https://www.github.com/WDaan/VueTorrent/issues/351) ([a268e77](https://www.github.com/WDaan/VueTorrent/commit/a268e774def5875354129c06122898bad018d5ed))
- better authenticated check ([#411](https://www.github.com/WDaan/VueTorrent/issues/411))
  ([ce698e3](https://www.github.com/WDaan/VueTorrent/commit/ce698e38a80fb7ba1dee01251451865df75f68d4))
- move notification banner to botton [#389](https://www.github.com/WDaan/VueTorrent/issues/389)
  ([4b90d56](https://www.github.com/WDaan/VueTorrent/commit/4b90d56df5a43bf466acafd3c7bb43a960bffab8))
- topmenu tooltip delay [#399](https://www.github.com/WDaan/VueTorrent/issues/399)
  ([2d5ad9d](https://www.github.com/WDaan/VueTorrent/commit/2d5ad9d44227f2ffd3e180eff9740e82ba0281cb))

## [0.16.0](https://www.github.com/WDaan/VueTorrent/compare/v0.15.4...v0.16.0) (2022-04-16)

### Features

- add support for setting global speed limits ([#406](https://www.github.com/WDaan/VueTorrent/issues/406))
  ([23fee41](https://www.github.com/WDaan/VueTorrent/commit/23fee419fd1561f440f88e4b354ac3745ed813cd))

### [0.15.4](https://www.github.com/WDaan/VueTorrent/compare/v0.15.3...v0.15.4) (2022-04-04)

### Bug Fixes

- low visibility text in dark theme ([#390](https://www.github.com/WDaan/VueTorrent/issues/390))
  ([84750af](https://www.github.com/WDaan/VueTorrent/commit/84750af3d4d584f5fc0fd8f3cbabd1b0ecfa2e9f))
- PWA manifest [#405](https://www.github.com/WDaan/VueTorrent/issues/405) ([94727a1](https://www.github.com/WDaan/VueTorrent/commit/94727a142a1822c533c665d558ad4af6c207d5b9))
- search results not loading until stopped ([#391](https://www.github.com/WDaan/VueTorrent/issues/391))
  ([8b126d8](https://www.github.com/WDaan/VueTorrent/commit/8b126d8df5607f1c31174fec81f86091f4ad47cf))

### Improvements

- add Japanese language support ([#401](https://www.github.com/WDaan/VueTorrent/issues/401))
  ([a178205](https://www.github.com/WDaan/VueTorrent/commit/a1782058c8417e6a8c06acd22ce56418b4fe9419))
- add Spanish Language ([#385](https://www.github.com/WDaan/VueTorrent/issues/385))
  ([d0f7055](https://www.github.com/WDaan/VueTorrent/commit/d0f7055148b6e88bb00c1c8cd58ec1fa123488e9))
- add Vietnamese ([#392](https://www.github.com/WDaan/VueTorrent/issues/392)) ([6019759](https://www.github.com/WDaan/VueTorrent/commit/6019759260d6561af29dbeb1a95497028b2b8b87))

### [0.15.3](https://www.github.com/WDaan/VueTorrent/compare/v0.15.2...v0.15.3) (2022-02-28)

### Bug Fixes

- spelling mistake in README and "qBittorrent" casing ([#368](https://www.github.com/WDaan/VueTorrent/issues/368))
  ([90d6623](https://www.github.com/WDaan/VueTorrent/commit/90d66237115f50828a38edec7b10caf817a55b66))

### [0.15.2](https://www.github.com/WDaan/VueTorrent/compare/v0.15.1...v0.15.2) (2022-01-13)

### Bug Fixes

- Qbittorrent title on tab ([05bcc9e](https://www.github.com/WDaan/VueTorrent/commit/05bcc9e58783e4de49d698cfd25c902fad7776de))

### Improvements

- Chinese translations ([#363](https://www.github.com/WDaan/VueTorrent/issues/363))
  ([6c7372b](https://www.github.com/WDaan/VueTorrent/commit/6c7372b41ef72387c7781e0dcfd51fb046fb7881))

### [0.15.1](https://www.github.com/WDaan/VueTorrent/compare/v0.15.0...v0.15.1) (2022-01-13)

### Bug Fixes

- mention QBittorent [#356](https://www.github.com/WDaan/VueTorrent/issues/356) ([bbc31fb](https://www.github.com/WDaan/VueTorrent/commit/bbc31fb8c5be1cc1189000e53f90ba7886e05ba8))

### Improvements

- add French translations ([#337](https://www.github.com/WDaan/VueTorrent/issues/337))
  ([30d5dc0](https://www.github.com/WDaan/VueTorrent/commit/30d5dc01c4349e0f52c5c58ec8f602ded16e706d))
- add Indonesian ([#361](https://www.github.com/WDaan/VueTorrent/issues/361)) ([908af5b](https://www.github.com/WDaan/VueTorrent/commit/908af5b3faaa07a327665df51f296a977ddef9e6))
- add Portugese ([#350](https://www.github.com/WDaan/VueTorrent/issues/350)) ([abb4c5b](https://www.github.com/WDaan/VueTorrent/commit/abb4c5ba69a779b729d99bb404fd59d25afb8b72))
- more translations ([4f8c697](https://www.github.com/WDaan/VueTorrent/commit/4f8c697757d818eeaf70d1c6970cd1f6000d6497))

## [0.15.0](https://www.github.com/WDaan/VueTorrent/compare/v0.14.0...v0.15.0) (2021-11-27)

### Features

- 1st torrent progress in title [#166](https://www.github.com/WDaan/VueTorrent/issues/166)
  ([5faa248](https://www.github.com/WDaan/VueTorrent/commit/5faa248395e6edd4e892717fcd0ce41ae27efe08))
- add uploaded property ([#145](https://www.github.com/WDaan/VueTorrent/issues/145))
  ([0a58d98](https://www.github.com/WDaan/VueTorrent/commit/0a58d98b9f50affee99f05fb4f93d9b37d38ac76))
- auto install search plugins when none installed ([abc5457](https://www.github.com/WDaan/VueTorrent/commit/abc5457882892ce4840ae0eef7a438e5ea4c7c90))
- auto refresh peers ([dfd10be](https://www.github.com/WDaan/VueTorrent/commit/dfd10beeab4c757ff1ac0c3eecbdc4e740573a75))
- auto releasing ci ([#146](https://www.github.com/WDaan/VueTorrent/issues/146))
  ([d217627](https://www.github.com/WDaan/VueTorrent/commit/d217627d9ad15535bfe67116790a78414c44c673))
- basic limit share ratio [#308](https://www.github.com/WDaan/VueTorrent/issues/308)
  ([2c1fc34](https://www.github.com/WDaan/VueTorrent/commit/2c1fc34ebdc6f096628d23a6072ea1970764b267))
- basic multilang support ([#320](https://www.github.com/WDaan/VueTorrent/issues/320))
  ([a7cc03c](https://www.github.com/WDaan/VueTorrent/commit/a7cc03c3ba60f7dbc2d18fff78a0b5f5c6db4b1a))
- bypass authentication ([#310](https://www.github.com/WDaan/VueTorrent/issues/310))
  ([b069ce4](https://www.github.com/WDaan/VueTorrent/commit/b069ce490e74baf003c9c92cd780c51414702c13))
- checkbox + button with color feedback for TorrentDeleteModal ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- copy name/hash/magnet [#277](https://www.github.com/WDaan/VueTorrent/issues/277)
  ([42afd92](https://www.github.com/WDaan/VueTorrent/commit/42afd921274c0be3fc122a4d5b8d2aeae5fe0c13))
- drawer on right side [#276](https://www.github.com/WDaan/VueTorrent/issues/276)
  ([a18bded](https://www.github.com/WDaan/VueTorrent/commit/a18bded9cb9792b3301008cc717b52053191c8f9))
- fullscreen toggle on torrent info modal (desktop) ([1de9e64](https://www.github.com/WDaan/VueTorrent/commit/1de9e6459657c386332d146352c3ed765f70fa3c))
- improved per-torrent speed limits modal ([#172](https://www.github.com/WDaan/VueTorrent/issues/172))
  ([7bed9ee](https://www.github.com/WDaan/VueTorrent/commit/7bed9eef12321e06bb143d96f02326d967e6f739))
- New Logo ([b2858a4](https://www.github.com/WDaan/VueTorrent/commit/b2858a4f68238867996cfe5e61e0947dae3af022))
- New select mode color ([8f8d3db](https://www.github.com/WDaan/VueTorrent/commit/8f8d3dbb765d950baa9c5e7654a356e2d300ed28))
- open addmodal when dragging a file into the dashboard ([5807db5](https://www.github.com/WDaan/VueTorrent/commit/5807db5e99ac84436261e9d0e2b9a6767d851ba2))
- PWA splash & bar color ([dfbed5c](https://www.github.com/WDaan/VueTorrent/commit/dfbed5cb05c0b6974c09c86c6e82e1478f1100d6))
- remember delete with files preference [#291](https://www.github.com/WDaan/VueTorrent/issues/291)
  ([684bbec](https://www.github.com/WDaan/VueTorrent/commit/684bbecff0f7fe239f0ee05dfb5392b4a6401069))
- remove torrent files with checkbox [#199](https://www.github.com/WDaan/VueTorrent/issues/199)
  ([0eddf64](https://www.github.com/WDaan/VueTorrent/commit/0eddf6458ea3b72ce19282fbcd07e19ff96fd3f8))
- run external program on torrent completion [#258](https://www.github.com/WDaan/VueTorrent/issues/258)
  ([99fa1c4](https://www.github.com/WDaan/VueTorrent/commit/99fa1c419d47516a1e265e753c127fedf370ffec))
- Show connection status at the bottom of Navbar ([#255](https://www.github.com/WDaan/VueTorrent/issues/255))
  ([204d74c](https://www.github.com/WDaan/VueTorrent/commit/204d74c4e84df5404819796e9e5078c01106990a))
- show created by info [#279](https://www.github.com/WDaan/VueTorrent/issues/279)
  ([7a7562e](https://www.github.com/WDaan/VueTorrent/commit/7a7562e54e66aebbf782baefa89b1f17e5119afa))
- Speed cards as pills with icon in first column and speed on top of the unit in second column ([#169](https://www.github.com/WDaan/VueTorrent/issues/169))
  ([354fe4f](https://www.github.com/WDaan/VueTorrent/commit/354fe4f5f870bb48613ef390341c4c1971e2936e))
- torrent detail infinity sign for unlimited speeds ([#173](https://www.github.com/WDaan/VueTorrent/issues/173))
  ([6f9a5d5](https://www.github.com/WDaan/VueTorrent/commit/6f9a5d5fefd9c0a2622ce62588ee717f762b7eee))
- use confirmation modal when deleting from context menu [#191](https://www.github.com/WDaan/VueTorrent/issues/191)
  ([53c548b](https://www.github.com/WDaan/VueTorrent/commit/53c548b502bacc95bab59026b836eb2bb2b785ec))

### Bug Fixes

- 0 speed when no speed data returned ([a7b8ed9](https://www.github.com/WDaan/VueTorrent/commit/a7b8ed9da3dbca8d2f3be0665880d3cda5f5a50b))
- add tracker dialog bug [#187](https://www.github.com/WDaan/VueTorrent/issues/187)
  ([7c7e40d](https://www.github.com/WDaan/VueTorrent/commit/7c7e40d4a5105ce3e0e9422551ad6cd2673da932))
- altspeed value ([aadb3f2](https://www.github.com/WDaan/VueTorrent/commit/aadb3f2171d38d5a94f9ca9847c50137669055b3))
- always fetch full data (more reliable) ([89cf6ba](https://www.github.com/WDaan/VueTorrent/commit/89cf6ba32c7a4b24cd0ea4d358e56e1d859d4665))
- application version getter ([#222](https://www.github.com/WDaan/VueTorrent/issues/222))
  ([6535ac5](https://www.github.com/WDaan/VueTorrent/commit/6535ac56265d3062c877f35fa5e44b9635e26fcd))
- Context menu placement ([ed08c91](https://www.github.com/WDaan/VueTorrent/commit/ed08c914ebde9fba53e8b24f58c0a80918569b26))
- double click opens info [#287](https://www.github.com/WDaan/VueTorrent/issues/287)
  ([c8ffce5](https://www.github.com/WDaan/VueTorrent/commit/c8ffce59b1ebb7b72575f8797d35942bdfe62ef4))
- Establish Service WalkerRules ([#227](https://www.github.com/WDaan/VueTorrent/issues/227))
  ([04971dc](https://www.github.com/WDaan/VueTorrent/commit/04971dcf874c2f952f57c3abef94d8d92337e488))
- Global Speed Title (upload & download were switched) ([#218](https://www.github.com/WDaan/VueTorrent/issues/218))
  ([906f6d5](https://www.github.com/WDaan/VueTorrent/commit/906f6d5f872b848fc7b3c5071c51a9696ce7c734))
- interrupted divider in torrenfinfo [#151](https://www.github.com/WDaan/VueTorrent/issues/151)
  ([d362aef](https://www.github.com/WDaan/VueTorrent/commit/d362aef27574bb6a60c3675eef52655f1a57bebe))
- invisble close button on modal [#314](https://www.github.com/WDaan/VueTorrent/issues/314) [#297](https://www.github.com/WDaan/VueTorrent/issues/297)
  ([8001dc9](https://www.github.com/WDaan/VueTorrent/commit/8001dc91c738e4b9bfa9dd8a6b6b52249e727f5a))
- issue where 'torrent details' modal does not work properly on iOS ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- layout issues + remove vue-perfect-scrollbar + refactor context menu ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- logout [#286](https://www.github.com/WDaan/VueTorrent/issues/286) ([9121230](https://www.github.com/WDaan/VueTorrent/commit/912123098e5fca6193ebb6f66ad06c8442d07861))
- margin when freespace card is disabled ([6be41e3](https://www.github.com/WDaan/VueTorrent/commit/6be41e33cfb0eb365df18e53c396cd4a36d4b8e5))
- mobile search [#156](https://www.github.com/WDaan/VueTorrent/issues/156) - maybe redesign in future
  ([463dabd](https://www.github.com/WDaan/VueTorrent/commit/463dabde00a34c495d238aff4fd82ea65acc9e54))
- mobile search [#156](https://www.github.com/WDaan/VueTorrent/issues/156) - maybe redesign in future
  ([0f62f4d](https://www.github.com/WDaan/VueTorrent/commit/0f62f4df6763e4449b1ceab946092f9b67b06411))
- Persistent add modal ([d517d9f](https://www.github.com/WDaan/VueTorrent/commit/d517d9f3341e59de572118922b43a9e1adb8c9ad))
- push precompiled release in a public folder ([adfc6a0](https://www.github.com/WDaan/VueTorrent/commit/adfc6a00f2e0b2e09f7f4e67a2efc3dc1db50194))
- remove black box on iOS PWA [#180](https://www.github.com/WDaan/VueTorrent/issues/180)
  ([f918ff5](https://www.github.com/WDaan/VueTorrent/commit/f918ff5ee5c0ddd1c288caa261bbd95e40de4d24))
- remove device darkmode because its unreliable [#285](https://www.github.com/WDaan/VueTorrent/issues/285)
  ([e6c0863](https://www.github.com/WDaan/VueTorrent/commit/e6c0863545c4a6a24ecc57158ff61421d17f9070))
- remove gesture feature on tabs (buggy anyway) ([0960962](https://www.github.com/WDaan/VueTorrent/commit/0960962441e424c28c8ad6014a79f733f495b881))
- remove vue-context import ([edcd825](https://www.github.com/WDaan/VueTorrent/commit/edcd825969f6876b1962dc8875be4b9447704820))
- scrollbar ([c460e29](https://www.github.com/WDaan/VueTorrent/commit/c460e29d95eb034266b3ae1006ebb57001f5aa83))
- searchmodal pagination layout ([a9a9aff](https://www.github.com/WDaan/VueTorrent/commit/a9a9aff74f1310df724b0661011c97f798cdfaf6))
- selection list not cleared when closing deletemodal without button press ([80573f4](https://www.github.com/WDaan/VueTorrent/commit/80573f436498def7edae86e161535ef378c538e7))
- Settings>VueTorrent>Dashboard layout & UX ([d93e540](https://www.github.com/WDaan/VueTorrent/commit/d93e540a71c72bb274da14f36ae5fd72404bc65d))
- show torrent comment [#292](https://www.github.com/WDaan/VueTorrent/issues/292)
  ([4c3c2d3](https://www.github.com/WDaan/VueTorrent/commit/4c3c2d36d713c5f5fda2393a4cfc14b68b09244f))
- speedcard value cutoff [#141](https://www.github.com/WDaan/VueTorrent/issues/141)
  ([a81b1ea](https://www.github.com/WDaan/VueTorrent/commit/a81b1ea2e878b7e890b1c01037b54abba514f969))
- Torrent Detail modal with multiple tags shows only one tag selected [#167](https://www.github.com/WDaan/VueTorrent/issues/167)
  ([1973b5d](https://www.github.com/WDaan/VueTorrent/commit/1973b5dc520ed23682b7788a1ace3905d55c36d8))
- torrent done color to similar to seeding [#162](https://www.github.com/WDaan/VueTorrent/issues/162)
  ([bd71906](https://www.github.com/WDaan/VueTorrent/commit/bd7190685fd598d08ced9af9923e7cd3cfe50c5a))
- torrent search on enter [#149](https://www.github.com/WDaan/VueTorrent/issues/149)
  ([51fbec1](https://www.github.com/WDaan/VueTorrent/commit/51fbec13240f57dccd0177ee8e435f6aba290540))
- tweak search treshold [#250](https://www.github.com/WDaan/VueTorrent/issues/250)
  ([bdbc87b](https://www.github.com/WDaan/VueTorrent/commit/bdbc87b72423891a04a9c8c7a5de69e1d4ccd755))
- Update registerServiceWorker.js (delete all cache on when new version is released)
  ([d846c92](https://www.github.com/WDaan/VueTorrent/commit/d846c924937c99746cbf5a102b0de8ed27381a5d))
- wrong tempPathEnabled state [#284](https://www.github.com/WDaan/VueTorrent/issues/284)
  ([d8e2610](https://www.github.com/WDaan/VueTorrent/commit/d8e26104196120fdbb3475b36f4976c3619ba464))

### Improvements

- 'Vue2-perfect-scrollbar' is no longer dependent ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- better share limit modal ([#316](https://www.github.com/WDaan/VueTorrent/issues/316))
  ([9f2ca42](https://www.github.com/WDaan/VueTorrent/commit/9f2ca4230da46431965d6ed0777f465554926494))
- Context (right click) menu refactor! Works way better on mobile ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- more chinese translations ([65943ae](https://www.github.com/WDaan/VueTorrent/commit/65943aea02b1a349719a704492f2905b1f8f2f81))
- only update changed data + code cleanup ([664e4db](https://www.github.com/WDaan/VueTorrent/commit/664e4dbe2ff9bf04a2ef766fe2726d5f994b1228))
- Remove redundant dialog code, use Modal Mixin ([33cf62f](https://www.github.com/WDaan/VueTorrent/commit/33cf62ff9b6ea671dc1022e345a65705bd814640))
- softer red color [#155](https://www.github.com/WDaan/VueTorrent/issues/155) ([cbf845a](https://www.github.com/WDaan/VueTorrent/commit/cbf845a8a407895e8d6093c584ea96497c45cac0))

## [0.13.0](https://www.github.com/WDaan/VueTorrent/compare/v0.12.0...v0.13.0) (2021-11-01)

### Features

- basic limit share ratio [#308](https://www.github.com/WDaan/VueTorrent/issues/308)
  ([2c1fc34](https://www.github.com/WDaan/VueTorrent/commit/2c1fc34ebdc6f096628d23a6072ea1970764b267))
- bypass authentication ([#310](https://www.github.com/WDaan/VueTorrent/issues/310))
  ([b069ce4](https://www.github.com/WDaan/VueTorrent/commit/b069ce490e74baf003c9c92cd780c51414702c13))

## [0.12.0](https://www.github.com/WDaan/VueTorrent/compare/v0.11.0...v0.12.0) (2021-08-29)

### Features

- remember delete with files preference [#291](https://www.github.com/WDaan/VueTorrent/issues/291)
  ([684bbec](https://www.github.com/WDaan/VueTorrent/commit/684bbecff0f7fe239f0ee05dfb5392b4a6401069))

### Bug Fixes

- double click opens info [#287](https://www.github.com/WDaan/VueTorrent/issues/287)
  ([c8ffce5](https://www.github.com/WDaan/VueTorrent/commit/c8ffce59b1ebb7b72575f8797d35942bdfe62ef4))
- logout [#286](https://www.github.com/WDaan/VueTorrent/issues/286) ([9121230](https://www.github.com/WDaan/VueTorrent/commit/912123098e5fca6193ebb6f66ad06c8442d07861))
- remove device darkmode because its unreliable [#285](https://www.github.com/WDaan/VueTorrent/issues/285)
  ([e6c0863](https://www.github.com/WDaan/VueTorrent/commit/e6c0863545c4a6a24ecc57158ff61421d17f9070))
- show torrent comment [#292](https://www.github.com/WDaan/VueTorrent/issues/292)
  ([4c3c2d3](https://www.github.com/WDaan/VueTorrent/commit/4c3c2d36d713c5f5fda2393a4cfc14b68b09244f))
- wrong tempPathEnabled state [#284](https://www.github.com/WDaan/VueTorrent/issues/284)
  ([d8e2610](https://www.github.com/WDaan/VueTorrent/commit/d8e26104196120fdbb3475b36f4976c3619ba464))

## [0.11.0](https://www.github.com/WDaan/VueTorrent/compare/v0.10.0...v0.11.0) (2021-08-14)

### Features

- copy name/hash/magnet [#277](https://www.github.com/WDaan/VueTorrent/issues/277)
  ([42afd92](https://www.github.com/WDaan/VueTorrent/commit/42afd921274c0be3fc122a4d5b8d2aeae5fe0c13))
- drawer on right side [#276](https://www.github.com/WDaan/VueTorrent/issues/276)
  ([a18bded](https://www.github.com/WDaan/VueTorrent/commit/a18bded9cb9792b3301008cc717b52053191c8f9))
- Show connection status at the bottom of Navbar ([#255](https://www.github.com/WDaan/VueTorrent/issues/255))
  ([204d74c](https://www.github.com/WDaan/VueTorrent/commit/204d74c4e84df5404819796e9e5078c01106990a))
- show created by info [#279](https://www.github.com/WDaan/VueTorrent/issues/279)
  ([7a7562e](https://www.github.com/WDaan/VueTorrent/commit/7a7562e54e66aebbf782baefa89b1f17e5119afa))

### Bug Fixes

- Persistent add modal ([d517d9f](https://www.github.com/WDaan/VueTorrent/commit/d517d9f3341e59de572118922b43a9e1adb8c9ad))

## [0.10.0](https://www.github.com/WDaan/VueTorrent/compare/v0.9.0...v0.10.0) (2021-05-02)

### Features

- New select mode color ([8f8d3db](https://www.github.com/WDaan/VueTorrent/commit/8f8d3dbb765d950baa9c5e7654a356e2d300ed28))
- open addmodal when dragging a file into the dashboard ([5807db5](https://www.github.com/WDaan/VueTorrent/commit/5807db5e99ac84436261e9d0e2b9a6767d851ba2))

### Bug Fixes

- application version getter ([#222](https://www.github.com/WDaan/VueTorrent/issues/222))
  ([6535ac5](https://www.github.com/WDaan/VueTorrent/commit/6535ac56265d3062c877f35fa5e44b9635e26fcd))
- Context menu placement ([ed08c91](https://www.github.com/WDaan/VueTorrent/commit/ed08c914ebde9fba53e8b24f58c0a80918569b26))
- Establish Service WalkerRules ([#227](https://www.github.com/WDaan/VueTorrent/issues/227))
  ([04971dc](https://www.github.com/WDaan/VueTorrent/commit/04971dcf874c2f952f57c3abef94d8d92337e488))
- Global Speed Title (upload & download were switched) ([#218](https://www.github.com/WDaan/VueTorrent/issues/218))
  ([906f6d5](https://www.github.com/WDaan/VueTorrent/commit/906f6d5f872b848fc7b3c5071c51a9696ce7c734))
- remove vue-context import ([edcd825](https://www.github.com/WDaan/VueTorrent/commit/edcd825969f6876b1962dc8875be4b9447704820))
- scrollbar ([c460e29](https://www.github.com/WDaan/VueTorrent/commit/c460e29d95eb034266b3ae1006ebb57001f5aa83))
- tweak search treshold [#250](https://www.github.com/WDaan/VueTorrent/issues/250)
  ([bdbc87b](https://www.github.com/WDaan/VueTorrent/commit/bdbc87b72423891a04a9c8c7a5de69e1d4ccd755))

### Performance Improvements

- Remove redundant dialog code, use Modal Mixin ([33cf62f](https://www.github.com/WDaan/VueTorrent/commit/33cf62ff9b6ea671dc1022e345a65705bd814640))

## [0.9.0](https://www.github.com/WDaan/VueTorrent/compare/v0.8.0...v0.9.0) (2021-04-15)

### Features

- checkbox + button with color feedback for TorrentDeleteModal ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- New Logo ([b2858a4](https://www.github.com/WDaan/VueTorrent/commit/b2858a4f68238867996cfe5e61e0947dae3af022))
- remove torrent files with checkbox [#199](https://www.github.com/WDaan/VueTorrent/issues/199)
  ([0eddf64](https://www.github.com/WDaan/VueTorrent/commit/0eddf6458ea3b72ce19282fbcd07e19ff96fd3f8))

### Bug Fixes

- altspeed value ([aadb3f2](https://www.github.com/WDaan/VueTorrent/commit/aadb3f2171d38d5a94f9ca9847c50137669055b3))
- issue where 'torrent details' modal does not work properly on iOS ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- layout issues + remove vue-perfect-scrollbar + refactor context menu ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- selection list not cleared when closing deletemodal without button press ([80573f4](https://www.github.com/WDaan/VueTorrent/commit/80573f436498def7edae86e161535ef378c538e7))

### Performance Improvements

- 'Vue2-perfect-scrollbar' is no longer dependent ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
- Context (right click) menu refactor! Works way better on mobile ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))

## [0.8.0](https://www.github.com/WDaan/VueTorrent/compare/v0.7.0...v0.8.0) (2021-04-06)

### Features

- auto install search plugins when none installed ([abc5457](https://www.github.com/WDaan/VueTorrent/commit/abc5457882892ce4840ae0eef7a438e5ea4c7c90))
- auto refresh peers ([dfd10be](https://www.github.com/WDaan/VueTorrent/commit/dfd10beeab4c757ff1ac0c3eecbdc4e740573a75))
- fullscreen toggle on torrent info modal (desktop) ([1de9e64](https://www.github.com/WDaan/VueTorrent/commit/1de9e6459657c386332d146352c3ed765f70fa3c))
- PWA splash & bar color ([dfbed5c](https://www.github.com/WDaan/VueTorrent/commit/dfbed5cb05c0b6974c09c86c6e82e1478f1100d6))
- use confirmation modal when deleting from context menu [#191](https://www.github.com/WDaan/VueTorrent/issues/191)
  ([53c548b](https://www.github.com/WDaan/VueTorrent/commit/53c548b502bacc95bab59026b836eb2bb2b785ec))

### Bug Fixes

- 0 speed when no speed data returned ([a7b8ed9](https://www.github.com/WDaan/VueTorrent/commit/a7b8ed9da3dbca8d2f3be0665880d3cda5f5a50b))
- add tracker dialog bug [#187](https://www.github.com/WDaan/VueTorrent/issues/187)
  ([7c7e40d](https://www.github.com/WDaan/VueTorrent/commit/7c7e40d4a5105ce3e0e9422551ad6cd2673da932))
- always fetch full data (more reliable) ([89cf6ba](https://www.github.com/WDaan/VueTorrent/commit/89cf6ba32c7a4b24cd0ea4d358e56e1d859d4665))
- remove gesture feature on tabs (buggy anyway) ([0960962](https://www.github.com/WDaan/VueTorrent/commit/0960962441e424c28c8ad6014a79f733f495b881))
- Settings>VueTorrent>Dashboard layout & UX ([d93e540](https://www.github.com/WDaan/VueTorrent/commit/d93e540a71c72bb274da14f36ae5fd72404bc65d))
- Update registerServiceWorker.js (delete all cache on when new version is released)
  ([d846c92](https://www.github.com/WDaan/VueTorrent/commit/d846c924937c99746cbf5a102b0de8ed27381a5d))

### Performance Improvements

- only update changed data + code cleanup ([664e4db](https://www.github.com/WDaan/VueTorrent/commit/664e4dbe2ff9bf04a2ef766fe2726d5f994b1228))

## [0.7.0](https://www.github.com/WDaan/VueTorrent/compare/v0.6.0...v0.7.0) (2021-03-25)

### Features

- 1st torrent progress in title [#166](https://www.github.com/WDaan/VueTorrent/issues/166)
  ([5faa248](https://www.github.com/WDaan/VueTorrent/commit/5faa248395e6edd4e892717fcd0ce41ae27efe08))
- global pause/resume [#158](https://www.github.com/WDaan/VueTorrent/issues/158)
  ([28cdd0f](https://www.github.com/WDaan/VueTorrent/commit/28cdd0ff735f797d94c7b216990560c22030d101))
- improved per-torrent speed limits modal ([#172](https://www.github.com/WDaan/VueTorrent/issues/172))
  ([7bed9ee](https://www.github.com/WDaan/VueTorrent/commit/7bed9eef12321e06bb143d96f02326d967e6f739))
- select all toggle [#161](https://www.github.com/WDaan/VueTorrent/issues/161) ([d3a5ac8](https://www.github.com/WDaan/VueTorrent/commit/d3a5ac8f978177e3cb69261c01e279e9615da2f4))
- Speed cards as pills with icon in first column and speed on top of the unit in second column ([#169](https://www.github.com/WDaan/VueTorrent/issues/169))
  ([354fe4f](https://www.github.com/WDaan/VueTorrent/commit/354fe4f5f870bb48613ef390341c4c1971e2936e))
- torrent detail infinity sign for unlimited speeds ([#173](https://www.github.com/WDaan/VueTorrent/issues/173))
  ([6f9a5d5](https://www.github.com/WDaan/VueTorrent/commit/6f9a5d5fefd9c0a2622ce62588ee717f762b7eee))

### Bug Fixes

- push precompiled release in a public folder ([adfc6a0](https://www.github.com/WDaan/VueTorrent/commit/adfc6a00f2e0b2e09f7f4e67a2efc3dc1db50194))
- remove black box on iOS PWA [#180](https://www.github.com/WDaan/VueTorrent/issues/180)
  ([f918ff5](https://www.github.com/WDaan/VueTorrent/commit/f918ff5ee5c0ddd1c288caa261bbd95e40de4d24))
- searchmodal pagination layout ([a9a9aff](https://www.github.com/WDaan/VueTorrent/commit/a9a9aff74f1310df724b0661011c97f798cdfaf6))
- Torrent Detail modal with multiple tags shows only one tag selected [#167](https://www.github.com/WDaan/VueTorrent/issues/167)
  ([1973b5d](https://www.github.com/WDaan/VueTorrent/commit/1973b5dc520ed23682b7788a1ace3905d55c36d8))
- torrent done color to similar to seeding [#162](https://www.github.com/WDaan/VueTorrent/issues/162)
  ([bd71906](https://www.github.com/WDaan/VueTorrent/commit/bd7190685fd598d08ced9af9923e7cd3cfe50c5a))

## [0.6.0](https://www.github.com/WDaan/VueTorrent/compare/0.5.6...v0.6.0) (2021-02-17)

### Features

- add uploaded property ([#145](https://www.github.com/WDaan/VueTorrent/issues/145))
  ([0a58d98](https://www.github.com/WDaan/VueTorrent/commit/0a58d98b9f50affee99f05fb4f93d9b37d38ac76))
- auto releasing ci ([#146](https://www.github.com/WDaan/VueTorrent/issues/146))
  ([d217627](https://www.github.com/WDaan/VueTorrent/commit/d217627d9ad15535bfe67116790a78414c44c673))

### Bug Fixes

- interrupted divider in torrenfinfo [#151](https://www.github.com/WDaan/VueTorrent/issues/151)
  ([d362aef](https://www.github.com/WDaan/VueTorrent/commit/d362aef27574bb6a60c3675eef52655f1a57bebe))
- margin when freespace card is disabled ([6be41e3](https://www.github.com/WDaan/VueTorrent/commit/6be41e33cfb0eb365df18e53c396cd4a36d4b8e5))
- mobile search [#156](https://www.github.com/WDaan/VueTorrent/issues/156) - maybe redesign in future
  ([463dabd](https://www.github.com/WDaan/VueTorrent/commit/463dabde00a34c495d238aff4fd82ea65acc9e54))
- mobile search [#156](https://www.github.com/WDaan/VueTorrent/issues/156) - maybe redesign in future
  ([0f62f4d](https://www.github.com/WDaan/VueTorrent/commit/0f62f4df6763e4449b1ceab946092f9b67b06411))
- speedcard value cutoff [#141](https://www.github.com/WDaan/VueTorrent/issues/141)
  ([a81b1ea](https://www.github.com/WDaan/VueTorrent/commit/a81b1ea2e878b7e890b1c01037b54abba514f969))
- torrent search on enter [#149](https://www.github.com/WDaan/VueTorrent/issues/149)
  ([51fbec1](https://www.github.com/WDaan/VueTorrent/commit/51fbec13240f57dccd0177ee8e435f6aba290540))

### Performance Improvements

- softer red color [#155](https://www.github.com/WDaan/VueTorrent/issues/155) ([cbf845a](https://www.github.com/WDaan/VueTorrent/commit/cbf845a8a407895e8d6093c584ea96497c45cac0))
