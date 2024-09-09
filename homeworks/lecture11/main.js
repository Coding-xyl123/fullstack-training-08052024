const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Import your user model
const authMiddleware = require("./middleware/auth"); // Import auth middleware
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());

// Connect to MongoDB (adjust URI as needed)
mongoose
  .connect("mongodb://localhost/yourdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Login API
app.post("/api/login", async (req, res) => {
  const { firstName, lastName } = req.body;

  // Find user by firstName and lastName
  const user = await User.findOne({ firstName, lastName });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  // Optionally compare hashed passwords here if you store passwords
  const token = jwt.sign(
    { id: user._id, company: user.company },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// Get all employees (with authorization)
app.get("/api/employees", authMiddleware, async (req, res) => {
  const employees = await Employee.find(); // Assuming Employee model is defined elsewhere
  res.json(employees); // All employee data for logged-in users
});

// Get employees by user's company
app.get(
  "/api/companies/:companyId/employees",
  authMiddleware,
  async (req, res) => {
    const employees = await Employee.find({ company: req.user.company }); // Fetch employees by the user's company
    res.json(employees);
  }
);

//  Fetch only limited fields for anonymous users
app.get("/api/employees/public", async (req, res) => {
  const employees = await Employee.find({}, { firstName: 1, lastName: 1 }); // Return only firstName and lastName
  res.json(employees);
});

app.post("/api/register", async (req, res) => {
  const { firstName, lastName, password, company } = req.body;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    password: hashedPassword,
    company,
  });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully!" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
