import React, { createContext, ReactNode, useContext, useState } from 'react';
import { request } from "../axios_helper";

interface Project {
    id: number;
    title: string;
    description: string;
    usersLogin: string[];
}

interface ProjectProviderProps {
    children: ReactNode;
}

interface ProjectContextType {
    selectedProjectId: number | null;
    selectProject: (projectId: number | null) => void;
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    deleteProject: (projectId: number) => Promise<void>;
}

const defaultContextValue: ProjectContextType = {
    selectedProjectId: null,
    selectProject: () => {},
    projects: [],
    setProjects: () => {},
    deleteProject: async () => {},
};

const ProjectContext = createContext<ProjectContextType>(defaultContextValue);

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
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
        <ProjectContext.Provider value={{
            selectedProjectId,
            selectProject,
            projects,
            setProjects,
            deleteProject,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
