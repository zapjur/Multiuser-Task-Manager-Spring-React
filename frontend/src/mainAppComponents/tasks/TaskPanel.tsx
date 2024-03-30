import './TaskStyles.css'
import ColoredDot from "../ColoredDot";
import CreateTaskButton from "../../buttons/CreateTaskButton";
import Task from "./Task";

type TaskStatus = "To Do" | "Doing" | "In Review" | "Done";

interface TaskPanelProps {
    status: TaskStatus;
}

function TaskPanel({ status }: TaskPanelProps) {

    const statusColors: { [key in TaskStatus]: string } = {
        "To Do": "#f94144",
        "Doing": "#f8961e",
        "In Review": "#f9c74f",
        "Done": "#57cc99",
    };

    return (
        <div className="taskPanel">
            <div className="taskStatus">
                <ColoredDot color={statusColors[status] || "#000000"}/>
                <h5>{status}</h5>
            </div>
            <div className="newTaskContainer">
                <CreateTaskButton status={status}/>
            </div>
            <div className="tasks">
                <Task/>
            </div>
        </div>
    );
}

export default TaskPanel;
