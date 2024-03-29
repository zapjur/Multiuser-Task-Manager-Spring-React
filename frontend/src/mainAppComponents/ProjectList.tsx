import React, { useEffect, useState } from 'react';
import { request } from '../axios_helper';
import './mainAppStyles.css'

interface Project {
    id: number;
    title: string;
    description: string;
}

const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);

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
    }, []);

    return (
        <div>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;