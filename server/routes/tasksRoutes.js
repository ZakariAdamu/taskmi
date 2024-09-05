const express = require("express");
const {
	getTasks,
	addTasks,
	updateTask,
	deleteTask,
} = require("../controllers/tasksController");
const router = express.Router();

// Routes setup
router.route("/").get(getTasks).post(addTasks);
// **since get and post routes are same, we use the above one-line to represent them at once. same idea with put and delete routes**
// router.get("/", getTasks);
// router.post("/", addTasks);
router.route("/:id").put(updateTask).delete(deleteTask);
// router.put("/:id", updateTask);
// router.delete("/:id", deleteTask);

module.exports = router;
