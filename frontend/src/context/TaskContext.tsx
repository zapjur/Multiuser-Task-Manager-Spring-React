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
    assignedUsers: string[];
}

interface TaskContextType {
    tasks: Task[];
    fetchTasksForProject: (projectId: number) => Promise<void>;
    addTask: (newTask: Task) => void;
    updateTaskStatus: (taskId: number, newStatus: string) => void;
    updateTask: (updatedTask: Task) => Promise<void>;
    deleteTask: (taskId: number) => Promise<void>;
    removeUsersFromTasks: (projectId: number | null, selectedUsers: string[]) => void;

}

const defaultContextValue: TaskContextType = {
    tasks: [],
    fetchTasksForProject: async () => {},
    addTask: () => {},
    updateTaskStatus: () => {},
    updateTask: async () => {},
    deleteTask: async () => {},
    removeUsersFromTasks: () => {},
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

    const updateTask = async (updatedTask: Task) => {
        setTasks((prevTasks) => prevTasks.map(task => task.id === updatedTask.id ? {...updatedTask} : task));
    }

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

    const deleteTask = async (taskId: number) => {
        try {
            await request('delete', `/tasks/delete/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Problem with deleting the task:", error);
        }
    };

    const removeUsersFromTasks = (projectId: number | null, selectedUsers: string[]) => {
        if (projectId === null) return;

        setTasks(prevTasks => {
            const newTasks = prevTasks.map(task => {
                if (task.projectId === projectId) {
                    const newAssignedUsers = task.assignedUsers.filter(user => !selectedUsers.includes(user));
                    return {
                        ...task,
                        assignedUsers: newAssignedUsers
                    };
                }
                return task;
            });
            return newTasks;
        });
    };


    return (
        <TaskContext.Provider value={{
            tasks,
            fetchTasksForProject,
            addTask,
            updateTaskStatus,
            updateTask,
            deleteTask,
            removeUsersFromTasks,
        }}>
            {children}
        </TaskContext.Provider>
    );
};
