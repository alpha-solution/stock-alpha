import mongoose, { Schema } from "mongoose";

const importSchema = new Schema({
    import_date: {
        type: String,
        required: true
    },
    import_time: {
        type: String,
        required: true
    },
    part_code: {
        type: String,
        required: true
    },
    part_name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    employee: {
        type: String,
        required: true
    }
});

const Import = mongoose.models.Import || mongoose.model("Import", importSchema);

export default Import;