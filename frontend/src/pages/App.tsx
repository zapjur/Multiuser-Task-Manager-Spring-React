import '../mainAppComponents/App.css';
import { FormContextProvider } from "../context/FormContext";
import MainAppPage from "../mainAppComponents/MainAppPage";
import {SelectedProjectProvider} from "../context/SelectedProjectContext";

function App(){

    return(
        <FormContextProvider>
            <SelectedProjectProvider>
                <MainAppPage/>
            </SelectedProjectProvider>
        </FormContextProvider>
    );
}

export default App;