const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc: Register new user
// @route: POST /api/users
// @access: Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Validate fields
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}
	// res.json({ message: "Register User" });

	// Check if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists, please login");
	}

	// // Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// // Create new user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	// Return new user data
	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc: Authenticate/Login a user
// @route: POST /api/users/login
// @access: Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email });

	// Validate user credentials: email and password
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
	res.json({ message: "Login user" });
});
// @desc: Get user data
// @route: POST /api/users
// @access: Private

const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
