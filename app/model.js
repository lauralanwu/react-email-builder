function htmlTree(htmlContent) {
  if (typeof htmlContent === 'string') {
    return parseHTML(htmlContent);
  }

  return {};
}

function parseHTML() {
  return {};
}

export default htmlTree;
