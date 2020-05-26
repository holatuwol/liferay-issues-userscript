var styleElement = document.createElement('style');

styleElement.textContent = `
html body {
  overflow-y: auto;
}

.aui-header-primary .aui-nav {
  width: auto;
}

.ajs-multi-select-placeholder,
.wiki-button-bar {
  display: none;
}

#assign-to-me-trigger,
#show-more-links {
  visibility: hidden;
}

#documentation-web-panel,
#greenhopper-agile-issue-web-panel,
#packages-issue-panel,
#slack-viewissue-panel,
#issue-panel {
  display: none;
}

#activitymodule {
  width: 90vw;
}
`;

document.head.appendChild(styleElement);