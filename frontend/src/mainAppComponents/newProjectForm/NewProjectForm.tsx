import './NewProjectForm.css';
import {useFormContext} from "../../context/FormContext";
import CloseButton from "../../buttons/CloseButton";
import AddMemberButton from "../../buttons/AddMemberButton";
import React from "react";
import CreateProjectButton from "../../buttons/CreateProjectButton";
import {request} from '../../axios_helper';



function NewProjectForm() {

    const { toggleFormVisibility } = useFormContext();

    const handleSubmitAddMember = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

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
            } else {
                console.error('Nie udało się utworzyć projektu');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia projektu:', error);
        }
    };

    return(
        <div className="containerNewProjectForm">
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