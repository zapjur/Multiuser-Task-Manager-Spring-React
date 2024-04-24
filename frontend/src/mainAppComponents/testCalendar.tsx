import React, { useEffect, useState } from "react";
import './mainCalendarStyles.css';
import { startOfWeek, endOfWeek, format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isValid, addMonths } from "date-fns";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import IconButton from "@mui/material/IconButton";
import { request } from "../axios_helper";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline: string;
}

function TestCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskList, setTaskList] = useState<Array<[string, string, string]>>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await request("get", "/tasks");
                setTasks(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania zadań:', error);
            }
        };
        fetchTasks();
    }, []);




    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    const daysOfWeek: string[] = [];

    for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
        daysOfWeek.push(format(day, "yyyy-MM-dd"));
    }

    const startOfMonthDate = startOfMonth(currentDate);
    const endOfMonthDate = endOfMonth(currentDate);
    const daysOfMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });
    const daysWithOffset: (Date | null)[] = [];
    const firstDayOfMonth = getDay(startOfMonthDate);
    for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
        daysWithOffset.push(null);
    }
    daysOfMonth.forEach(day => {
        daysWithOffset.push(day);
    });

    const changeMonthBack = () => {
        setCurrentDate(prevDate => addMonths(prevDate, -1));
    }
    const changeMonthForward = () => {
        setCurrentDate(prevDate => addMonths(prevDate, +1));
    }

    return (
        <div>
            <div className="topCalendar">
                <h2 className="monthName">{format(currentDate, "MMMM yyyy")}</h2>
                <div className="calendarButtons">
                    <IconButton
                        size="large"
                        sx={{
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#0073e6',
                            },
                        }}
                        onClick={changeMonthBack}
                    >
                        <ArrowBackIosRoundedIcon
                            fontSize="medium"
                            sx={{
                                color: '#343a40',
                            }}
                        />
                    </IconButton>
                    <IconButton
                        size="large"
                        sx={{
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#0073e6',
                            },
                        }}
                        onClick={changeMonthForward}
                    >
                        <ArrowForwardIosRoundedIcon
                            fontSize="medium"
                            sx={{
                                color: '#343a40',
                            }}
                        />
                    </IconButton>
                </div>
            </div>
            <div className="calendar">
                <div className="calendarHeader">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="calendarHeaderItem">
                            {format(new Date(day), 'EEEE')}
                        </div>
                    ))}
                </div>
                <div className="calendarBody">
                    {daysWithOffset.map((day, index) => (
                        <div key={index} className="calendarBodyItem">
                            {day && (
                                <div className="calendarEvent">
                                    <p>{format(day,"d")}</p>
                                    <div>
                                        <div>
                                            {tasks.map(task => {

                                                let taskDeadline = task.deadline
                                                if(taskDeadline === null) {
                                                    return null;
                                                }
                                                taskDeadline= task.deadline.toString();
                                                taskDeadline = taskDeadline.replace(/,/g, "");
                                                taskDeadline = taskDeadline.slice(0,-4);

                                                if (format(day,"yyyyMd") == taskDeadline) {
                                                    if(task.status === "Done"){
                                                        return (
                                                            <div key={task.id}>
                                                                <div className="EventTitleDone">
                                                                    <h4>{task.title}</h4>
                                                                </div>

                                                            </div>
                                                        );
                                                    }
                                                    if(task.status === "In Review"){
                                                        return (
                                                            <div key={task.id}>
                                                                <h4 className="EventTitleInReview">{task.title}</h4>

                                                            </div>
                                                        );
                                                    }
                                                    if(task.status === "Doing"){
                                                        return (
                                                            <div key={task.id}>
                                                                <h4 className="EventTitleDoing">{task.title}</h4>

                                                            </div>
                                                        );
                                                    }
                                                    if(task.status === "To Do"){
                                                        return (
                                                            <div key={task.id}>
                                                                <h4 className="EventTitleToDo">{task.title}</h4>

                                                            </div>
                                                        );
                                                    }

                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestCalendar;
