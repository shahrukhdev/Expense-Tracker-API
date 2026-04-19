import mongoose, {Schema, Document} from "mongoose";

export interface ExpenseInterface extends Document {

    title: string,
    userId?: mongoose.Types.ObjectId,
    amount: number,
    categoryId?: mongoose.Types.ObjectId,
    description: string,
    date: Date,
    paymentMethod: string,
    // tags: string[],
    // receiptImage?: string,
    // createdAt: Date
}

const expenseSchema: Schema = new Schema(
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
        description: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false,
        },
        paymentMethod: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Expense = mongoose.model<ExpenseInterface>("Expense", expenseSchema);

export default Expense;