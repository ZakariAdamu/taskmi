const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

// @desc: Get tasks
// @route: GET /api/tasks
// @access: Private
const getTasks = asyncHandler(async (req, res) => {
	const tasks = await Task.find();
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

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getTasks,
	addTasks,
	updateTask,
	deleteTask,
};
