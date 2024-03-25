import React, { createContext, useContext, useState, ReactNode } from 'react';

export const FormContext = createContext<{
    isFormVisible: boolean;
    toggleFormVisibility: () => void;
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

    const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);

    return (
        <FormContext.Provider value={{ isFormVisible, toggleFormVisibility }}>
            {children}
        </FormContext.Provider>
    );
};
