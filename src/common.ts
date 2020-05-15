function getTicketId() : string | null {
  var ticketName = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);

  var ticketElement = <HTMLElement> document.querySelector('a[data-issue-key="' + ticketName + '"]');

  return ticketElement.getAttribute('rel');
}

function getCurrentUser() : string | null {
  var fullNameElement = <HTMLElement> document.querySelector('#header-details-user-fullname');

  return fullNameElement.getAttribute('data-username');
}