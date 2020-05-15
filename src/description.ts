function enableShowMoreLinks() : void {
  var showMoreLinks = document.getElementById('show-more-links');

  if (!showMoreLinks) {
    return;
  }

  var collapsedLinksLists = document.querySelectorAll('.collapsed-links-list');

  for (var i = 0; i < collapsedLinksLists.length; i++) {
    collapsedLinksLists[i].classList.remove('collapsed-links-list');
  }

  var collapsedLinks = document.querySelectorAll('.collapsed-link');

  for (var i = 0; i < collapsedLinks.length; i++) {
    collapsedLinks[i].classList.remove('collapsed-link');
  }
}