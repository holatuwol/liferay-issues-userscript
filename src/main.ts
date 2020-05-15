function updateTicket() {
  if (!document.querySelector('#activitymodule .aui-tabs')) {
    return;
  }

  addComments();
  updateTicketActions();
  enableShowMoreLinks();
}

var pathName = document.location.pathname;

if (pathName.indexOf('/browse/') == 0) {
  updateTicket();
}
else if ((pathName.indexOf('/secure/AssignIssue!') == 0) || (pathName === '/secure/AssignIssue.jspa')) {
  addAssigneeInput();
}
else if (pathName.indexOf('/secure/CreateIssue!') == 0 || (pathName === '/secure/CreateIssue.jspa')) {
  makeCreateIssueUsable();
}
else if (pathName.indexOf('/secure/LinkJiraIssue!') == 0) {
  addIssueKeySelect();
}
else if (pathName.indexOf('/issues/') == 0) {
  addAdvancedSearch();
}
else if (pathName.indexOf('/secure/QuickSearch.jspa') == 0) {
  addAdvancedSearch();
}