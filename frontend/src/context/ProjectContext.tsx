import React, { createContext, ReactNode, useContext, useState } from 'react';
import { request } from "../axios_helper";
import {useFormContext} from "./FormContext";
import {useTaskContext} from "./TaskContext";

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
    editProject: (updatedProject: Project, updatedProjectData: { title: string; description: string; }) => void;
    addMemberToProject: (projectId: number | null, newUser: string) => void;
    removeMemberFromProject: (projectId: number | null, deleteUser: string[]) => void;
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
    editProject: () => {},
    addMemberToProject: () => {},
    removeMemberFromProject: () => {},
};

const ProjectContext = createContext<ProjectContextType>(defaultContextValue);

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);

    const { toggleEditProjectFormVisibility } = useFormContext();

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

    const editProject = async (updatedProject: Project, updatedProjectData: { title: string; description: string; }) => {
        try {
            const response = await request('put', `/projects/edit/${updatedProject.id}`, updatedProjectData);
            if(response.status === 200) {
                setProjects((prevProjects) => prevProjects.map(project =>
                    project.id === updatedProject.id ? {...project, ...updatedProjectData} : project
                ));
                setFavoriteProjects(prevFavorites => prevFavorites.map(project =>
                    project.id === updatedProject.id ? {...project, ...updatedProjectData} : project));
                toggleEditProjectFormVisibility();
            }
            else {
                console.error('Nie udało się zedytowac projektu');
            }
        }
        catch (error) {
            console.error('Wystąpił błąd podczas edycji projektu', error);
        }
    };

    const addMemberToProject = (projectId: number | null, newUser: string) => {
        if (projectId === null) return;
        setProjects(prevProjects => prevProjects.map(project =>
            project.id === projectId ? { ...project, users: [...project.users, newUser] } : project
        ));
    };

    const removeMemberFromProject = (projectId: number | null, removeUsers: string[]) => {
        if (projectId === null) return;
        setProjects(prevProjects => prevProjects.map(project =>
            project.id === projectId ? { ...project, users: project.users.filter(user => !removeUsers.includes(user)) } : project
        ));
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
            editProject,
            addMemberToProject,
            removeMemberFromProject,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
