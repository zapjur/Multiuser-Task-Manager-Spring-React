import React, { createContext, ReactNode, useContext, useState } from 'react';
import { request } from "../axios_helper";

interface Project {
    id: number;
    title: string;
    description: string;
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
}

const defaultContextValue: SelectedProjectContextType = {
    selectedProjectId: null,
    selectProject: () => {},
    projects: [],
    setProjects: () => {},
    deleteProject: async () => {},
};

const SelectedProjectContext = createContext<SelectedProjectContextType>(defaultContextValue);

export const useSelectedProject = () => useContext(SelectedProjectContext);

export const SelectedProjectProvider: React.FC<SelectedProjectProviderProps> = ({ children }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

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

    return (
        <SelectedProjectContext.Provider value={{ selectedProjectId, selectProject, projects, setProjects, deleteProject }}>
            {children}
        </SelectedProjectContext.Provider>
    );
};
