import SideBar from "./SideBar";
import ProjectsSideBar from "./ProjectsSideBar";
import TopPanel from "./TopPanel";
import TaskBord from "./tasks/TaskBord";
import { useFormContext } from '../context/FormContext';
import NewProjectForm from "./newProjectForm/NewProjectForm";
import AddTaskForm from "./addTaskForm/AddTaskForm";
import StartPanel from "./StartPanel";
import {useSelectedProject} from "../context/SelectedProjectContext";

function MainAppPage() {

    const { isFormVisible, isTaskFormVisible } = useFormContext();
    const { selectedProjectId } = useSelectedProject();

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
                {selectedProjectId === null ? (
                    <StartPanel/>
                ) : (
                    <>
                        <TopPanel/>
                        <TaskBord/>
                    </>
                )}
                {isFormVisible && <NewProjectForm />}
                {isTaskFormVisible && <AddTaskForm />}
            </div>
        </div>
);
}

export default MainAppPage;