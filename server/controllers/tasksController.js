const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");
const User = require("../models/userModel");

// @desc: Get tasks
// @route: GET /api/tasks
// @access: Private
const getTasks = asyncHandler(async (req, res) => {
	const tasks = await Task.find({ user: req.user.id });
	res.status(200).json(tasks);
});
// @desc: Add tasks
// @route: POST /api/tasks
// @access: Private
const addTasks = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add task");
	}

	const task = await Task.create({
		text: req.body.text,
		user: req.user.id,
	});

	res.status(200).json(task);
});
// @desc: Update tasks
// @route: PUT /api/tasks
// @access: Private
const updateTask = asyncHandler(async (req, res) => {
	const task = await Task.findById(req.params.id);

	if (!task) {
		res.status(400);
		throw new Error("Task not found");
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Ensure the logged-in user matches the task user
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedTask);
});
// @desc: Delete task
// @route: DELETE /api/tasks
// @access: Private
const deleteTask = asyncHandler(async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id);

	if (!task) {
		res.status(400);
		throw new Error("Task not found");
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Ensure the logged-in user matches the task user
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getTasks,
	addTasks,
	updateTask,
	deleteTask,
};
