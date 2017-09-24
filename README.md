# WebExtension history browser

A simple firefox plugin that helps you browse your history because firefox default history browser doesn't let you filter or sort based on dates as of September 2017 and other extensions that can do it aren't compatible with Firefox anymore.

## How to build it

```bash
npm install
npm run build
```

The WebExtension in the [addon](addon/) folder should now work.

## Live-development
As well as watching the folder with your `manifest.json` in it, you will also
have to run webpack in watch mode. You can use the
[webpack-webext-plugin](https://github.com/rpl/webpack-webext-plugin) to simplify the workflow.

## License

[MIT](LICENSE.md) © [Gabriel Le Breton](https://gableroux.com)