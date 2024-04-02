import CloseButton from "../../buttons/CloseButton";
import React from "react";
import AddMemberButton from "../../buttons/AddMemberButton";
import {useFormContext} from "../../context/FormContext";
import {request} from "../../axios_helper";
import {useProjectContext} from "../../context/ProjectContext";


function AddMemberForm() {

    const { toggleMemberFormVisibility } = useFormContext();

    const { selectedProjectId } = useProjectContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const login = formData.get('username');

        if (!login) {
            console.error('Username jest wymagany.');
            return;
        }

        const userData = { login };

        try {
            const response = await request('put', `/projects/members/${selectedProjectId}`, userData);
            if (response.status === 200 || response.status === 201) {
                console.log('Dodawanie membera zakończone sukcesem ', response.data);
                toggleMemberFormVisibility();
            } else {
                console.error('Nie udało się dodać membera');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania membera:', error);
        }
    };

    return (
        <div className="formContainer">
            <h3>Add member</h3>
            <CloseButton toggle={toggleMemberFormVisibility}/>
            <form onSubmit={handleSubmit} className="projectInfoContainer">
                <div className="inputContainer">
                    <label>Username</label>
                    <input name="username" type="text" className="form-control"/>
                </div>
                <AddMemberButton type="submit"/>
            </form>
        </div>
    );
}

export default AddMemberForm;