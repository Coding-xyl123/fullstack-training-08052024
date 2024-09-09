const mongoose = require("mongoose");
const CompangSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  headQuarters: { type: String, required: true },
  industry: { type: String, required: true },
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
