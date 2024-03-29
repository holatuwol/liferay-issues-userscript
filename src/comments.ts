function getActionLink(
  comment : JIRAComment,
  actionName : string,
  actionTitle : string,
  actionPath : string
) : HTMLAnchorElement {

    var anchorNode = createAnchorTag('', actionPath);
    anchorNode.setAttribute('id', actionName + '_comment_' + comment.id);
    anchorNode.setAttribute('title', actionTitle);
    anchorNode.classList.add(actionName + '-comment', 'issue-comment-action');

    var icon = document.createElement('span');
    icon.classList.add('icon-default', 'aui-icon', 'aui-icon-small', 'aui-iconfont-' + actionName);
    icon.textContent = actionTitle;

    anchorNode.appendChild(icon);

    return anchorNode;
}

function getActionLinks(comment : JIRAComment) : HTMLDivElement {
  var actionLinksNode = document.createElement('div');
  actionLinksNode.classList.add('action-links');

  actionLinksNode.appendChild(
    getActionLink(
      comment, 'link', 'Permalink',
      '/browse/' + getTicketName() + '?focusedCommentId=' + comment.id +
        '&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-' + comment.id));

  if (comment.author.key == getCurrentUser()) {
    actionLinksNode.appendChild(
      getActionLink(
        comment, 'edit', 'Edit',
        '/secure/EditComment!default.jspa?id=' + getTicketId() + '&commentId=' + comment.id));

    actionLinksNode.appendChild(
      getActionLink(
        comment, 'delete', 'Delete',
        '/secure/DeleteComment!default.jspa?id=' + getTicketId() + '&commentId=' + comment.id));
  }

  return actionLinksNode;
}

function getActionDetails(comment : JIRAComment) : HTMLDivElement {
  var actionDetailsNode = document.createElement('div');
  actionDetailsNode.classList.add('action-details');

  var avatarNode = document.createElement('a');
  avatarNode.setAttribute('id', 'commentauthor_' + comment.id + '_verbose');
  avatarNode.setAttribute('rel', comment.author.key);
  avatarNode.setAttribute('href', '/secure/ViewProfile.jspa?name=' + comment.author.name);
  avatarNode.classList.add('user-hover', 'user-avatar');

  var avatarOuterContainerNode = document.createElement('span');
  avatarOuterContainerNode.classList.add('aui-avatar', 'aui-avatar-xsmall');

  var avatarInnerContainerNode = document.createElement('span');
  avatarInnerContainerNode.classList.add('aui-avatar-inner');

  var avatarImageNode = document.createElement('img');
  avatarImageNode.setAttribute('src', comment.author.avatarUrls['16x16']);
  avatarImageNode.setAttribute('alt', comment.author.name);

  avatarInnerContainerNode.appendChild(avatarImageNode);
  avatarOuterContainerNode.appendChild(avatarInnerContainerNode);

  avatarNode.appendChild(avatarOuterContainerNode);
  avatarNode.appendChild(document.createTextNode(comment.author.displayName));

  var commentDate = new Date(comment.created);

  var commentDateContainer = document.createElement('span');
  commentDateContainer.classList.add('commentdate_' + comment.id + '_verbose');
  commentDateContainer.classList.add('subText');

  var commentDateNode = document.createElement('span');
  commentDateNode.setAttribute('title', commentDate.toString());
  commentDateNode.classList.add('date');
  commentDateNode.classList.add('user-tz');

  var commentTimeNode = document.createElement('time');
  commentTimeNode.setAttribute('datetime', commentDate.toJSON());
  commentTimeNode.classList.add('livestamp');
  commentTimeNode.textContent = commentDate.toString();

  commentDateNode.appendChild(commentTimeNode);
  commentDateContainer.appendChild(commentDateNode);

  actionDetailsNode.appendChild(avatarNode);
  actionDetailsNode.appendChild(document.createTextNode(' added a comment - '));
  actionDetailsNode.appendChild(commentDateContainer);

  return actionDetailsNode;
}

function getActionHead(comment : JIRAComment) : HTMLDivElement {
  var actionHeadNode = document.createElement('div');
  actionHeadNode.classList.add('action-head');

  actionHeadNode.appendChild(getActionLinks(comment));
  actionHeadNode.appendChild(getActionDetails(comment));

  return actionHeadNode;
}

function getActionBody(comment : JIRAComment) : HTMLDivElement {
  var actionBodyNode = document.createElement('div');
  actionBodyNode.classList.add('action-body');
  actionBodyNode.classList.add('flooded');

  actionBodyNode.innerHTML = comment.renderedBody;

  return actionBodyNode;
}

function addComment(comment : JIRAComment) : void {
  var activityContentNode = <HTMLElement> document.querySelector('#activitymodule .mod-content');

  var activityCommentNode = document.createElement('div');
  activityCommentNode.setAttribute('id', 'comment-' + comment.id);
  activityCommentNode.classList.add('issue-data-block', 'activity-comment', 'twixi-block', 'expanded');

  var actionContainerNode = document.createElement('div');
  actionContainerNode.classList.add('twixi-wrap', 'verbose', 'actionContainer');

  actionContainerNode.appendChild(getActionHead(comment));
  actionContainerNode.appendChild(getActionBody(comment));

  activityCommentNode.appendChild(actionContainerNode);
  activityContentNode.appendChild(activityCommentNode);
}

function addComments() : void {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function() {
    var comments = JSON.parse(this.responseText).comments;

    if (comments.length == 0) {
      var activityContentNode = <HTMLElement> document.querySelector('#activitymodule .mod-content');

      activityContentNode.appendChild(document.createTextNode('There are no comments yet on this issue.'));
    }
    else {
      for (var i = 0; i < comments.length; i++) {
        addComment(comments[i]);
      }
    }

    if (document.location.hash) {
      var comment = document.querySelector(document.location.hash);

      if (comment) {
        comment.scrollIntoView();
      }
    }
  });

  var restURL = 'https://' + document.location.host + '/rest/api/2/issue/' + getTicketId() + '/comment?expand=renderedBody';

  xhr.open('GET', restURL);

  xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
  xhr.setRequestHeader('Pragma', 'no-cache');

  xhr.send();
}