let background = browser.extension.getBackgroundPage();

$(document).ready(function () {
    $('#history').DataTable();
    //background.load_history();
    $('#refresh-list').click(function (e) {
        e.preventDefault();
        background.load_history();
    })
});

browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, response) {
    if (request.msg === "history-browser-clear-table") {
        // results.innerHTML = "";
    }
    if (request.msg === "history-browser-found-results") {
        // console.log(request.browserHistory);
        // $('#history').DataTable(request.browserHistory);
    }
}