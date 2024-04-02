import './formsStyles.css';
import {useFormContext} from "../../context/FormContext";
import CloseButton from "../../buttons/CloseButton";
import CreateProjectButton from "../../buttons/CreateProjectButton";
import {request} from '../../axios_helper';
import {useProjectContext} from "../../context/ProjectContext";
import React from "react";



function NewProjectForm() {

    const { projects, setProjects } = useProjectContext();
    const { toggleFormVisibility } = useFormContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const titleInput = form.elements.namedItem('title') as HTMLInputElement;
        const descriptionInput = form.elements.namedItem('description') as HTMLInputElement;

        const title = titleInput.value;
        const description = descriptionInput.value;

        try {
            const response = await request('post', '/projects', { title, description });
            if (response.status === 200 || response.status === 201) {
                console.log('Projekt został pomyślnie utworzony:', response.data);
                setProjects([...projects, response.data]);
                toggleFormVisibility();
            } else {
                console.error('Nie udało się utworzyć projektu');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia projektu:', error);
        }
    };

    return (
        <div className="formContainer">
            <h3>Create new project</h3>
            <CloseButton toggle={toggleFormVisibility}/>
            <form onSubmit={handleSubmit} className="projectInfoContainer">
                <div className="inputContainer">
                    <label>Title</label>
                    <input name="title" type="text" className="form-control"/>
                </div>
                <div className="inputContainer">
                    <label className="form-label">Description</label>
                    <input name="description" type="text" className="form-control"/>
                </div>
                <CreateProjectButton type="submit"/>
            </form>
        </div>
    )
}

export default NewProjectForm;