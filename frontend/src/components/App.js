import './App.css';
import AppContent from "./AppContent.js";

function App(){

    return(
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <AppContent/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;