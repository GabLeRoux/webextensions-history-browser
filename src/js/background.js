async function load_history(query) {
    // todo: use `query` for filtering (ex; date range, title, etc.)

    browser.runtime.sendMessage({msg: "history-browser-clear-table"});

    var browserHistory = Components.classes["@mozilla.org/browser/nav-history-service;1"]
        .getService(Components.interfaces.nsIBrowserHistory);

    console.log(browserHistory);

    browser.runtime.sendMessage({msg: "history-browser-found-results"});
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({"url": "/history.html"});
});