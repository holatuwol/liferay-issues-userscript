function hideMenus() : void {
  var visibleMenuElements = document.querySelectorAll('div[resolved][aria-hidden="false"]');

  for (var i = 0; i < visibleMenuElements.length; i++) {
    visibleMenuElements[i].setAttribute('aria-hidden', 'true');
  }
}

function setMenuActions(e : MouseEvent) : void {
  var target = <HTMLAnchorElement> e.currentTarget;

  if (!target) {
    return;
  }

  hideMenus();

  var menuId = target.getAttribute('id');
  var menuContainerElement = <HTMLDivElement> document.getElementById(menuId + '-content');

  if (menuContainerElement.getAttribute('resolved')) {
    if (menuContainerElement.getAttribute('aria-hidden')) {
      menuContainerElement.setAttribute('aria-hidden', 'false');
      e.stopPropagation();
      e.preventDefault();
    }

    return;
  }

  var menuURL = 'https://issues.liferay.com/rest/api/1.0/menus/' + menuId + '?inAdminMode=false';

  var xhr = new XMLHttpRequest();

  xhr.open('GET', menuURL);

  xhr.addEventListener('load', function() {
    var xml = <Document> this.responseXML;
    var sections = xml.querySelectorAll('sections');

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];

      var id = section.querySelector('id');

      var sectionContainer = document.createElement('div');
      sectionContainer.classList.add('aui-dropdown2-section');

      var label = section.querySelector('label');

      if (label) {
        var labelElement = document.createElement('strong');
        labelElement.textContent = label.textContent;
        sectionContainer.appendChild(labelElement);
      }

      var sectionItemsElement = document.createElement('ul');
      sectionItemsElement.classList.add('aui-list-truncate');

      var items = section.querySelectorAll('items');

      for (var j = 0; j < items.length; j++) {
        var item = items[j];
        var itemTitle = (<Element> item.querySelector('title') || item.querySelector('label')).textContent || '';
        var itemURL = (<Element> item.querySelector('url')).textContent || '';

        var itemElement = document.createElement('li');
        itemElement.appendChild(createAnchorTag(itemTitle, itemURL));
        sectionItemsElement.appendChild(itemElement);
      }

      sectionContainer.appendChild(sectionItemsElement);
      menuContainerElement.appendChild(sectionContainer);
    }

    menuContainerElement.setAttribute('resolved', 'true');
    menuContainerElement.setAttribute('aria-hidden', 'false');
    menuContainerElement.style.zIndex = '3000';
  });

  xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
  xhr.setRequestHeader('Pragma', 'no-cache');

  xhr.send(null);

  e.stopPropagation();
  e.preventDefault();
}

function enableMenuActions() : void {
  var navigationMenuItems = document.querySelectorAll('ul.aui-nav > li > a');

  for (var i = 0; i < navigationMenuItems.length; i++) {
    navigationMenuItems[i].addEventListener('click', setMenuActions);
  }

  document.body.addEventListener('click', hideMenus);
}

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