var pathName = document.location.pathname;

if (pathName.indexOf('/browse/') == 0) {
  if (!document.querySelector('#activitymodule .aui-tabs')) {
    addComments();
    updateTicketActions();
    enableShowMoreLinks();
  }
}
else if ((pathName.indexOf('/secure/AssignIssue!') == 0) || (pathName.indexOf('/secure/AssignIssue.jspa') == 0)) {
  if (!document.getElementById('assignee-field')) {
    addAssigneeInput();
  }
}
else if (pathName.indexOf('/secure/LinkJiraIssue!') == 0) {
  if (!document.getElementById('jira-issue-keys-textarea')) {
    addIssueKeySelect();
  }
}
else if (pathName.indexOf('/issues/') == 0) {
  if (!document.getElementById('advanced-search')) {
    addAdvancedSearch();
  }
}
else if (pathName.indexOf('/secure/QuickSearch.jspa') == 0) {
  if (!document.getElementById('advanced-search')) {
    addAdvancedSearch();
  }
}