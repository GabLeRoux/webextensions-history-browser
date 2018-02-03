require('../css/main.css');

let moment = require('moment');

let maxResult = 5000;
let default_datetime_format = 'YYYY-MM-DD H:mm:ss';

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

function setup_daterangepicker() {
    // $('input[name="daterange"]').daterangepicker(
    //     {
    //         locale: {
    //             format: 'YYYY-MM-DD'
    //         },
    //         startDate: '2013-01-01',
    //         endDate: '2013-12-31'
    //     },
    //     function (start, end, label) {
    //         update_datatables_daterange(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
    //         jQuery('#history').draw()
    //     });
}

function setup_datatables_daterange() {
    // Date range filter
    minDateFilter = "";
    maxDateFilter = "";

    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            if (typeof aData._date == 'undefined') {
                aData._date = new Date(aData[0]).getTime();
            }

            if (minDateFilter && !isNaN(minDateFilter)) {
                if (aData._date < minDateFilter) {
                    return false;
                }
            }

            if (maxDateFilter && !isNaN(maxDateFilter)) {
                if (aData._date > maxDateFilter) {
                    return false;
                }
            }

            return true;
        }
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
    jQuery('#history').DataTable({
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
    setup_datatables_daterange();
}

jQuery(document).ready(function () {
    setup_daterangepicker();
    load_history(build_table);
});