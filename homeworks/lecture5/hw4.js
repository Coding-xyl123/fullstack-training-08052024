// what is the output? and explain why?

// 1
Promise.resolve(1) //this creates a promise that immediately resovled with value 1
  .then((res) => {
    console.log(res); //this will print 1
    return 2; //this value will be wrapped in a resoled promise
  })
  .catch((err) => {
    // the previous promise is resolved and this will skiped
    return 3;
  })
  .then((res) => {
    console.log(res); //this handles the resolved value 2 from the previous then handler which res = 2
  }); // the output is 1 2

// // 2
Promise.reject(1)
  .then((res) => {
    console.log(res); //the then callback does not executed since it is called on reject promise
    return 2;
  })
  .catch((err) => {
    console.log(err); //log the error value 1 to the console
    return 3; //return 3 which resolves the promise created by returninh it from the catch block
  })
  .then((res) => {
    console.log(res); //the previous catch block handled the rejection and returned 3
  }); // the output is 1, 3

//3
function runAsync(x) {
  const p = new Promise((resolve) => setTimeout(() => resolve(x), 1000));
  return p;
}

function runReject(x) {
  const p = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Error: ${x}`), 1000 * x)
  );
  return p;
}
//this takes an iterable of promises and returns a single promise that
//Resolves when all of the inputs promises have resolved or if the iterable contains no promises
//Reject immediately upon any of the input promises rejectiong,
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
//the output is Error:2
