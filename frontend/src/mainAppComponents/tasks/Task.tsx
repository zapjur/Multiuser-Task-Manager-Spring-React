import './TaskStyles.css'
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useDrag } from 'react-dnd';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useFormContext} from "../../context/FormContext";

interface Task {
    title: string;
    description: string;
    deadline: number[];
    projectId: number;
    id: number;
    status: string;
    assignedUsers: string[];
}

interface TaskProps {
    task: Task;
}

function Task({ task }: TaskProps) {
    let formattedDate = "No deadline";

    const { toggleEditTaskFormVisibility, setEditingTask } = useFormContext();

    if (task.deadline && task.deadline.length >= 5) {
        const [year, month, day, hour, minute] = task.deadline;
        const deadlineDate = new Date(year, month - 1, day, hour, minute);

        formattedDate = deadlineDate.toLocaleDateString('en-EN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleEditButtonClick = () => {
        setEditingTask(task);
        toggleEditTaskFormVisibility();
    };

    return (
        <div className="taskContainer" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div className="taskTitleContainer">
                <h5>{task.title}</h5>
                <IconButton
                    sx ={{
                        color: 'black',
                    }}
                    onClick={handleEditButtonClick}
                >
                    <MoreVertIcon/>
                </IconButton>

            </div>
            <p>{task.description}</p>
            <ul>
                {task.assignedUsers.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
            <div className="deadlineContainer">
                <ScheduleIcon/>
                <p>
                    {formattedDate}
                </p>
            </div>
        </div>
    );
}

export default Task;