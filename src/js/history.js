let backgroundPage = browser.extension.getBackgroundPage();

$(document).ready(function () {
    $('#history').DataTable();
    //backgroundPage.load_history();
    $('#refresh-list').click(function (e) {
        e.preventDefault();
        backgroundPage.load_history(undefined);
    })
});

function handleMessage(request, sender, response) {

    console.log(request);
    console.log(sender);
    console.log(response);

    if (request.msg === "history-browser-clear-table") {
        // results.innerHTML = "";
    }
    if (request.msg === "history-browser-found-results") {
        console.log(request.browserHistory);
        $('#history').DataTable(request.browserHistory);
    }
}

browser.runtime.onMessage.addListener(handleMessage);