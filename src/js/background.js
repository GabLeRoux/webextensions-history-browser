async function load_history(query) {
    browser.runtime.sendMessage({msg: "clear-history-browser-table"});

    var browserHistory = Components.classes["@mozilla.org/browser/nav-history-service;1"]
        .getService(Components.interfaces.nsIBrowserHistory);

    console.log(browserHistory);
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({"url": "/history.html"});
});