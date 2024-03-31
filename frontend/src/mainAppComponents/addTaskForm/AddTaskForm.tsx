import './addTaskForm.css'
import CloseButton from "../../buttons/CloseButton";
import {useFormContext} from "../../context/FormContext";
import React from "react";
import AddTaskButton from "../../buttons/AddTaskButton";
import {request} from "../../axios_helper";
import {useSelectedProject} from "../../context/SelectedProjectContext";
import task from "../tasks/Task";

function AddTaskForm() {

    const { toggleTaskFormVisibility, currentStatus } = useFormContext();

    const { selectedProjectId, addTask } = useSelectedProject();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const taskData = {
            selectedProjectId,
            title: formData.get('title'),
            description: formData.get('description'),
            status: currentStatus,
            deadline: formData.get('deadline') || undefined
        };

        try {
            const response = await request('post', '/tasks', taskData);
            if (response.status === 200 || response.status === 201) {
                console.log('Task został pomyślnie utworzony:', response.data);
                addTask(response.data)
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
                <div className="inputContainer">
                    <label>Deadline (optional)</label>
                    <input name="deadline" type="datetime-local" className="form-control"/>
                </div>
                <AddTaskButton type="submit"/>
            </form>
        </div>
    );
}

export default AddTaskForm;