import mongoose, {Schema, Document} from "mongoose";

export interface BudgetInterface extends Document {

    title: string,
    userId?: mongoose.Types.ObjectId,
    categoryId?: mongoose.Types.ObjectId,
    amount: number,
    year: string,
    // createdAt: Date
};

const budgetSchema: Schema = new Schema(
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
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: false
        },
        amount: {
            type: Number,
            required: true
        },
        year: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Budget = mongoose.model<BudgetInterface>("Budget", budgetSchema);

export default Budget;