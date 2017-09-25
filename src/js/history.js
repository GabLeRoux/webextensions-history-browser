var browserHistory = Components.classes["@mozilla.org/browser/nav-history-service;1"]
    .getService(Components.interfaces.nsIBrowserHistory);

console.log(browserHistory);

$(document).ready(function () {
    $('#hisotry').DataTable();
});