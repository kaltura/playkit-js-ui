# PlayKit JS UI - UI Application Framework for the [PlayKit JS Player]

[![Build Status](https://travis-ci.org/kaltura/playkit-js-ui.svg?branch=master)](https://travis-ci.org/kaltura/playkit-js-ui)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-ui/latest.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-ui)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-ui/canary.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-ui/v/canary)

PlayKit JS UI is a UI Application Framework for composing PlayKit JS Player UI.

The application uses [Preact] to manage virtual DOM and provide a declarative way for building UI and [Redux] to manage a predictable state container.

The PlayKit JS UI framework enables an easy and intuitive way of customize the UI to any purpose and design, either by simple CSS definitions or by letting application define it's entire layout.

The UI framework exposes a UIManager that handles the life cycle of the UI, and and a library of components which is used to build the UI layout, where each component is responsible of a specific functionality.

Components library contains any need of the UI, but can be extended to include any additional component an application will require.

The library also exposes its default presets, which can be used as-is&trade; or extended.

PlayKit JS UI is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[flow]: https://flow.org/
[ecmascript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[babel]: https://babeljs.io

## Table of Contents

* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installing](#installing)
  * [Building](#building)
  * [Embed the Player In Your Test Page](#embed-the-player-in-your-test-page)
* [Documentation](#documentation)
* [Running the Tests](#running-the-tests)
* [Compatibility](#compatibility)
* [Contributing](#contributing)
* [Versioning](#versioning)
* [License](#license)

## Getting Started

### Prerequisites

The UI Manager expects a player that implements the [PlayKit JS Player] interface.

The UI Manager depends on [Preact] and [Redux].

[playkit js player]: https://github.com/kaltura/playkit-js
[preact]: https://preactjs.com/
[redux]: http://redux.js.org/

### Installing

First, clone and run [yarn] to install dependencies:

[yarn]: https://yarnpkg.com/lang/en/

```
git clone https://github.com/kaltura/playkit-js-ui.git
cd playkit-js-ui
yarn install
```

### Building

Then, build the player

```javascript
yarn run build
```

### Embed the Player In Your Test Page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<script type="text/javascript" src="/PATH/TO/FILE/playkit.js"></script>
<script type="text/javascript" src="/PATH/TO/FILE/playkit-ui.js"></script>
<div id="player-placeholder" style="height:360px;width:640px">
<script type="text/javascript">
var playerConfig = {...};
var uiConfig = {targetId: "player-placeholder"};
var player = playkit.core.loadPlayer(playerConfig);
var uiManager = new playkit.ui.UIManager(player, uiConfig);
uiManager.buildDefaultUI();
player.play();
</script>
```

## Documentation

* **[Configuration](docs/configuration.md)**
* **API**
* **[Events](docs/events.md)**
* **[UI Customization](docs/ui-customization.md)**
* **[Components](docs/components.md)**

## Running the Tests

Tests can be run locally via [Karma], which will run on Chrome, Firefox and Safari.

[karma]: https://karma-runner.github.io/1.0/index.html

```
yarn run test
```

You can test individual browsers:

```
yarn run test:chrome
yarn run test:firefox
yarn run test:safari
```

### And Coding Style Tests

We use ESLint [recommended set](http://eslint.org/docs/rules/) with some additions for enforcing [Flow] types and other rules.

See [ESLint config](.eslintrc.json) for full configuration.

We also use [.editorconfig](.editorconfig) to maintain consistent coding styles and settings, please make sure you comply with the styling.

## Compatibility

TBD

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kaltura/playkit-js-ui/tags).

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
