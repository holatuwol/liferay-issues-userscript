function updateProjectKey(
  projectElement : HTMLInputElement,
  projectKeyElement : HTMLInputElement,
  issueTypeElement : HTMLSelectElement
) : void {

  var issueTypeOptions = issueTypeElement.options;

  for (var i = issueTypeElement.options.length - 1; i >= 0; i--) {
    issueTypeElement.options[i].remove();
  }

  var projectKey = projectKeyElement.value;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    var projects = JSON.parse(this.responseText).projects;
    var project = null;

    for (var i = 0; i < projects.length; i++) {
      if (projects[i].key == projectKey) {
        project = projects[i];
      }
    }

    if (!project) {
      return;
    }

    projectElement.value = project.id;

    var issuetypes = project.issuetypes;

    for (var i = 0; i < issuetypes.length; i++) {
      var optionElement = document.createElement('option');
      optionElement.setAttribute('value', issuetypes[i].id);
      optionElement.textContent = issuetypes[i].name;
      issueTypeElement.appendChild(optionElement);
    }
  });

  var restURL = 'https://issues.liferay.com/rest/api/2/issue/createmeta?projectKeys=' + projectKey + '&fields=projects.issuetypes.fields';
  xhr.open('GET', restURL);
  xhr.send();
}

function makeProjectSelectUsable() : void {
  var projectOptionsElement = <HTMLScriptElement> document.getElementById('project-options');
  var projectElement = <HTMLInputElement> document.getElementById('project');
  projectElement.setAttribute('type', 'hidden');

  var projectKeyElement = document.createElement('input');
  projectKeyElement.value = 'LPS';

  var oldIssueTypeElement = <HTMLInputElement> document.getElementById('issuetype');
  var newIssueTypeElement = document.createElement('select');
  newIssueTypeElement.setAttribute('name', 'issuetype');

  var parentElement = <HTMLElement> oldIssueTypeElement.parentElement;
  parentElement.replaceChild(newIssueTypeElement, oldIssueTypeElement);

  var projectKeyListener = _.debounce(
      updateProjectKey.bind(
        null, projectElement, projectKeyElement, newIssueTypeElement),
        200);

  projectKeyElement.addEventListener('keyup', projectKeyListener);
  projectKeyElement.addEventListener('change', projectKeyListener);

  parentElement = <HTMLElement> projectElement.parentElement;
  parentElement.appendChild(projectKeyElement);
  projectKeyListener();  
}

function makeSummaryUsable() : void {
  enableToggleTabs();

  var hiddenSelectElements = document.querySelectorAll('select.hidden');

  for (var i = 0; i < hiddenSelectElements.length; i++) {
    hiddenSelectElements[i].classList.remove('hidden');
  }
}

function makeCreateIssueUsable() : void {
  if (document.getElementById('project')) {
    makeProjectSelectUsable();
  }
  if (document.getElementById('summary')) {
    makeSummaryUsable();
  }
}