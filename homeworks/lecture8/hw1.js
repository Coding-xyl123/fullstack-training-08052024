/**
 * Refactor hw1 and hw2 in lecture 7 in Express.js.
 * Requirements:
 * 1. make two routers, one for hw1 and one for hw2;
 * 2. hw1 should be able to handle requests with url params, rather than command-line arguments;
 *  - e.g. http://localhost:3000/hw1/<dir>/<ext>
 *  - `dir` only support one level down from the current repository,
 *    i.e http://localhost:3000/hw1/test/txt.
 *    You don't need to handle the case like http://localhost:3000/hw1/test/test/txt.
 * 3. hw2 should be able to handle requests with query strings like it did in lecture 7;
 */

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const hw1Router = express.Router();
hw1Router.get("/:dir/ext", (req, res) => {
  const dir = req.params.dir;
  const ext = req.params.ext;

  const directoryPath = path.join(__dirname, dir); //create absolute path

  //ensure it is only one level down
  if (
    !fs.existsSync(directoryPath) ||
    path.relative(__dirname, directoryPath).startsWith("..")
  ) {
    return res.status(404).json({ error: "Directory not found or too deep" });
  }
  //ensuer extension stars with a dot
  const fileExtension = ext.startsWith(".") ? ext : `.${ext}`;

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan directory" });
    }

    const filteredFiles = files.filter(
      (file) => path.extname(file) === fileExtension
    );
    return res.json(filteredFiles);
  });
});
app.use("/hw1", hw1Router);

const hw2Router = express.Router();

hw2Router.get("/parsetime", (req, res) => {
  const { iso } = req.query;
  const isoDate = new Date(iso);

  if (isoDate.toString() === "Invalid Date") {
    return res.status(400).json({ error: "Invalid Date" });
  }
  const jsonResponse = {
    hour: isoDate.getHours(),
    minute: isoDate.getMinutes(),
    second: isoDate.getSeconds(),
  };
  res.json(jsonResponse);
});

hw2Router.get("/unixtime", (req, res) => {
  const { iso } = req.query;
  const isoDate = new Date(iso);

  if (isoDate.toString() === "Invalid Date") {
    return res.status(400).json({ error: "Invalid Date" });
  }
  const jsonResponse = {
    unixtime: isoDate.getTime(),
  };
  res.json(jsonResponse);
});
app.use("/api", hw2Router);

const PORT = 3000;
app.listen(3000, () => {
  console.log("Server is running on HTTP://localhost:${PORT}");
});
