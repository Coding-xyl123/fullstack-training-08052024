/**
 * write a program that prints a list of files in the given directory, filtered by the extension of the files.
 * The first argument is the directory name and the second argument is the extension filter.
 * Print the list of files (one file per line) to the console.
 *
 * HINTS:
 * 1. Use fs.readdir() method to read the contents of a directory.
 * 2. Use path.extname() method to get the extension of a file. (optional)
 * 3. Use process.argv to get command-line arguments.
 *  - process.argv[0] is the path to the node program
 *  - process.argv[1] is the path to the script file
 *  - process.argv[2] is the first command-line argument
 *    e.g. node hw1.js currentDir txt - process.argv[2] is `currentDir`, process.argv[3] is `txt`
 */

// your code here

const fs = require("fs"); //to enable file system operations in a Node.js enviroment by importing the fs module, allowing the script to perform various file-related tasks
const path = require("path"); //to enable path operations in a Node.js enviroment by importing the path module, allowing the script to perform various path-related tasks

const directory = process.argv[2]; //process.argv is an array containing the command line arguments passed when the Node.js process was launched. The first element will be process.execPath. The second element will be the path to the JavaScript file being executed
const extension = process.argv[3]; //process.argv[3] is the second command-line argument

if (!directory || !extension) {
  console.error("Please prove a directory and an extension");

  process.exit(1);
}

fs.readdir(directory, (err, files) => {
  if (err) {
    return console.error("Unable to scan directory: ${err}");
  }

  files.forEach((file) => {
    if (path.extname(file) === `${extension}`) {
      console.log(file);
    }
  });
});
