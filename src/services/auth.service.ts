import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import crypto from "crypto";
import type { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../validations/auth.validation.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import env from '../config/env.js';
import sendEmail from '../utils/sendEmail.js';
import { getEmailTemplate } from '../emails/emailTemplates.js';

const register = async (data: RegisterInput) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError('User already exists.', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

const login = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('This email is not associated with any user.', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError('These credentials do not match our records.', 401);
  }

  const token = jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

const generateResetToken = async (data: ForgotPasswordInput) => {
  const { email } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('This email is not associated with any user.', 401);
  }

  const resetToken = crypto.randomBytes(32).toString('hex');

  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 3600 * 1000; // 1 hour

  await user.save();

  const resetUrl = `${env.WEBSITE_URL}/reset-password?token=${resetToken}&email=${email}`;

  await sendEmail({
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click here to reset: ${resetUrl}`,
    html: getEmailTemplate('passwordReset', { resetUrl })
  });
};

const resetUserPassword = async (data: ResetPasswordInput) => {
  const { email, token, password, confirmPassword } = data;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    email,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: {  $gt: Date.now() }
  });

  if (!user) {
    throw new AppError('Invalid or expired reset token.', 401);
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};

export default { register, login, generateResetToken, resetUserPassword };