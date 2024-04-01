import './TaskStyles.css'
import TaskPanel from "./TaskPanel";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type TaskStatus = "To Do" | "Doing" | "In Review" | "Done";

function TaskBord() {
    const statuses: TaskStatus[] = ["To Do", "Doing", "In Review", "Done"];

    return (
        <DndProvider backend={HTML5Backend}>
          <div className="taskSectionContainer">
              <div className="taskBoardContainer">
                  {statuses.map(status => (
                      <TaskPanel key={status} status={status}/>
                  ))}
              </div>
          </div>
        </DndProvider>
    );
}

export default TaskBord;