function updateTicket() {
  if (document.querySelector('#activitymodule .aui-tabs')) {
    return;
  }

  addComments();
  updateTicketActions();
  enableShowMoreLinks();
}

function isMatchesPathName(partialPathName : string) : boolean {
  return pathName.indexOf('/secure/' + partialPathName + '!') == 0 ||
    pathName === '/secure/' + partialPathName + '.jspa';
}

var pathName = document.location.pathname;

if (pathName.indexOf('/browse/') == 0) {
  updateTicket();
}
else if (isMatchesPathName('AssignIssue')) {
  addAssigneeInput();
}
else if (isMatchesPathName('CreateIssue')) {
  makeCreateIssueUsable();
}
else if (isMatchesPathName('EditIssue')) {
  enableToggleTabs();
}
else if (isMatchesPathName('LinkJiraIssue')) {
  addIssueKeySelect();
}
else if (pathName.indexOf('/issues/') == 0) {
  addAdvancedSearch();
}
else if (isMatchesPathName('QuickSearch')) {
  addAdvancedSearch();
}