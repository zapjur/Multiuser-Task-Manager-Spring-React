import React, { createContext, useContext, useState, ReactNode } from 'react';

export const FormContext = createContext<{
    isFormVisible: boolean;
    toggleFormVisibility: () => void;
    isTaskFormVisible: boolean;
    toggleTaskFormVisibility: (status?: string) => void;
    currentStatus: string;
    isMemberFormVisible: boolean;
    toggleMemberFormVisibility: () => void;
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

    const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);
    const toggleTaskFormVisibility = (status = '') => {
        setIsTaskFormVisible(!isTaskFormVisible);
        setCurrentStatus(status);
    }

    const toggleMemberFormVisibility = () => setIsMemberFormVisible(!isMemberFormVisible);

    return (
        <FormContext.Provider value={{
            isFormVisible,
            toggleFormVisibility,
            isTaskFormVisible,
            toggleTaskFormVisibility,
            currentStatus,
            isMemberFormVisible,
            toggleMemberFormVisibility,
        }}>
            {children}
        </FormContext.Provider>
    );
};
