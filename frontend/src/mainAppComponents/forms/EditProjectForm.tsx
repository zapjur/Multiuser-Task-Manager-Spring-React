import './formsStyles.css';
import {useFormContext} from "../../context/FormContext";
import CloseButton from "../../buttons/CloseButton";
import React from "react";
import EditProjectButton from "../../buttons/EditProjectButton";
import {useProjectContext} from "../../context/ProjectContext";


function EditProjectForm() {


    const { toggleEditProjectFormVisibility } = useFormContext();
    const { selectedProjectId, projects, editProject } = useProjectContext();

    const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const updatedProjectData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
        };
        if(selectedProject) {
            editProject(selectedProject, updatedProjectData);
        }
    };

    return (
        <div className="formContainer">
            <h3>Edit project</h3>
            <CloseButton toggle={toggleEditProjectFormVisibility}/>
            <form onSubmit={handleSubmit} className="projectInfoContainer">
                <div className="inputContainer">
                    <label>Title</label>
                    <input name="title" type="text" className="form-control" defaultValue={selectedProject?.title}/>
                </div>
                <div className="inputContainer">
                    <label className="form-label">Description</label>
                    <input name="description" type="text" className="form-control" defaultValue={selectedProject?.description}/>
                </div>
                <EditProjectButton type="submit"/>
            </form>
        </div>
    )
}

export default EditProjectForm;