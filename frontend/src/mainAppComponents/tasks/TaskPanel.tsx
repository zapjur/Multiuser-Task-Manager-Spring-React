import './TaskStyles.css'
import ColoredDot from "../ColoredDot";
import CreateTaskButton from "../../buttons/CreateTaskButton";
import Task from "./Task";
import { useDrop } from 'react-dnd';
import {useTaskContext} from "../../context/TaskContext";

type TaskStatus = "To Do" | "Doing" | "In Review" | "Done";

interface TaskPanelProps {
    status: TaskStatus;
}

interface TaskProps {
    title: string;
    description: string;
    deadline: number[];
    id: number;
    status: string;
}

function TaskPanel({ status }: TaskPanelProps) {

    const { tasks, updateTaskStatus } = useTaskContext();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item: TaskProps, monitor) => {
            if (!monitor.didDrop() && item.status !== status) {
                updateTaskStatus(item.id, status);
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const statusColors: { [key in TaskStatus]: string } = {
        "To Do": "#f94144",
        "Doing": "#f8961e",
        "In Review": "#f9c74f",
        "Done": "#57cc99",
    };

    const filteredTasks = tasks.filter(task => task.status === status);

    return (
        <div className="taskPanel" ref={drop} style={{ backgroundColor: isOver ? 'lightgrey' : '' }}>
            <div className="taskStatus">
                <ColoredDot color={statusColors[status] || "#000000"}/>
                <h5>{status}</h5>
            </div>
            <div className="newTaskContainer">
                <CreateTaskButton status={status}/>
            </div>
            <div className="tasks">
                {filteredTasks.map(task => (
                    <Task key={task.id} task={task}/>
                ))}
            </div>
        </div>
    );
}

export default TaskPanel;
