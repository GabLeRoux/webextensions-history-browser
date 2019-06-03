var browser = require("webextension-polyfill");

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({"url": "/history.html"});
});
