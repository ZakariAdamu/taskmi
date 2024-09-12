import axios from "axios";

const API_URL = "/api/tasks/";

// Create new task
const createTask = async (taskData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await axios.post(API_URL, taskData, config);
		return response.data;
	} catch (error) {
		console.error("Error creating task:", error);
		throw error;
	}
};
// Get user tasks
const getTasks = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await axios.get(API_URL, config);
		return response.data;
	} catch (error) {
		console.error("Error getting tasks:", error);
		throw error;
	}
};

// Delete user task
const deleteTask = async (taskId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await axios.delete(API_URL + taskId, config);
		return response.data;
	} catch (error) {
		console.error("Error deleting task:", error);
		throw error;
	}
};

const taskService = {
	createTask,
	getTasks,
	deleteTask,
};

export default taskService;
