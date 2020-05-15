## JIRA when javascript.enabled=false

If you're accessing JIRA from APAC, it can get really slow (minutes to load a page), because of all the Javascript files that you need to download to browse JIRA.

To speed things up, you can disable all the Javascript on the site, which allows pages to load within 15 seconds (still slow, but not awful). In Firefox, this can be as simple as downloading an add-on to disable Javascript on the `issues.liferay.com` domain.

* https://addons.mozilla.org/en-US/firefox/addon/disable-javascript/

Once you do that, however, you'll find that a lot of functionality stops working. That's because JIRA, like many other modern applications, relies on Javascript for some of its functionality. This user script restores some of the most frequently-used functionality in JIRA via user scripts (which are not restricted, even if Javascript is disabled), so you can continue browsing JIRA with Javascript disabled.