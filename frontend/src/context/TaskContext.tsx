import React, { createContext, ReactNode, useContext, useState } from 'react';
import { request } from "../axios_helper";

interface TaskProviderProps {
    children: ReactNode;
}

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    projectId: number;
    deadline: number[];
}

interface TaskContextType {
    tasks: Task[];
    fetchTasksForProject: (projectId: number) => Promise<void>;
    addTask: (newTask: Task) => void;
    updateTaskStatus: (taskId: number, newStatus: string) => void;

}

const defaultContextValue: TaskContextType = {
    tasks: [],
    fetchTasksForProject: async () => {},
    addTask: () => {},
    updateTaskStatus: () => {},
};

const TaskContext = createContext<TaskContextType>(defaultContextValue);

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasksForProject = async (projectId: number) => {
        try {
            const response = await request('get', `/tasks/project/${projectId}`);
            if (response.status === 200) {
                setTasks(response.data);
            } else {
                console.error('Nie udało się pobrać zadań dla projektu');
            }
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania zadań:", error);
        }
    };

    const addTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const updateTaskStatus = async (taskId: number, newStatus: string) => {
        setTasks((prevTasks) => prevTasks.map(task =>
            task.id === taskId ? {...task, status: newStatus} : task
        ));

        try {
            await request('put', `/tasks/${taskId}`, {status: newStatus});
        } catch (error) {
            console.error("Nie udało się zaktualizować zadania", error);
        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            fetchTasksForProject,
            addTask,
            updateTaskStatus,
        }}>
            {children}
        </TaskContext.Provider>
    );
};