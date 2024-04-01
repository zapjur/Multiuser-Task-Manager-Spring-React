import React, { createContext, ReactNode, useContext, useState } from 'react';
import { request } from "../axios_helper";

interface Project {
    id: number;
    title: string;
    description: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    projectId: number;
    deadline: number[];
}

interface SelectedProjectProviderProps {
    children: ReactNode;
}

interface SelectedProjectContextType {
    selectedProjectId: number | null;
    selectProject: (projectId: number | null) => void;
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    deleteProject: (projectId: number) => Promise<void>;
    tasks: Task[];
    fetchTasksForProject: (projectId: number) => Promise<void>;
    addTask: (newTask: Task) => void;
    updateTaskStatus: (taskId: number, newStatus: string) => void;

}

const defaultContextValue: SelectedProjectContextType = {
    selectedProjectId: null,
    selectProject: () => {},
    projects: [],
    setProjects: () => {},
    deleteProject: async () => {},
    tasks: [],
    fetchTasksForProject: async () => {},
    addTask: () => {},
    updateTaskStatus: () => {},
};

const SelectedProjectContext = createContext<SelectedProjectContextType>(defaultContextValue);

export const useSelectedProject = () => useContext(SelectedProjectContext);

export const SelectedProjectProvider: React.FC<SelectedProjectProviderProps> = ({ children }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    const selectProject = (projectId: number | null) => {
        setSelectedProjectId(projectId);
    };

    const deleteProject = async (projectId: number) => {
        try {
            await request('delete', `/projects/${projectId}`);

            setProjects((prevProjects: Project[]) => prevProjects.filter(project => project.id !== projectId));

            if (selectedProjectId === projectId) {
                setSelectedProjectId(null);
            }
        } catch (error) {
            console.error("Nie udało się usunąć projektu", error);
        }
    };


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
        <SelectedProjectContext.Provider value={{
            selectedProjectId,
            selectProject,
            projects,
            setProjects,
            deleteProject,
            tasks,
            fetchTasksForProject,
            addTask,
            updateTaskStatus,
        }}>
            {children}
        </SelectedProjectContext.Provider>
    );
};
