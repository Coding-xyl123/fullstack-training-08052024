// write a function to deep clone an object with circular reference
//
// const data = {
//     name: 'foo',
//     child: null
// }
// data.child = data;

const cloneDeepWithLoop = (obj) => {
  // Implement the function here
  const visited = new Map();
  function clone(value) {
    //check for primitives
    if (value === null || typeof value !== "Object") {
      return value;
    }
    //if the object is already visited, return the stored clone
    if (visited.has(value)) {
      return visited.get(value);
    }
    //Create a new object or array
    const copiedObject = Array.isArray(value) ? [] : {};
    //store the reference to the new object in the map
    visited.set(value, copiedObject);

    //Recurisivley clone properties
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copiedObject[key] = clone(value[key]);
      }
    }
  }
};
