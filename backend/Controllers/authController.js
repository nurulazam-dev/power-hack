import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, phone, role } = req.body;
  try {
    let user = null;

    if (role == "billingOfficer" || "accountant" || "admin") {
      user = await User.findOne({ email });
    }

    //check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role == "billingOfficer" || "accountant" || "admin") {
      user = new User({
        name,
        email,
        phone,
        role,
        password: hashPassword,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ status: true, message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ status: false, message: "User created fail" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    const accountant = await User.findOne({ email });

    if (accountant) {
      user = accountant;
    }

    //check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // get token
    const token = generateToken(user);

    const { password, role, ...rest } = user._doc;
    return res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Failed to login" });
  }
};

export const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
