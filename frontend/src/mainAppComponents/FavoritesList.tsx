import React, { useEffect } from 'react';
import { request } from '../axios_helper';
import './mainAppStyles.css';
import { useProjectContext } from "../context/ProjectContext";
import {useTaskContext} from "../context/TaskContext";

interface Project {
    id: number;
    title: string;
    description: string;
}

const FavoritesList = () => {

    const { selectProject , favoriteProjects, setFavoriteProjects} = useProjectContext();

    const { fetchTasksForProject } = useTaskContext();

    useEffect(() => {
        const fetchFavoriteProjects = async () => {
            try {
                const response = await request('get', '/projects/favorites');
                if (response.status === 200) {
                    setFavoriteProjects(response.data);
                } else {
                    console.error('Nie udało się pobrać ulubionych projektów');
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania ulubionych projektów:', error);
            }
        };

        fetchFavoriteProjects();
    }, [setFavoriteProjects]);


    const handleProjectClick = async (projectId: number) => {
        selectProject(projectId);
        await fetchTasksForProject(projectId);
    };

    return (
        <div className="projectList">
            <ul>
                {favoriteProjects.map(project => (
                    <li
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                    >
                        {project.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesList;