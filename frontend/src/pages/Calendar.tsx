import React from 'react';
import CalendarBody from "../mainAppComponents/calendarBody";
import { FormContextProvider } from "../context/FormContext";
function Calendar() {
    return (
        <div>
            <FormContextProvider>
                <CalendarBody/>
            </FormContextProvider>
        </div>
    );
}

export default Calendar;