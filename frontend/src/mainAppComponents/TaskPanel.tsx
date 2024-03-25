import './mainAppStyles.css';
import ColoredDot from "./ColoredDot";

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
                <button className="newTaskButton">+</button>
            </div>
        </div>
    );
}

export default TaskPanel;
