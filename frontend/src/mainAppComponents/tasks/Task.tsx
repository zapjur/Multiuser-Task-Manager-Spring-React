import './TaskStyles.css'

interface TaskProps {
    title: string;
    description: string;
}

function Task({ title, description } : TaskProps) {

    return (
        <div className="taskContainer">
            <h5>{title}</h5>
            <p>{description}</p>
        </div>
    );
}

export default Task;