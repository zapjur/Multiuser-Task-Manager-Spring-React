import React, { useState, useEffect } from 'react';
import {request} from "../../axios_helper";


interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await request("get", "/tasks");
                setTasks(response.data);

            } catch (error) {
                console.error('Błąd podczas pobierania zadań:', error);
            }
        };
        fetchTasks();
    }, []);



    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>{task.status}</p>
                        <p>{task.deadline}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default TaskList;