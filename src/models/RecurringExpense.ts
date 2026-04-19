import mongoose, {Schema, Document} from "mongoose";

export interface RecurringExpenseInterface extends Document {

    title: string,
    userId?: mongoose.Types.ObjectId,
    amount: number,
    categoryId?: mongoose.Types.ObjectId,
    frequency: string,
    nextDueDate: Date
    // createdAt: Date
};

const recurringExpenseSchema: Schema = new Schema(
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
        amount: {
            type: Number,
            required: true
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: false
        },
        frequency: {
            type: String,
            required: false
        },
        nextDueDate: {
            type: Date,
            required: false
        },
    },
    { timestamps: true }
);

const RecurringExpense = mongoose.model<RecurringExpenseInterface>("RecurringExpense", recurringExpenseSchema);

export default RecurringExpense;