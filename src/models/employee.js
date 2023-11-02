import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
	username: String,
	password: String,
	first_name: String,
	last_name: String,
});

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
