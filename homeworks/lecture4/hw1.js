// HTML tag validation
// Write a function that validates whether HTML tags are paired correctly or not.
// Example:
// <html><head><title>My Title</title></head></html> - true
// <html><head><title>My Title</title></head></head></html> - false
// <html><head><title>My Title</title></head></html - true

function checkValidHTML(html) {
  // implement your solution here
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\s*\/?>/g;
  const stack = [];
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const tagName = match[1];
    const isClosingTag = match[0].startsWith("</"); //check if it is a closing tag
    if (isClosingTag) {
      if (stack.length === 0 || stack.pop !== tagName) {
        return false;
      }
    } else {
      stack.push(tagName);
    }
  }
  return stack.length === 0;
}
