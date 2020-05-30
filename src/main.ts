function updateTicket() : void {
  if (document.querySelector('#activitymodule .aui-tabs')) {
    return;
  }

  var sidebar = document.querySelector('.aui-sidebar');

  if (sidebar) {
    sidebar.setAttribute('aria-expanded', 'false');
  }

  addComments();
  updateTicketActions();
  enableShowMoreLinks();
  addPatcherPortalLinks();
}

function isMatchesPathName(partialPathName : string) : boolean {
  return pathName.indexOf('/secure/' + partialPathName + '!') == 0 ||
    pathName === '/secure/' + partialPathName + '.jspa';
}

enableMenuActions();

var pathName = document.location.pathname;

if (pathName.indexOf('/browse/') == 0) {
  updateTicket();
}
else if (isMatchesPathName('AssignIssue')) {
  addAssigneeInput();
}
else if (isMatchesPathName('CreateIssue')) {
  makeCreateEditIssueUsable();
}
else if (isMatchesPathName('EditIssue')) {
  makeCreateEditIssueUsable();
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