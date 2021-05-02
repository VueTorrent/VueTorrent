# Changelog

## [0.10.0](https://www.github.com/WDaan/VueTorrent/compare/v0.9.0...v0.10.0) (2021-05-02)


### Features

* New select mode color ([8f8d3db](https://www.github.com/WDaan/VueTorrent/commit/8f8d3dbb765d950baa9c5e7654a356e2d300ed28))
* open addmodal when dragging a file into the dashboard ([5807db5](https://www.github.com/WDaan/VueTorrent/commit/5807db5e99ac84436261e9d0e2b9a6767d851ba2))


### Bug Fixes

* application version getter ([#222](https://www.github.com/WDaan/VueTorrent/issues/222)) ([6535ac5](https://www.github.com/WDaan/VueTorrent/commit/6535ac56265d3062c877f35fa5e44b9635e26fcd))
* Context menu placement ([ed08c91](https://www.github.com/WDaan/VueTorrent/commit/ed08c914ebde9fba53e8b24f58c0a80918569b26))
* Establish Service WalkerRules ([#227](https://www.github.com/WDaan/VueTorrent/issues/227)) ([04971dc](https://www.github.com/WDaan/VueTorrent/commit/04971dcf874c2f952f57c3abef94d8d92337e488))
* Global Speed Title (upload & download were switched) ([#218](https://www.github.com/WDaan/VueTorrent/issues/218)) ([906f6d5](https://www.github.com/WDaan/VueTorrent/commit/906f6d5f872b848fc7b3c5071c51a9696ce7c734))
* remove vue-context import ([edcd825](https://www.github.com/WDaan/VueTorrent/commit/edcd825969f6876b1962dc8875be4b9447704820))
* scrollbar ([c460e29](https://www.github.com/WDaan/VueTorrent/commit/c460e29d95eb034266b3ae1006ebb57001f5aa83))
* tweak search treshold [#250](https://www.github.com/WDaan/VueTorrent/issues/250) ([bdbc87b](https://www.github.com/WDaan/VueTorrent/commit/bdbc87b72423891a04a9c8c7a5de69e1d4ccd755))


### Performance Improvements

* Remove redundant dialog code, use Modal Mixin ([33cf62f](https://www.github.com/WDaan/VueTorrent/commit/33cf62ff9b6ea671dc1022e345a65705bd814640))

## [0.9.0](https://www.github.com/WDaan/VueTorrent/compare/v0.8.0...v0.9.0) (2021-04-15)


### Features

* checkbox + button with color feedback for TorrentDeleteModal ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
* New Logo ([b2858a4](https://www.github.com/WDaan/VueTorrent/commit/b2858a4f68238867996cfe5e61e0947dae3af022))
* remove torrent files with checkbox [#199](https://www.github.com/WDaan/VueTorrent/issues/199) ([0eddf64](https://www.github.com/WDaan/VueTorrent/commit/0eddf6458ea3b72ce19282fbcd07e19ff96fd3f8))


### Bug Fixes

* altspeed value ([aadb3f2](https://www.github.com/WDaan/VueTorrent/commit/aadb3f2171d38d5a94f9ca9847c50137669055b3))
* issue where 'torrent details' modal does not work properly on iOS ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
* layout issues + remove vue-perfect-scrollbar + refactor context menu ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
* selection list not cleared when closing deletemodal without button press ([80573f4](https://www.github.com/WDaan/VueTorrent/commit/80573f436498def7edae86e161535ef378c538e7))


### Performance Improvements

* 'Vue2-perfect-scrollbar' is no longer dependent ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))
* Context (right click) menu refactor! Works way better on mobile ([a83ea14](https://www.github.com/WDaan/VueTorrent/commit/a83ea144cf1daac09fc76feff5d03347c8ea87ca))

## [0.8.0](https://www.github.com/WDaan/VueTorrent/compare/v0.7.0...v0.8.0) (2021-04-06)


### Features

* auto install search plugins when none installed ([abc5457](https://www.github.com/WDaan/VueTorrent/commit/abc5457882892ce4840ae0eef7a438e5ea4c7c90))
* auto refresh peers ([dfd10be](https://www.github.com/WDaan/VueTorrent/commit/dfd10beeab4c757ff1ac0c3eecbdc4e740573a75))
* fullscreen toggle on torrent info modal (desktop) ([1de9e64](https://www.github.com/WDaan/VueTorrent/commit/1de9e6459657c386332d146352c3ed765f70fa3c))
* PWA splash & bar color ([dfbed5c](https://www.github.com/WDaan/VueTorrent/commit/dfbed5cb05c0b6974c09c86c6e82e1478f1100d6))
* use confirmation modal when deleting from context menu [#191](https://www.github.com/WDaan/VueTorrent/issues/191) ([53c548b](https://www.github.com/WDaan/VueTorrent/commit/53c548b502bacc95bab59026b836eb2bb2b785ec))


### Bug Fixes

* 0 speed when no speed data returned ([a7b8ed9](https://www.github.com/WDaan/VueTorrent/commit/a7b8ed9da3dbca8d2f3be0665880d3cda5f5a50b))
* add tracker dialog bug [#187](https://www.github.com/WDaan/VueTorrent/issues/187) ([7c7e40d](https://www.github.com/WDaan/VueTorrent/commit/7c7e40d4a5105ce3e0e9422551ad6cd2673da932))
* always fetch full data (more reliable) ([89cf6ba](https://www.github.com/WDaan/VueTorrent/commit/89cf6ba32c7a4b24cd0ea4d358e56e1d859d4665))
* remove gesture feature on tabs (buggy anyway) ([0960962](https://www.github.com/WDaan/VueTorrent/commit/0960962441e424c28c8ad6014a79f733f495b881))
* Settings>VueTorrent>Dashboard layout & UX ([d93e540](https://www.github.com/WDaan/VueTorrent/commit/d93e540a71c72bb274da14f36ae5fd72404bc65d))
* Update registerServiceWorker.js (delete all cache on when new version is released) ([d846c92](https://www.github.com/WDaan/VueTorrent/commit/d846c924937c99746cbf5a102b0de8ed27381a5d))


### Performance Improvements

* only update changed data + code cleanup ([664e4db](https://www.github.com/WDaan/VueTorrent/commit/664e4dbe2ff9bf04a2ef766fe2726d5f994b1228))

## [0.7.0](https://www.github.com/WDaan/VueTorrent/compare/v0.6.0...v0.7.0) (2021-03-25)


### Features

* 1st torrent progress in title [#166](https://www.github.com/WDaan/VueTorrent/issues/166) ([5faa248](https://www.github.com/WDaan/VueTorrent/commit/5faa248395e6edd4e892717fcd0ce41ae27efe08))
* global pause/resume [#158](https://www.github.com/WDaan/VueTorrent/issues/158) ([28cdd0f](https://www.github.com/WDaan/VueTorrent/commit/28cdd0ff735f797d94c7b216990560c22030d101))
* improved per-torrent speed limits modal ([#172](https://www.github.com/WDaan/VueTorrent/issues/172)) ([7bed9ee](https://www.github.com/WDaan/VueTorrent/commit/7bed9eef12321e06bb143d96f02326d967e6f739))
* select all toggle [#161](https://www.github.com/WDaan/VueTorrent/issues/161) ([d3a5ac8](https://www.github.com/WDaan/VueTorrent/commit/d3a5ac8f978177e3cb69261c01e279e9615da2f4))
* Speed cards as pills with icon in first column and speed on top of the unit in second column ([#169](https://www.github.com/WDaan/VueTorrent/issues/169)) ([354fe4f](https://www.github.com/WDaan/VueTorrent/commit/354fe4f5f870bb48613ef390341c4c1971e2936e))
* torrent detail infinity sign for unlimited speeds ([#173](https://www.github.com/WDaan/VueTorrent/issues/173)) ([6f9a5d5](https://www.github.com/WDaan/VueTorrent/commit/6f9a5d5fefd9c0a2622ce62588ee717f762b7eee))


### Bug Fixes

* push precompiled release in a public folder ([adfc6a0](https://www.github.com/WDaan/VueTorrent/commit/adfc6a00f2e0b2e09f7f4e67a2efc3dc1db50194))
* remove black box on iOS PWA [#180](https://www.github.com/WDaan/VueTorrent/issues/180) ([f918ff5](https://www.github.com/WDaan/VueTorrent/commit/f918ff5ee5c0ddd1c288caa261bbd95e40de4d24))
* searchmodal pagination layout ([a9a9aff](https://www.github.com/WDaan/VueTorrent/commit/a9a9aff74f1310df724b0661011c97f798cdfaf6))
* Torrent Detail modal with multiple tags shows only one tag selected [#167](https://www.github.com/WDaan/VueTorrent/issues/167) ([1973b5d](https://www.github.com/WDaan/VueTorrent/commit/1973b5dc520ed23682b7788a1ace3905d55c36d8))
* torrent done color to similar to seeding [#162](https://www.github.com/WDaan/VueTorrent/issues/162) ([bd71906](https://www.github.com/WDaan/VueTorrent/commit/bd7190685fd598d08ced9af9923e7cd3cfe50c5a))

## [0.6.0](https://www.github.com/WDaan/VueTorrent/compare/0.5.6...v0.6.0) (2021-02-17)


### Features

* add uploaded property ([#145](https://www.github.com/WDaan/VueTorrent/issues/145)) ([0a58d98](https://www.github.com/WDaan/VueTorrent/commit/0a58d98b9f50affee99f05fb4f93d9b37d38ac76))
* auto releasing ci ([#146](https://www.github.com/WDaan/VueTorrent/issues/146)) ([d217627](https://www.github.com/WDaan/VueTorrent/commit/d217627d9ad15535bfe67116790a78414c44c673))


### Bug Fixes

* interrupted divider in torrenfinfo [#151](https://www.github.com/WDaan/VueTorrent/issues/151) ([d362aef](https://www.github.com/WDaan/VueTorrent/commit/d362aef27574bb6a60c3675eef52655f1a57bebe))
* margin when freespace card is disabled ([6be41e3](https://www.github.com/WDaan/VueTorrent/commit/6be41e33cfb0eb365df18e53c396cd4a36d4b8e5))
* mobile search [#156](https://www.github.com/WDaan/VueTorrent/issues/156) - maybe redesign in future ([463dabd](https://www.github.com/WDaan/VueTorrent/commit/463dabde00a34c495d238aff4fd82ea65acc9e54))
* mobile search [#156](https://www.github.com/WDaan/VueTorrent/issues/156) - maybe redesign in future ([0f62f4d](https://www.github.com/WDaan/VueTorrent/commit/0f62f4df6763e4449b1ceab946092f9b67b06411))
* speedcard value cutoff [#141](https://www.github.com/WDaan/VueTorrent/issues/141) ([a81b1ea](https://www.github.com/WDaan/VueTorrent/commit/a81b1ea2e878b7e890b1c01037b54abba514f969))
* torrent search on enter [#149](https://www.github.com/WDaan/VueTorrent/issues/149) ([51fbec1](https://www.github.com/WDaan/VueTorrent/commit/51fbec13240f57dccd0177ee8e435f6aba290540))


### Performance Improvements

* softer red color [#155](https://www.github.com/WDaan/VueTorrent/issues/155) ([cbf845a](https://www.github.com/WDaan/VueTorrent/commit/cbf845a8a407895e8d6093c584ea96497c45cac0))
