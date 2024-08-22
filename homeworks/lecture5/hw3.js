// what is the output in order? and explain why?

// 1
console.log("a");
setTimeout(() => console.log("b"), 0); // it will be add to macrotask queue
console.log("c");
new Promise((resolve, reject) => {
  resolve("d"); //to execute later as a microtask
  console.log("e"); //print
  reject("f"); //is called afrer the promis has been resolved, but it's ignored because the promise has already settled.
}).then((result) => console.log(result)); // schedules a microtask to log the resolved value d of the promise.
//a c e d c
// 2
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1); //when fn is called, it executed immediately
    resolve("success"); // the promise is resoled with the value success

    fn().then((res) => {
      console.log(res); //is called on promise, then will only run after the current stack is complete since is is queued in the microtask queue
    });

    console.log("start"); // After the current synchronous code is executed, the event loop picks up the microtasks, and the then callback res =>{console.log(res)} is executed, logging 'success'
  });
//1 start success
