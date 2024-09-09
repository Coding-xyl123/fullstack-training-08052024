const mongoose = require("mongoose");
const { type } = require("os");
const { mainModule } = require("process");
const { start } = require("repl");

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  startDate: { type: Date, required: true },
  jobTitle: { type: String, required: true },
  resigned: { type: Boolean, default: false },
  salary: { type: Number, required: true },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
});
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
