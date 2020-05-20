function getTicketId() : string | null {
  var ticketName = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);

  var ticketElement = <HTMLElement> document.querySelector('a[data-issue-key="' + ticketName + '"]');

  return ticketElement.getAttribute('rel');
}

function getCurrentUser() : string | null {
  var fullNameElement = <HTMLElement> document.querySelector('#header-details-user-fullname');

  return fullNameElement ? fullNameElement.getAttribute('data-username') : null;
}

function toggleTab(e : MouseEvent) : void {
  var tabElements = document.querySelectorAll('.tabs-menu li');
  var tabContentElements = document.querySelectorAll('.tabs-pane');

  for (var i = 0; i < tabElements.length; i++) {
    tabElements[i].classList.remove('active-tab');
  }

  var targetElement = <HTMLLIElement> e.currentTarget;
  targetElement.classList.add('active-tab');

  for (var i = 0; i < tabContentElements.length; i++) {
    tabContentElements[i].classList.remove('active-pane');
  }

  var linkElement = <HTMLAnchorElement> targetElement.querySelector('a');

  var href = linkElement.getAttribute('href')
  if (href && href.charAt(0) == '#') {
    var newActivePane = <HTMLDivElement> document.querySelector(href);
    newActivePane.classList.add('active-pane')
  }

  e.stopPropagation();
  e.preventDefault();
}

function enableToggleTabs() : void {
  var tabElements = document.querySelectorAll('.tabs-menu li');

  for (var i = 0; i < tabElements.length; i++) {
    tabElements[i].addEventListener('click', toggleTab);
  }
}