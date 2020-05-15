var styleElement = document.createElement('style');

styleElement.textContent = `
html body {
  overflow-y: auto;
}

#assign-to-me-trigger,
#show-more-links {
  visibility: hidden;
}
`;

document.head.appendChild(styleElement);