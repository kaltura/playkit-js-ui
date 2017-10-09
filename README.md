# PlayKit JS UI - UI Application framework for the [PlayKit JS Player]

[![Build Status](https://travis-ci.com/kaltura/playkit-js-ui.svg?token=s2ZQw18ukx9Q6ePzDX3F&branch=master)](https://travis-ci.com/kaltura/playkit-js-ui)

PlayKit JS UI is a UI Application Framework for composing PlayKit JS Player UI.

The application uses [Preact] to manage virtual DOM and provide a declarative way for building UI and [Redux] to manage a predictable state container.

PlayKit JS UI is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[Flow]: https://flow.org/
[ECMAScript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[Babel]: https://babeljs.io

## Getting Started

### Prerequisites
The UI Manager expects a player that implements the [PlayKit JS Player] interface.

The UI Manager depends on [Preact] and [Redux].

[Playkit JS Player]: https://github.com/kaltura/playkit-js
[Preact]: https://preactjs.com/
[Redux]: http://redux.js.org/

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

### Embed the player in your test page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<script type="text/javascript" src="/PATH/TO/FILE/playkit.js"></script>
<script type="text/javascript" src="/PATH/TO/FILE/playkit-ui.js"></script>
<div id="videoContainer" style="height:360px;width:640px">
<script type="text/javascript">
var config = {...};
var player = Playkit.loadPlayer("videoContainer", config);
var uiManager = new PlaykitJsUi(player, {targetId: "videoContainer"});
uiManager.buildDefaultUI();
player.play();
</script>
```

## Extending the UI

For additional info and guides on how to extend the UI see the [docs](https://github.com/kaltura/playkit-js-ui/tree/master/docs)

## Running the tests

Tests can be run localy via [Karma], which will run on Chrome, Firefox and Safari

[Karma]: https://karma-runner.github.io/1.0/index.html
```
yarn run test
```

You can test individual browsers:
```
yarn run test:chrome
yarn run test:firefox
yarn run test:safari
```

### And coding style tests

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
