import CloseButton from "../../buttons/CloseButton";
import {Autocomplete, TextField} from "@mui/material";
import React, { useState } from "react";
import {useProjectContext} from "../../context/ProjectContext";
import {useFormContext} from "../../context/FormContext";
import { request } from "../../axios_helper";
import Button from "@mui/material/Button";
import {useTaskContext} from "../../context/TaskContext";


function DeleteMemberForm() {

    const { selectedProjectId, projects, removeMemberFromProject} = useProjectContext();
    const { toggleDeleteMemberFormVisibility } = useFormContext();
    const { removeUsersFromTasks } = useTaskContext();
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await request('delete', `/projects/members/${selectedProjectId}`, selectedUsers);

            if (response.status !== 200) {
                throw new Error('Problem with updating the task');
            }

            removeMemberFromProject(selectedProjectId, selectedUsers);
            removeUsersFromTasks(selectedProjectId, selectedUsers);
            toggleDeleteMemberFormVisibility();

        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    return (
        <div className="formContainer">
            <h3>Delete Member</h3>
            <CloseButton toggle={toggleDeleteMemberFormVisibility}/>
            <form className="projectInfoContainer" onSubmit={handleSubmit}>
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
                                label="Users to delete"
                                placeholder="Users"
                            />
                        )}
                    />
                </div>
                <Button
                    variant="outlined"
                    color="error"
                    type="submit"
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '56px',
                        width: '100%',
                        height: '100%',
                        textTransform: 'none',
                        fontSize: '1rem',
                    }}

                >
                    Delete member
                </Button>
            </form>
        </div>
    );
}

export default DeleteMemberForm;