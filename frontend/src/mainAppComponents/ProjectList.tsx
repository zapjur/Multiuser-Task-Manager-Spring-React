import React, { useEffect, useState } from 'react';
import { request } from '../axios_helper';
import './mainAppStyles.css';
import { useSelectedProject } from "../context/SelectedProjectContext";

interface Project {
    id: number;
    title: string;
    description: string;
}

const ProjectList = () => {

    const { projects, selectProject, setProjects } = useSelectedProject();

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

    return (
        <div className="projectList">
            <ul>
                {projects.map(project => (
                    <li
                        key={project.id}
                        onClick={() => selectProject(project.id)}
                    >
                        {project.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;