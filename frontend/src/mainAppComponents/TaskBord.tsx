import './mainAppStyles.css'
import TaskPanel from "./TaskPanel";

type TaskStatus = "To Do" | "Doing" | "In Review" | "Done";

function TaskBord() {
    const statuses: TaskStatus[] = ["To Do", "Doing", "In Review", "Done"];

    return (
      <div className="taskSectionContainer">
          <div className="taskBoardContainer">
              {statuses.map(status => (
                  <TaskPanel key={status} status={status}/>
              ))}
          </div>
      </div>
    );
}

export default TaskBord;