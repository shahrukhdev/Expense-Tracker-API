import mongoose, {Schema, Document} from "mongoose";
import { required } from "zod/mini";

export interface CategoryInterface extends Document {

    name: string,
    icon: string,
    color: string,
    userId?: mongoose.Types.ObjectId,
    // isDefault?: boolean,
    // createdAt: Date
}

const categorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: ""
        },
        color: {
            type: String,
            default: "#000000"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    },
    { timestamps: true }
);

const Category = mongoose.model<CategoryInterface>("Category", categorySchema);

export default Category;
