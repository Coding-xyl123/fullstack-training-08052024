/**
 * For sample code web-server.js, make the following changes:
 * Once submitting in home.html, stay on the same page and display the submitted data.
 *
 * Hint:
 * 1. put the data of the submitted form in the query string of the url
 * 2. before res.end() in POST method, redirect to the home.html page with the query string
 *  - i.e. res.statusCode = 302; res.setHeader('Location', '/home.html?name=John&age=20');
 * 3. you need to figure out how to parse the query string in the home.html page
 * 4. after writing the html content, you need to write the query string in the html as well
 */

const express = require("express");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS, JS) from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Home page route
app.get("/home", (req, res) => {
  const queryParams = req.query;
  res.render("home", {
    title: queryParams.title || "",
    content: queryParams.content || "",
  });
});

// Handle form submission
app.post("/create-post", (req, res) => {
  // Extracting title and content from the request body
  const { title, content } = req.body;
  res.redirect(
    `/home?title=${encodeURIComponent(title)}&content=${encodeURIComponent(
      content
    )}`
  );
});

// About route
app.get("/about", (req, res) => {
  res.send("This is the about page");
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("This is the 404 page");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
