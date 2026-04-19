import mongoose, {Schema, Document} from "mongoose";

export interface IncomeInterface extends Document {

    title: string,
    userId?: mongoose.Types.ObjectId,
    source: string,
    amount: number,
    date: Date,
    description: string
    // createdAt: Date
};

const incomeSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        source: {
            type: String,
            required: false
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: false
        },
        description: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
);

const Income = mongoose.model<IncomeInterface>("Income", incomeSchema);

export default Income;