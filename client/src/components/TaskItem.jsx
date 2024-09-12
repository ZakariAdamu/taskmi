import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";

const TaskItem = ({ task }) => {
	const dispatch = useDispatch();
	return (
		<div className="task">
			<h2>{task.text}</h2>
			<div>{new Date(task.createdAt).toLocaleString("en-US")}</div>
			<button onClick={() => dispatch(deleteTask(task._id))} className="close">
				X
			</button>
		</div>
	);
};

export default TaskItem;
