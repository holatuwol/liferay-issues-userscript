var styleElement = document.createElement('style');

styleElement.textContent = `
html body {
  overflow-y: auto;
}

#show-more-links {
  visibility: hidden;
}
`;

document.head.appendChild(styleElement);