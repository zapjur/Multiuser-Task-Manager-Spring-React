import './TaskStyles.css'
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useDrag } from 'react-dnd';

interface Task {
    title: string;
    description: string;
    deadline: number[];
    id: number;
    status: string;
}

interface TaskProps {
    task: Task;
}

function Task({ task }: TaskProps) {
    let formattedDate = "No deadline";

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

    return (
        <div className="taskContainer" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
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