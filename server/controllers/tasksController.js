const asyncHandler = require("express-async-handler");

// @desc: Get tasks
// @route: GET /api/tasks
// @access: Private
const getTasks = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Get tasks" });
});
// @desc: Add tasks
// @route: POST /api/tasks
// @access: Private
const addTasks = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add task");
	}
	res.status(200).json({ message: "Add tasks" });
});
// @desc: Update tasks
// @route: PUT /api/tasks
// @access: Private
const updateTask = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Update tasks" });
});
// @desc: Delete task
// @route: DELETE /api/tasks
// @access: Private
const deleteTask = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "Delete task" });
});

module.exports = {
	getTasks,
	addTasks,
	updateTask,
	deleteTask,
};
