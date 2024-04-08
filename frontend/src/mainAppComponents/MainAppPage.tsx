import SideBar from "./SideBar";
import ProjectsSideBar from "./ProjectsSideBar";
import TopPanel from "./TopPanel";
import TaskBord from "./tasks/TaskBord";
import { useFormContext } from '../context/FormContext';
import NewProjectForm from "./forms/NewProjectForm";
import AddTaskForm from "./forms/AddTaskForm";
import StartPanel from "./StartPanel";
import {useProjectContext} from "../context/ProjectContext";
import AddMemberForm from "./forms/AddMemberForm";
import EditTaskForm from "./forms/EditTaskForm";
import EditProjectForm from "./forms/EditProjectForm";

function MainAppPage() {

    const { isFormVisible, isTaskFormVisible, isMemberFormVisible, isEditTaskFormVisible, isEditProjectFormVisible } = useFormContext();
    const { selectedProjectId } = useProjectContext();

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
                {isMemberFormVisible && <AddMemberForm />}
                {isEditTaskFormVisible && <EditTaskForm />}
                {isEditProjectFormVisible && <EditProjectForm />}
            </div>
        </div>
);
}

export default MainAppPage;