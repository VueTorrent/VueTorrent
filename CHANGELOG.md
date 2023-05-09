# Changelog

## [1.5.7](https://github.com/WDaan/VueTorrent/compare/v1.5.6...v1.5.7) (2023-05-09)


### Bug Fixes

* prevent mark all to send useless requests between single mark ([#799](https://github.com/WDaan/VueTorrent/issues/799)) ([2fdeb63](https://github.com/WDaan/VueTorrent/commit/2fdeb63c83eee6bbcdcc0bc639a4d3d303f10e20))


### Improvements

* Add Escape / Enter keybinds to RSS modals ([#797](https://github.com/WDaan/VueTorrent/issues/797)) ([b276004](https://github.com/WDaan/VueTorrent/commit/b276004b2875391cf648247abbec026b71b598b5))
* Add mark all as read button in RssArticles view ([#798](https://github.com/WDaan/VueTorrent/issues/798)) ([93d3fdc](https://github.com/WDaan/VueTorrent/commit/93d3fdc85ae714ffe55a3fbf6c2330c2b6c4c89d))
* Add Monitored folders ([#802](https://github.com/WDaan/VueTorrent/issues/802)) ([0deb6f8](https://github.com/WDaan/VueTorrent/commit/0deb6f8e47e3fcd4b4d2a1b0cf0aa560ab219493))
* Add sum of selected torrents' size to selectedTorrentCountString ([#803](https://github.com/WDaan/VueTorrent/issues/803)) ([cf66103](https://github.com/WDaan/VueTorrent/commit/cf66103aca48ae80822e92f573b26df19d54c0a0))
* include all settings ([#793](https://github.com/WDaan/VueTorrent/issues/793)) ([3e7f351](https://github.com/WDaan/VueTorrent/commit/3e7f35107b1b70aef0e0fb13f9d5c322154e87d2))
* limit updateMainData to one request at once ([#800](https://github.com/WDaan/VueTorrent/issues/800)) ([30bedda](https://github.com/WDaan/VueTorrent/commit/30beddaab425348d020e762bab49b3399f86b9be))
* Register magnet handler ([#784](https://github.com/WDaan/VueTorrent/issues/784)) ([82310c8](https://github.com/WDaan/VueTorrent/commit/82310c843d270e203705fa6ed8d98f355ffdb2e9))
* Show autorun command tooltip when either checkbox is checked ([#789](https://github.com/WDaan/VueTorrent/issues/789)) ([d1ffa2b](https://github.com/WDaan/VueTorrent/commit/d1ffa2b143c87d9875c4c05b2c97c37705b68ca5))

## [1.5.6](https://github.com/WDaan/VueTorrent/compare/v1.5.5...v1.5.6) (2023-04-27)


### Bug Fixes

* Remove unneeded classes to prevent unexpected color background in MobileCard ([#782](https://github.com/WDaan/VueTorrent/issues/782)) ([6745c91](https://github.com/WDaan/VueTorrent/commit/6745c91a3ca20476bdc97127d506d182bb899560))

## [1.5.5](https://github.com/WDaan/VueTorrent/compare/v1.5.4...v1.5.5) (2023-04-25)


### Bug Fixes

* Chinese word order problem ([#765](https://github.com/WDaan/VueTorrent/issues/765)) ([f1bb9b7](https://github.com/WDaan/VueTorrent/commit/f1bb9b7b354ab2ba47f5d0180dfe3d4a8f824e43))


### Improvements

* Add Refresh All button for RSS feeds ([#775](https://github.com/WDaan/VueTorrent/issues/775)) ([3e1d5fb](https://github.com/WDaan/VueTorrent/commit/3e1d5fb76598ee7a432a56ea8b073a2bfe7dcba7))
* all-time ratio card ([#777](https://github.com/WDaan/VueTorrent/issues/777)) ([f970564](https://github.com/WDaan/VueTorrent/commit/f970564bf90aa82b553eb0e92911d3100b2e6150))

## [1.5.4](https://github.com/WDaan/VueTorrent/compare/v1.5.3...v1.5.4) (2023-04-02)


### Improvements

* Add missing torrent properties to TorrentDetail &gt; Info ([#744](https://github.com/WDaan/VueTorrent/issues/744)) ([ecd8a4e](https://github.com/WDaan/VueTorrent/commit/ecd8a4e608d687c80209ee6d5b6dad6a26bb943c))
* Prevent storing dashboard items label in store ([#748](https://github.com/WDaan/VueTorrent/issues/748)) ([237de79](https://github.com/WDaan/VueTorrent/commit/237de79e3392ac12f2f84e21c30a89c036413118))

## [1.5.3](https://github.com/WDaan/VueTorrent/compare/v1.5.2...v1.5.3) (2023-03-27)


### Bug Fixes

* capitalization [#740](https://github.com/WDaan/VueTorrent/issues/740) ([54b4f57](https://github.com/WDaan/VueTorrent/commit/54b4f578d1b3c0491d16024e6d377090d520cac5))


### Improvements

* complete RSS rule settings ([#731](https://github.com/WDaan/VueTorrent/issues/731)) @Larsluph ([3690170](https://github.com/WDaan/VueTorrent/commit/36901701c31ada48196b7258381fdf8725abda55))
* improve format when using timestamp 0 on SeenComplete ([#737](https://github.com/WDaan/VueTorrent/issues/737)) ([3d5f6c8](https://github.com/WDaan/VueTorrent/commit/3d5f6c86dfc48ea76223685634e641d086f7c50b))
* Sort folders before files ([#730](https://github.com/WDaan/VueTorrent/issues/730)) ([521c6e6](https://github.com/WDaan/VueTorrent/commit/521c6e6c7f0aaacd80c764f056498ad3bf53dc1a))

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
