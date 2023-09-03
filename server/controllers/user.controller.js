const User = require("../models/user.model");
const { createSecretToken } = require("../config/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, createdAt } = req.body;
    const errors = {};

    // Validate firstName, lastName, email, password, and confirmPassword
    if (!firstName) {
      errors.firstName = "First Name is required";
    }
    if (!lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, errors: { email: "User already exists" } });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      createdAt,
    });

    const token = createSecretToken(user._id);
    res.status(201).json({ success: true, message: "User signed up successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};

    // Validate email and password
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "Incorrect email or password";
      return res.status(400).json({ errors });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      errors.password = "Incorrect email or password";
      return res.status(400).json({ errors });
    }

    const token = createSecretToken(user._id);
    res.status(201).json({ message: "User logged in successfully", success: true, token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports.readAll = (req, res) => {
  User.find()
    .then((allUser) => {
      res.json(allUser);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};