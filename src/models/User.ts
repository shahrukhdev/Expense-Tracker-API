import mongoose, {Schema, Document} from "mongoose";

export interface UserInterface extends Document {
    name: string,
    email: string,
    password: string,
    resetPasswordToken?: string,
    resetPasswordExpires?: number
}
 
const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        resetPasswordToken: {
            type: String,
            required: false,
            default: undefined
        },
        resetPasswordExpires: {
            type: Number,
            required: false,
            default: undefined
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<UserInterface>("User", userSchema);

export default User
