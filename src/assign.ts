function addAssigneeInput() : void {
  var oldAssigneeElement = <HTMLElement> document.getElementById('assignee');
  var newAssigneeElement = document.createElement('input');
  newAssigneeElement.setAttribute('id', 'assignee');
  newAssigneeElement.setAttribute('name', 'assignee');
  newAssigneeElement.classList.add('text', 'long-field');

  var parentElement = <HTMLElement> oldAssigneeElement.parentElement;
  parentElement.replaceChild(newAssigneeElement, oldAssigneeElement);
}