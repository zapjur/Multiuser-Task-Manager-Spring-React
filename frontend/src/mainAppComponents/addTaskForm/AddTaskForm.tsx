import './addTaskForm.css'
import CloseButton from "../../buttons/CloseButton";
import {useFormContext} from "../../context/FormContext";
import React from "react";
import AddTaskButton from "../../buttons/AddTaskButton";
import {request} from "../../axios_helper";

function AddTaskForm() {

    const { toggleTaskFormVisibility, currentStatus } = useFormContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const titleInput = form.elements.namedItem('title') as HTMLInputElement;
        const descriptionInput = form.elements.namedItem('description') as HTMLInputElement;

        const title = titleInput.value;
        const description = descriptionInput.value;
        const taskData = { title, description, status: currentStatus };

        try {
            const response = await request('post', '/tasks', taskData);
            if (response.status === 200 || response.status === 201) {
                console.log('Task został pomyślnie utworzony:', response.data);
                toggleTaskFormVisibility();
            } else {
                console.error('Nie udało się utworzyć tasku');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia tasku:', error);
        }

    };

    return (
        <div className="addTaskFormContainer">
            <h3>Add new task</h3>
            <CloseButton toggle={toggleTaskFormVisibility}/>
            <form className="projectInfoContainer" onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label>Title</label>
                    <input name="title" type="text" className="form-control"/>
                </div>
                <div className="inputContainer">
                    <label className="form-label">Description</label>
                    <input name="description" type="text" className="form-control"/>
                </div>
                <AddTaskButton type="submit"/>
            </form>
        </div>
    );
}

export default AddTaskForm;