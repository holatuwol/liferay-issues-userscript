function addAdvancedSearch() : void {
  if (!document.getElementById('advanced-search')) {
    return;
  }

  var navigatorSearchElement = <HTMLFormElement> document.querySelector('.aui.navigator-search');
  navigatorSearchElement.classList.add('query-component', 'generic-styled');

  var groupElement = document.createElement('div');
  groupElement.classList.add('aui-group');

  var itemElement = document.createElement('div');
  itemElement.classList.add('aui-item', 'search-wrap');

  var searchContainerElement = document.createElement('div');
  searchContainerElement.classList.add('search-container');
  searchContainerElement.setAttribute('data-mode', 'advanced');

  var searchFieldContainerElement = document.createElement('div');
  searchFieldContainerElement.classList.add('search-field-container');

  var atlassianAutoCompleteElement = document.createElement('div');
  atlassianAutoCompleteElement.classList.add('atlassian-autocomplete');

  var labelElement = document.createElement('label');
  labelElement.setAttribute('for', 'advanced-search');

  var jqlErrorMsgElement = document.createElement('span');
  jqlErrorMsgElement.setAttribute('id', 'jqlerrormsg');
  jqlErrorMsgElement.classList.add('icon', 'jqlgood');

  labelElement.appendChild(jqlErrorMsgElement);

  var advancedSearchElement = document.createElement('textarea');
  advancedSearchElement.setAttribute('name', 'jql');
  advancedSearchElement.setAttribute('id', 'advanced-search');
  advancedSearchElement.classList.add('textarea', 'search-entry', 'advanced-search', 'ajs-dirty-warning-exempt');
  advancedSearchElement.style.height = '50px';

  if (document.location.search && (document.location.search.length > 1)) {
    var navigatorContentElement = <HTMLElement> document.querySelector('.navigator-content');
    var modelState = navigatorContentElement.getAttribute('data-issue-table-model-state') || '{}';
    var issueTableModelState = JSON.parse(modelState);
    var issueTable = issueTableModelState.issueTable;

    var activeSortElement = document.querySelector('#issuetable th.active');

    var column = activeSortElement ? (activeSortElement.getAttribute('data-id') || 'issuekey') : 'issuekey';

    var sortJQL = issueTable['columnSortJql'][column];
    var sortColumn = (column == 'issuekey') ? 'key' : column;

    var sortColumnAsc = sortColumn + ' ASC';
    var sortColumnDesc = sortColumn + ' DESC';

    var sortAsc = sortJQL.indexOf(sortColumnAsc);
    var sortDesc = sortJQL.indexOf(sortColumnDesc);

    if (sortAsc != -1) {
      advancedSearchElement.textContent = sortJQL.substring(0, sortAsc) + sortColumnDesc + sortJQL.substring(sortAsc + sortColumnAsc.length);
    }
    else if (sortDesc != -1) {
      advancedSearchElement.textContent = sortJQL.substring(0, sortDesc) + sortColumnAsc + sortJQL.substring(sortDesc + sortColumnDesc.length);
    }
  }

  advancedSearchElement.addEventListener('keypress', function(e) {
    if(e && e.keyCode == 13) {
      e.preventDefault();
      e.stopPropagation();

      navigatorSearchElement.submit();
    }
  });

  atlassianAutoCompleteElement.appendChild(labelElement);
  atlassianAutoCompleteElement.appendChild(advancedSearchElement);
  searchFieldContainerElement.appendChild(atlassianAutoCompleteElement);
  searchContainerElement.appendChild(searchFieldContainerElement);

  var searchOptionsContainerElement = document.createElement('div');
  searchOptionsContainerElement.classList.add('search-options-container');

  var buttonElement = document.createElement('input');
  buttonElement.setAttribute('type', 'submit');
  buttonElement.setAttribute('value', 'Search');
  buttonElement.classList.add('aui-button', 'aui-button-primary', 'search-button');

  searchOptionsContainerElement.appendChild(buttonElement);
  searchContainerElement.appendChild(searchOptionsContainerElement);

  itemElement.appendChild(searchContainerElement);
  groupElement.appendChild(itemElement);
  navigatorSearchElement.appendChild(groupElement);
}