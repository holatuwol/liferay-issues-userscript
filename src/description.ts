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

function getProductVersionName(
  version : string | null
) : string {

  if (!version) {
    return '';
  }

  if (version.indexOf('7.2') == 0) {
    return '7.2';
  }

  if (version.indexOf('7.1') == 0) {
    return '7.1';
  }

  if (version.indexOf('7.0') == 0) {
    return '7.0';
  }

  if (version.indexOf('6.2') == 0) {
    return '6.2';
  }

  if (version.indexOf('6.1') == 0) {
    return '6.1';
  }

  return '';
}

function getProductVersionId(
  version: string
) : string {

  if (version == '7.2') {
    return '130051253';
  }

  if (version == '7.1') {
    return '102311424';
  }

  if (version == '7.0') {
    return '101625504';
  }

  if (version == '6.x') {
    return '101625503';
  }

  return '';
}

function getPatcherPortalAccountsHREF(
  path: string,
  params: {[s: string] : string}
) : string {

  var portletId = '1_WAR_osbpatcherportlet';
  var ns = '_' + portletId + '_';

  var queryString = Object.keys(params).map(function(key) { return (key.indexOf('p_p_') == 0 ? key : (ns + key)) + '=' + encodeURIComponent(params[key]) }).join('&');
  return 'https://patcher.liferay.com/group/guest/patching/-/osb_patcher/accounts' + path + '?p_p_id=' + portletId + '&' + queryString;
}

function addPatcherPortalLinks() : void {
  var customFieldElement = document.getElementById('rowForcustomfield_14827');

  if (!customFieldElement) {
    return;
  }

  var valueElement = <HTMLElement> customFieldElement.querySelector('.value');

  var accountCode = (valueElement.textContent || '').trim();

  var allBuildsLinkHREF = getPatcherPortalAccountsHREF('', {
    'accountEntryCode': accountCode
  });

https://patcher.liferay.com/group/guest/patching/-/osb_patcher/accounts/view?_1_WAR_osbpatcherportlet_patcherBuildAccountEntryCode=OTIS

  valueElement.appendChild(document.createTextNode(' | '));
  valueElement.appendChild(createAnchorTag('All Builds', allBuildsLinkHREF));

  var versionsField = document.getElementById('versions-field');

  if (versionsField) {
    var version = getProductVersionName(versionsField.querySelectorAll('span')[0].textContent);

    if (version) {
      var versionBuildsLinkHREF = getPatcherPortalAccountsHREF('/view', {
        'patcherBuildAccountEntryCode': accountCode,
        'patcherProductVersionId': getProductVersionId(version)
      });

      valueElement.appendChild(document.createTextNode(' | '));
      valueElement.appendChild(createAnchorTag(version + ' Builds', versionBuildsLinkHREF));
    }
  }
}