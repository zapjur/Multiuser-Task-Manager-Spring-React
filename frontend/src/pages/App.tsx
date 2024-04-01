import '../mainAppComponents/App.css';
import { FormContextProvider } from "../context/FormContext";
import MainAppPage from "../mainAppComponents/MainAppPage";
import {ProjectProvider} from "../context/ProjectContext";
import {TaskProvider} from "../context/TaskContext";

function App(){

    return(
        <FormContextProvider>
            <ProjectProvider>
                <TaskProvider>
                    <MainAppPage/>
                </TaskProvider>
            </ProjectProvider>
        </FormContextProvider>
    );
}

export default App;