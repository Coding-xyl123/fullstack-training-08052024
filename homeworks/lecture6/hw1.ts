// 1. why there would be error in the following code? and how to fix it?
interface User {
  id: number;
  type: string;
}
// //Type 'User' is being declared multiple times. need to remove duplicate

// function makeCustomer<T extends User>(u: T): T {
//   return {
//     id: u.id,
//     type: "customer",
//   };
// }
function makeCustomer<T extends User>(u: T): T {
  return {
    ...u, // Spread operator to include all original properties
    type: "customer", // Overwriting type to "customer"
  };
}

// 2. fix the following code
// requirement: the function should accept either two strings or two numbers at the same time,
// so if parameters are one string and one number, it should throw an error
function f(a: string | number, b: string | number) {
  if (typeof a === typeof b) {
    if (typeof a === "string") {
      return `${a} : ${b}`;
    } else if (typeof a === "number") {
      return (a as number) + (b as number);
    }
  }
}
