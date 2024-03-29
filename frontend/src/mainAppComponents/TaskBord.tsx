import './mainAppStyles.css'
import TaskPanel from "./TaskPanel";
import { useSelectedProject } from '../context/SelectedProjectContext';
import { useEffect, useState } from 'react';
import { request } from '../axios_helper';

type TaskStatus = "To Do" | "Doing" | "In Review" | "Done";

function TaskBord() {
    const statuses: TaskStatus[] = ["To Do", "Doing", "In Review", "Done"];

    const { selectedProjectId } = useSelectedProject();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (selectedProjectId) {
           /* const fetchTasks = async () => {
                try {
                    const response = await request('get', `/projects/${selectedProjectId}/tasks`);
                    if (response.status === 200) {
                        setTasks(response.data);
                    }
                } catch (error) {
                    console.error('Wystąpił błąd:', error);
                }
            };

            fetchTasks();*/
            console.log("zmiana projektu")
        }
    }, [selectedProjectId]);

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