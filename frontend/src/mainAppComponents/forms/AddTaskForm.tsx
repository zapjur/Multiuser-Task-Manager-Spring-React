import './formsStyles.css'
import CloseButton from "../../buttons/CloseButton";
import {useFormContext} from "../../context/FormContext";
import React, {useState} from "react";
import AddTaskButton from "../../buttons/AddTaskButton";
import {request} from "../../axios_helper";
import {useProjectContext} from "../../context/ProjectContext";
import {useTaskContext} from "../../context/TaskContext";
import {Autocomplete, TextField} from "@mui/material";

function AddTaskForm() {

    const { toggleTaskFormVisibility, currentStatus } = useFormContext();

    const { selectedProjectId, projects} = useProjectContext();

    const { addTask } = useTaskContext();

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const taskData = {
            projectId: selectedProjectId,
            title: formData.get('title'),
            description: formData.get('description'),
            status: currentStatus,
            deadline: formData.get('deadline') || undefined,
            assignedUsers: selectedUsers
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
        <div className="formContainer">
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
                    <Autocomplete
                        multiple
                        id="users-autocomplete"
                        options={selectedProject ? selectedProject.users : []}
                        value={selectedUsers}
                        onChange={(event, newValue) => {
                            setSelectedUsers(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Assign users"
                                placeholder="Users"
                            />
                        )}
                    />
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