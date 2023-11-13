import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema({
    part_code: {
        type: String,
        required: true
    },
    part_name: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    last_update: {
        type: String,
        required: true
    }
});

const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

export default Stock;