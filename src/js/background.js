browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({"url": "/history.html"});
});