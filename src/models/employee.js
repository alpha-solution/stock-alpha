import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	}
});

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;