const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  Company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});
module.exports = mongoose.model("User", UserSchema);
