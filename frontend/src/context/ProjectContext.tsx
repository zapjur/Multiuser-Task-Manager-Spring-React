import React, { createContext, ReactNode, useContext, useState } from 'react';
import { request } from "../axios_helper";

interface Project {
    id: number;
    title: string;
    description: string;
    users: string[];
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
    setFavoriteProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    favoriteProjects: Project[];
    addFavoriteProject: (project: Project) => void;
    removeFavoriteProject: (projectId: number) => void;
}

const defaultContextValue: ProjectContextType = {
    selectedProjectId: null,
    selectProject: () => {},
    projects: [],
    setProjects: () => {},
    deleteProject: async () => {},
    favoriteProjects: [],
    setFavoriteProjects: () => {},
    addFavoriteProject: () => {},
    removeFavoriteProject: () => {},
};

const ProjectContext = createContext<ProjectContextType>(defaultContextValue);

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);

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

    const addFavoriteProject = async (project: Project) => {
        try {
            const response = await request('put', `/projects/favorites/${project.id}`);
            if (response.status === 200) {
                setFavoriteProjects((prevFavorites) => [...prevFavorites, project]);
            } else {
                console.error('Nie udało się dodać projektu do ulubionych');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania projektu do ulubionych', error);
        }
    };

    const removeFavoriteProject = async (projectId: number) => {
        try {
            const response = await request('delete', `/projects/favorites/${projectId}`);
            if (response.status === 200) {
                setFavoriteProjects((prevFavorites) => prevFavorites.filter(project => project.id !== projectId));
            } else {
                console.error('Nie udało się usunąć projektu z ulubionych');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania projektu z ulubionych', error);
        }
    };

    return (
        <ProjectContext.Provider value={{
            selectedProjectId,
            selectProject,
            projects,
            setProjects,
            deleteProject,
            favoriteProjects,
            setFavoriteProjects,
            addFavoriteProject,
            removeFavoriteProject,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
