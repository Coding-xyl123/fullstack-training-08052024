/**
 * write a function to have an arbitrary number of promises run in sequence
 * and return an array of the results
 * @param {string[]} urls - an array of urls
 * @returns {any[]} - an array of responses
 */
function sequencePromise(urls) {
  const results = [];
  function fetchOne(url) {
    // for `getJSON` function you can choose either from the implementation of hw5 or `fetch` version provided by browser
    // if you use `fetch`, you have to use browser console to test this homework
    return getJSON(url).then((response) => results.push(response));
  }
  for (const url of urls) {
    try {
      const response = await.getJSON(url);
      results.push(response);
    } catch (error) {
      results.push({ error: `Failed to fetch ${url}:${error.message}` });
    }
  }
  // implement your code here

  return results;
}

// option 1
function getJSON(url) {
  // this is from hw5
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ message: `Data from ${url}` });
      } else {
        reject("URL is invalid");
      }
    }, 1000);
  });
}

// option 2
// function getJSON(url) {
//     return fetch(url).then(res => res.json());
// }

// test your code
const urls = [
  "https://api.github.com/search/repositories?q=javascript",
  "https://api.github.com/search/repositories?q=react",
  "https://api.github.com/search/repositories?q=nodejs",
];
