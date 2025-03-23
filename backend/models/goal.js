import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    goalType: {
        type: String,
        required: true
    },
    targetValue: {
        type: Number,
        required: true
    },
    currentValue: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["not-started", "in-progress", "completed"],
        default: "not-started"
    }
}, { timestamps: true });

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
