import CloseButton from "../../buttons/CloseButton";
import React from "react";
import {useFormContext} from "../../context/FormContext";
import JoinProjectButton from "../../buttons/JoinProjectButton";
import {request} from "../../axios_helper";


function JoinProjectForm() {

    const {toggleJoinProjectFormVisibility} = useFormContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const code = formData.get('code') as string;

        if (!code) {
            console.error('Kod jest wymagany.');
            return;
        }

        try {
            const response = await request('put', `/projects/invitationCode/${code}`);
            if (response.status === 200 || response.status === 201) {
                console.log('Dołączanie do projektu zakończone sukcesem', response.data);

            } else {
                console.error('Dołączenie do projektu nie powiodło się');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dołączania do projektu: ', error);
        }
    };

    return (
        <div className="formContainer">
            <h3>Join project</h3>
            <CloseButton toggle={toggleJoinProjectFormVisibility}/>
            <form onSubmit={handleSubmit} className="projectInfoContainer">
                <div className="inputContainer">
                    <label>Code</label>
                    <input name="code" type="text" className="form-control"/>
                </div>
                <JoinProjectButton type="submit"/>
            </form>
        </div>
    );
}

export default JoinProjectForm;