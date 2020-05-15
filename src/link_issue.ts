function addIssueKeySelect() : void {
  if (!document.getElementById('jira-issue-keys-textarea')) {
    return;
  }

  var issueKeysLabel = <HTMLLabelElement> document.querySelector('label[for="jira-issue-keys"]');

  var parentElement = <HTMLElement> issueKeysLabel.parentElement;
  var siblingElements = parentElement.children;

  for (var i = siblingElements.length - 1; i >= 1; i--) {
    siblingElements[i].remove();
  }

  var issueKeysInput = document.createElement('input');
  issueKeysInput.setAttribute('name', 'issueKeys');
  issueKeysInput.classList.add('text', 'long-field');

  parentElement.appendChild(issueKeysInput);
}