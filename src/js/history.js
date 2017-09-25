let backgroundPage = browser.extension.getBackgroundPage();
let columns = [
    // { title: "id" },
    { title: "url" },
    { title: "title" },
    { title: "Last visit time" },
    { title: "Visit count" },
    // { title: "Type count" }
]

function load_history(callback, query) {
    // Get all of the history
    if (typeof query === 'undefined') {
        query = {
            text: "",
            startTime: 0
        };
    }

    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/history/search
    var searching = browser.history.search(query);
    searching.then(
        callback
    );
}

function build_table(historyItems) {
    var data = [];
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/history/HistoryItem
    //
    //     id
    // string. Unique identifier for the item.
    //     url Optional
    // string. The URL of the page.
    //     title Optional
    // string. The title of the page.
    //     lastVisitTime Optional
    // number. The date and time the page was last loaded, represented in milliseconds since the epoch.
    //     visitCount Optional
    // number. The number of times the user has visited the page.
    //     typedCount Optional
    // number. The number of times the user has navigated to this page by typing in the address.
    //
    // todo: verify browser for typedCount compatibility
    for (historyItem of historyItems) {
        data.push([
            // historyItem.id || "",
            historyItem.url || "",
            historyItem.title || "",
            historyItem.lastVisitTime || "",
            historyItem.visitCount || "",
            // historyItem.typedCount || "",
        ])
    }
    $('#history').DataTable({
        destroy: true,
        data: data,
        columns: columns
    });
}

$(document).ready(function () {
    $('#history').DataTable({
        columns: columns
    });
    load_history(build_table);
    $('#refresh-list').click(function (e) {
        e.preventDefault();
        load_history(build_table);
    })
});