function updateTicketActions() : void {
  var operationsContainer = <HTMLElement> document.getElementById('opsbar-opsbar-operations');

  var attachNode = document.createElement('a');
  attachNode.setAttribute('href', '/secure/AttachFile!default.jspa?id=' + getTicketId());
  attachNode.classList.add('aui-button', 'toolbar-trigger');
  attachNode.textContent = 'Attach Files';

  var linkTicketNode = document.createElement('a');

  linkTicketNode.setAttribute('href', '/secure/LinkJiraIssue!default.jspa?id=' + getTicketId());
  linkTicketNode.classList.add('aui-button', 'toolbar-trigger');
  linkTicketNode.textContent = 'Link Issue';

  operationsContainer.appendChild(attachNode);
  operationsContainer.appendChild(linkTicketNode);

  var moreOperationsElement = document.getElementById('opsbar-operations_more');

  if (moreOperationsElement) {
    moreOperationsElement.remove();
  }

  var transitionsContainer = <HTMLElement> document.getElementById('opsbar-opsbar-transitions');
  var hiddenTransitionNodes = document.querySelectorAll('aui-item-link.issueaction-workflow-transition');

  for (var i = 0; i < hiddenTransitionNodes.length; i++) {
    var hiddenTransitionNode = hiddenTransitionNodes[i];

    var transitionNode = document.createElement('a');
    transitionNode.setAttribute('href', hiddenTransitionNode.getAttribute('href') || '');
    transitionNode.classList.add('aui-button', 'toolbar-trigger', 'issueaction-workflow-transition');
    transitionNode.innerHTML = hiddenTransitionNode.innerHTML;

    transitionsContainer.appendChild(transitionNode);
  }

  var moreTransitionsElement = document.getElementById('opsbar-transitions_more');

  if (moreTransitionsElement) {
    moreTransitionsElement.remove();
  }
}