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

const ProjectList = () => {

    const { projects, selectProject, setProjects } = useProjectContext();

    const { fetchTasksForProject } = useTaskContext();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await request('get', '/projects');
                if (response.status === 200) {
                    setProjects(response.data);
                } else {
                    console.error('Nie udało się pobrać projektów');
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania projektów:', error);
            }
        };

        fetchProjects();
    }, [setProjects]);

    const handleProjectClick = async (projectId: number) => {
        selectProject(projectId);
        await fetchTasksForProject(projectId);
    };

    return (
        <div className="projectList">
            <ul>
                {projects.map(project => (
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

export default ProjectList;