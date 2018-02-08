require('datatables.net-bs');
require('datatables.net-bs/css/dataTables.bootstrap.css');
require('./ColReorderWithResize');
let moment = require('moment');
let jQuery = require('jquery');

require('../css/main.css');

let maxResult = 5000;
let default_datetime_format = 'l h:mm:ss';

let columns = [
    {title: "id"},
    {title: "Url"},
    {title: "Page title"},
    {title: "Last visit time"},
    {title: "Visit count"},
    {title: "Type count"}
];

function load_history(callback, query) {
    // Get all of the history
    if (typeof query === 'undefined') {
        query = {
            text: "",
            startTime: 0,
            endTime: new Date(),
            maxResults: maxResult // todo: setting
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
    for (let historyItem of historyItems) {
        data.push([
            historyItem.id || "",
            historyItem.url || "",
            historyItem.title || "",
            new Date(historyItem.lastVisitTime) || "",
            historyItem.visitCount || "",
            historyItem.typedCount || "",
        ])
    }
    jQuery('#history').dataTable({
        sDom: "Rlfrtip",
        destroy: true,
        data: data,
        columns: columns,
        pageLength: 50, // todo: setting
        columnDefs: [
            {
                // make url column clickable
                render: function (data, type, row) {
                    return '<a class="break-all" href="' + data + '" target="_blank">' + data + '</a>';
                },
                targets: 1
            },
            {
                // last visit time format
                // todo: try to use this instead:
                // render: jQuery.fn.dataTable.render.moment('MMMM Do YYYY, h:mm:ss'),
                // I'm always getting "TypeError: jQuery.fn.dataTable.render.moment is not a function" no matter how I try
                render: function (data, type, row) {
                    return moment(data).format(default_datetime_format);
                },
                targets: 3
            },
            {visible: false, targets: [0]}, // hides id column
            {visible: false, targets: [5]} // hides typedCount column
        ],
        order: [[3, "desc"]] // default ordering on last visit
    });
}

jQuery(document).ready(function () {
    load_history(build_table);
    jQuery('#refresh-list').click(function (e) {
        e.preventDefault();
        load_history(build_table);
    })
});