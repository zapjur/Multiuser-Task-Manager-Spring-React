import SideBar from "./SideBar";
import ProjectsSideBar from "./ProjectsSideBar";
import TopPanel from "./TopPanel";
import TaskBord from "./TaskBord";
import { useFormContext } from '../context/FormContext';
import NewProjectForm from "./newProjectForm/NewProjectForm";

function MainAppPage() {

    const { isFormVisible } = useFormContext();

    return (
        <div className="mainAppContainer">
            <div className="col-md-2 sidePanel">
                <div className="col-md-3">
                    <SideBar/>
                </div>
                <div className="col-md-9">
                    <ProjectsSideBar/>
                </div>
            </div>
            <div className="col-md-10 mainPanel">
                <TopPanel/>
                <TaskBord/>
                <div>
                    {isFormVisible && <NewProjectForm />}
                </div>
            </div>
        </div>
);
}

export default MainAppPage;