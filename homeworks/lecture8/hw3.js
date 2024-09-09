/**
 * Refactor hw3 in lecture 7 to use Express.js with template engine.
 */
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

//Set Ejs as the view engine
qpp.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

//Home route
app.get("/", (req, res) => {
  res.redirect("/home.html");
});

app.get("/home.html", (req, res) => {
  const queryParams = req.query;
  res.render("home", {
    title: queryParams.title || "",
    content: queryParams.content || "",
  });

  //Handle form submission
  app.post("/create-post", (req, res) => {
    //extractiong title and content from the request body
    const { title, content } = req.body;
    res.redirect(
      "home?title = ${encodeURIComponent(title)}&content=${encodeURIComponent(content)}"
    );
  });
});
//About route
app.get("/about", (req, res) => {
  res.send("this is the about page");
});

//Handle 404
app.use((req, res) => {
  res.status(404).send("this is the 404 page");
});

//Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
