import './NewProjectForm.css';
import {useFormContext} from "../../context/FormContext";
import CloseButton from "../../buttons/CloseButton";
import AddMemberButton from "../../buttons/AddMemberButton";
import React from "react";
import CreateProjectButton from "../../buttons/CreateProjectButton";



function NewProjectForm() {

    const { toggleFormVisibility } = useFormContext();

    const handleSubmitAddMember = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return(
        <div className="containerNewProjectForm">
            <h3>Create new project</h3>
            <CloseButton toggle={toggleFormVisibility}/>
            <div className="projectInfoContainer">
                <div className="inputContainer">
                    <label>Title</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="inputContainer">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="inputContainer">
                    <form onSubmit={handleSubmitAddMember}>
                        <label className="form-label">Add member</label>
                        <input type="text" className="form-control"/>
                        <div className="addMemberButton">
                            <AddMemberButton type="submit"/>
                        </div>
                    </form>
                </div>
                <CreateProjectButton/>
            </div>
        </div>
    )
}

export default NewProjectForm;