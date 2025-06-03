var browser = require("webextension-polyfill");

browser.action.onClicked.addListener(() => {
    browser.tabs.create({url: "/history.html"});
});
