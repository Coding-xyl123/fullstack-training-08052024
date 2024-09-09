const mongoose = require("mongoose");
const { type } = require("os");
const { mainModule } = require("process");
const { start } = require("repl");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  headquarters: { type: String, required: true },
  industry: { type: String, required: true },
  _employees: [EmployeeSchema], // This embeds the EmployeeSchema into Company
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
