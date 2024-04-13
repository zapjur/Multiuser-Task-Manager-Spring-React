import CloseButton from "../../buttons/CloseButton";
import {Autocomplete, TextField} from "@mui/material";
import EditTaskButton from "../../buttons/EditTaskButton";
import React, {useEffect, useState} from "react";
import {useProjectContext} from "../../context/ProjectContext";
import {useFormContext} from "../../context/FormContext";
import { request } from "../../axios_helper";
import {useTaskContext} from "../../context/TaskContext";
import Button from '@mui/material/Button';


function EditTaskForm() {

    const { selectedProjectId, projects} = useProjectContext();
    const { toggleEditTaskFormVisibility, editingTask } = useFormContext();
    const { updateTask, deleteTask } = useTaskContext();

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    let defaultValueForDatetimeLocal = "";

    if (editingTask?.deadline && editingTask.deadline.length >= 5) {
        const [year, month, day, hour, minute] = editingTask.deadline;
        const deadlineDate = new Date(year, month - 1, day, hour, minute);

        defaultValueForDatetimeLocal = deadlineDate.toISOString().slice(0, 16);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            deadline: formData.get('deadline') || undefined,
            assignedUsers: selectedUsers
        };

        try {
            const response = await request('put', `/tasks/edit/${editingTask?.id}`, taskData);

            if (response.status !== 200) {
                throw new Error('Problem with updating the task');
            }
            updateTask(response.data);
            console.log('Task updated successfully');
            toggleEditTaskFormVisibility();
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    useEffect(() => {
        if (editingTask) {
            setSelectedUsers(editingTask.assignedUsers || []);
        }
    }, [editingTask]);

    const handleDelete = () => {
        if (editingTask?.id && window.confirm("Czy na pewno chcesz usunąć ten projekt?")) {
            deleteTask(editingTask.id);
            toggleEditTaskFormVisibility();
        }
    }

    return (
        <div className="formContainer">
            <h3>Edit task</h3>
            <CloseButton toggle={toggleEditTaskFormVisibility}/>
            <form className="projectInfoContainer" onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label>Title</label>
                    <input name="title" type="text" className="form-control" defaultValue={editingTask?.title}/>
                </div>
                <div className="inputContainer">
                    <label className="form-label">Description</label>
                    <input name="description" type="text" className="form-control" defaultValue={editingTask?.description}/>
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
                    <input name="deadline" type="datetime-local" className="form-control" defaultValue={defaultValueForDatetimeLocal}/>
                </div>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '56px',
                        width: '100%',
                        height: '100%',
                        textTransform: 'none',
                        fontSize: '1rem',
                    }}
                    onClick={handleDelete}
                >
                    Delete task
                </Button>
                <EditTaskButton type="submit"/>
            </form>
        </div>
    );
}

export default EditTaskForm;