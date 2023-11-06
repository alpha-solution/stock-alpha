import mongoose, { Schema } from "mongoose";

const partSchema = new Schema({
    part_code: {
        type: String,
        required: true
    },
    part_name: {
        type: String,
        required: true
    }
});

const Part = mongoose.models.Part || mongoose.model("Part", partSchema);

export default Part;