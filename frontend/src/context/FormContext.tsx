import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    projectId: number;
    deadline: number[];
    assignedUsers: string[];
}

export const FormContext = createContext<{
    isFormVisible: boolean;
    toggleFormVisibility: () => void;
    isTaskFormVisible: boolean;
    toggleTaskFormVisibility: (status?: string) => void;
    currentStatus: string;
    isMemberFormVisible: boolean;
    toggleMemberFormVisibility: () => void;
    isEditTaskFormVisible: boolean;
    toggleEditTaskFormVisibility: () => void;
    editingTask?: Task;
    setEditingTask: (task: Task | undefined) => void;
    isEditProjectFormVisible: boolean;
    toggleEditProjectFormVisibility: () => void;
    isDeleteMemberFormVisible: boolean;
    toggleDeleteMemberFormVisibility: () => void;
    isJoinProjectFormVisible: boolean;
    toggleJoinProjectFormVisibility: () => void;
} | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormContextProvider');
    }
    return context;
};

type FormContextProviderProps = {
    children: ReactNode;
};

export const FormContextProvider: React.FC<FormContextProviderProps> = ({ children }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');
    const [isMemberFormVisible, setIsMemberFormVisible] = useState(false);
    const [isEditTaskFormVisible, setIsEditTaskFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [isEditProjectFormVisible, setIsEditProjectFormVisible] = useState(false);
    const [isDeleteMemberFormVisible, setIsDeleteMemberFormVisible] = useState(false);
    const [isJoinProjectFormVisible, setIsJoinProjectFormVisible] = useState(false);

    const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);
    const toggleTaskFormVisibility = (status = '') => {
        setIsTaskFormVisible(!isTaskFormVisible);
        setCurrentStatus(status);
    }

    const toggleMemberFormVisibility = () => setIsMemberFormVisible(!isMemberFormVisible);

    const toggleEditTaskFormVisibility = () => setIsEditTaskFormVisible(!isEditTaskFormVisible);

    const toggleEditProjectFormVisibility = () => setIsEditProjectFormVisible(!isEditProjectFormVisible);

    const toggleDeleteMemberFormVisibility = () => setIsDeleteMemberFormVisible(!isDeleteMemberFormVisible);

    const toggleJoinProjectFormVisibility = () => setIsJoinProjectFormVisible(!isJoinProjectFormVisible);


    return (
        <FormContext.Provider value={{
            isFormVisible,
            toggleFormVisibility,
            isTaskFormVisible,
            toggleTaskFormVisibility,
            currentStatus,
            isMemberFormVisible,
            toggleMemberFormVisibility,
            isEditTaskFormVisible,
            toggleEditTaskFormVisibility,
            editingTask,
            setEditingTask,
            isEditProjectFormVisible,
            toggleEditProjectFormVisibility,
            isDeleteMemberFormVisible,
            toggleDeleteMemberFormVisibility,
            isJoinProjectFormVisible,
            toggleJoinProjectFormVisibility
        }}>
            {children}
        </FormContext.Provider>
    );
};
