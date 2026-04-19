import User from "../models/User.js";
import bcrypt from "bcrypt";
import { UserInput } from "../validations/user.validation.js";
import AppError from "../utils/AppError.js";

const fetchAllUsers = async () => {

    return await User.find().select("-password").sort({ createdAt: -1 });

}

const fetchUserById = async (userId: string) => {

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        // profileImage: user.profileImage
    }
}

const updateUserById = async (userId: string, data: UserInput) => {

    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;

    if (data.password !== undefined) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        user.password = hashedPassword;
    }

    await user.save();

    return user;
}

export default {
    fetchAllUsers,
    fetchUserById,
    updateUserById,
};