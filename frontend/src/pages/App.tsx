import '../mainAppComponents/App.css';
import { FormContextProvider } from "../context/FormContext";
import MainAppPage from "../mainAppComponents/MainAppPage";

function App(){

    return(
        <FormContextProvider>
            <MainAppPage/>
        </FormContextProvider>
    );
}

export default App;