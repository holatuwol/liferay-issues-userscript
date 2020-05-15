function addAssigneeInput() : void {
  var oldAssigneeElement = <HTMLSelectElement> document.getElementById('assignee');
  var oldAssignee = oldAssigneeElement.options[oldAssigneeElement.selectedIndex].value;

  var newAssigneeElement = document.createElement('input');
  newAssigneeElement.setAttribute('id', 'assignee');
  newAssigneeElement.setAttribute('name', 'assignee');
  newAssigneeElement.classList.add('text', 'long-field');
  newAssigneeElement.value = getCurrentUser() || oldAssignee;

  var parentElement = <HTMLElement> oldAssigneeElement.parentElement;
  parentElement.replaceChild(newAssigneeElement, oldAssigneeElement);
}