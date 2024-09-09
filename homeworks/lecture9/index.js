const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Employee } = require("./models/employee");
const { Company } = require("./models/company");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/companyemployee", {
  useNameUrlParser: true,
  useUnifiedTopology: true,
});

//Create a new company
app.post("/companies", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.set(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Create a new employee
app.post("/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.set(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get a company by id
app.get("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get an employee by id
app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update a company by id
app.patch("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
      res.send(company);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Update an employee by id
app.patch("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.bode, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
      res.send(employee);
    }
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

//Delete a company by id
app.delete("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
      res.send(company);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete an employee by id
app.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
      res.send(employee);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all companies
app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all employees in a company
app.get("/companies/:id/employees", async (req, res) => {
  const company = await Company.findById(req.params.id).populate("employees");
  if (!company) {
    return res.status(404).json({ error: "Company not found" });
    res.send(company.employees);
  }
  caches(err);
  {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
