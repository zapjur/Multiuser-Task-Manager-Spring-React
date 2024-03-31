import './TaskStyles.css'

interface Task {
    title: string;
    description: string;
    deadline: number[];
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

    return (
        <div className="taskContainer">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <p>{formattedDate}</p>
        </div>
    );
}

export default Task;