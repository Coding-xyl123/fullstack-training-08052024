/** implement Singleton pattern in both ES5 and ES6
 * https://en.wikipedia.org/wiki/Singleton_pattern
 *
 * Example:
 * const instance1 = new Singleton();
 * const instance2 = new Singleton();
 * console.log(instance1 === instance2); // Output: true
 */

// your code here
const instanceSymbol = Symbol("instance");

class Singleton {
  constructor() {
    if (Singleton[instanceSymbol]) {
      return Singleton[instanceSymbol];
    }
    Singleton[instanceSymbol] = this;
    //if no instance exists, it assigns this to Singeton, ensurinng that the next time the constructor is called, the same iinstance is returned
  }
}
//the instance is stored with a Symbol, ensuring that it is nnt easily accessed or modified from outside class
