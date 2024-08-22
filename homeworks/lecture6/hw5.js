// 1. use `promise` to print 1, 2, 3 in every 1 second
function print() {
  // your code here
  //Helper function to return a promise that resolves after specified delay
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //Async function to print numbers with delay
  async function printNumbers() {
    for (let i = 1; i <= 3; i++) {
      console.log(i);
      await wait(1000);
    }
  }
  printNumbers();
}

// improved: print every single numbers in a list in every 1 second
// hint: `reduce`
const nums = [3, 1, 6, 9, 2];

function printList() {
  // your code here
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  nums.reduce((promise, num) => {
    return promise.then(() => {
      console.log(num);
      return wait(1000);
    });
  }, Promise.resolve());
}

// 2. traffic light
// output: red -> green -> yellow -> red -> ...
// the delay time is up to you, but the order has to be correct
function trafficLight() {
  // your code here
  const colors = ["red", "green", "yellow"];
  const delays = [2000, 3000, 1000];

  function cycleLights(index = 0) {
    console.log(colors[index]);
    setTimeout(() => {
      cycleLights((index + 1) % colors.length);
    }, delays[index]);
  }
  cycleLights();
}
