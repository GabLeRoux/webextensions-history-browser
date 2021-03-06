# WebExtensions History Browser 

[![Build Status](https://travis-ci.org/GabLeRoux/webextensions-history-browser.svg?branch=master)](https://travis-ci.org/GabLeRoux/webextensions-history-browser)

![webextensions-history-browser-readme](resources/webextensions-history-browser-readme.png)

**Simple browser extension that helps you browse history like a boss.**

**[Download Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/webextensions-history-browser/)** :v:

Firefox's default history sidebar is limited and the history browsing popup would benefit from some more features. It doesn't let you filter easily by date range as of September 2017. Other extensions that can do it aren't compatible with  **Firefox 57+** anymore, only work in firefox and/or aren't open source. This extension tries to solve all of these :rocket:

## Preview

![WebExtensions History Browser preview](resources/webextensions-history-browser-screenshot.png)

## Key features

- [x] Search through **all** history
- [x] Search in date column
- [x] Sort columns
- [x] Resize columns
- [x] Reorder columns
- [x] Firefox and Chrome support

## TODO

Feel free to send merge requests if you'd like to try and solve some of these :v:

- [ ] Add tests 
- [ ] **Add a datetime picker range to filter by dates (library already installed)**
- [ ] Add a setting for the date format for `Last visit time` column (See [#3](https://github.com/GabLeRoux/webextensions-history-browser/issues/3))
- [ ] Convert icon to svg (it's already a vector based icon in `resources`)
- [ ] Improve title search by using `browser.history` query
- [ ] [Export table data](https://datatables.net/reference/button/excel)
- [ ] Test on *Microsoft Edge*
- [ ] Use a changelog system
- [ ] Deploy the Chrome extension

## Done

- [x] Have webpack watch for `manifest.json` and use the [webpack-webext-plugin](https://github.com/rpl/webpack-webext-plugin) to simplify the workflow. Edit: I used [samuelsimoes/chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate) and adapted webpack plugin to my needs
- [x] Test on other browsers such as *Google Chrome*
- [x] Allow resizing columns, maybe use something like [jeffreydwalter/ColReorderWithResize](https://github.com/jeffreydwalter/ColReorderWithResize) ([see it in action](https://www.gyrocode.com/articles/jquery-datatables-column-reordering-and-resizing/)) (See [#7](https://github.com/GabLeRoux/webextensions-history-browser/issues/7))
- [x] Release on the firefox addons page (See [#2](https://github.com/GabLeRoux/webextensions-history-browser/issues/2))
- [x] Load all libraries from webpack with `require` instead of html tags
- [x] Format `Last visit time` column
- [x] Display history in a table
- [x] Sort history by date
- [x] Display number of visits per page
- [x] Add page title search
- [x] Create a logo
- [x] Install [bootstrap-daterangepicker](http://www.daterangepicker.com/)
- [x] Setup [datatables](https://datatables.net/) for minimal out of the box filtering and column sorting
- [x] Add some dark style using [bootswatch's slate bootstrap theme](https://bootswatch.com/slate/)
- [x] Create a basic table layout

## How to build it

```bash
npm install
NODE_ENV=production npm run build
```

The WebExtension in the [addon](addon/) folder should now work.

## Live-development

```bash
NODE_ENV=development npm run start
```

## Release

This will need some improvements, but here are personal notes I took:

```bash
npm i
npm version patch
# todo: update addon/manifest.json automatically based on package.json, for now, update the file manually
NODE_ENV=production npm run build
git push --tags
cd build
zip -r webextensions-history-browser.zip ./*
```

Visit https://addons.mozilla.org/en-US/developers/addon/webextensions-history-browser/versions/submit/

## Contributions and Feature Requests

Sure can do! PRs are welcome :v:. Feel free to [open issues](https://github.com/GabLeRoux/webextensions-history-browser/issues).

## License

[MIT](LICENSE.md) © [Gabriel Le Breton](https://gableroux.com)
