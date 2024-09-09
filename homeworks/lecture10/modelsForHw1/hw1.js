const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { Employee } = require("./modelsForHw1/Employee");
const { Company } = require("./modelsForHw1/Company");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/companyemployee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new company
app.post("/companies", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).send(company);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all companies
app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.send(companies);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//Get a company by id
app.get("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).send({ error: "Company not found" });
    }
    res.send(company);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//update a company by id
app.patch("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res.status(404).send({ error: "Company not found" });
    }
    res.send(company);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//delete a company by id
app.delete("/companies/:id", async (req, res) => {
  try {
    const comapny = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).send();
    }
    res.send(company);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Create a new employee
app.post("/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find().populate("company");
    res.send(employees);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Get an employee by id
app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("company");
    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
//Update an employee by id
app.patch("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).send({ error: "Employee not found" });
    }
    res.send(employee);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Delete an employee by id
app.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Get all employees of a company
app.get("/companies/:id/employees", async (req, res) => {
  try {
    const employees = await Employee.find({ company: req.params.id });
    res.send(employees);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Start the sever

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
