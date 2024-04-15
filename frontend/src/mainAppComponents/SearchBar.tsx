import './mainAppStyles.css';
import {Autocomplete, TextField} from "@mui/material";
import React, {useState} from "react";
import {useProjectContext} from "../context/ProjectContext";
import {useTaskContext} from "../context/TaskContext";

interface Project {
    id: number;
    title: string;
    description: string;
    users: string[];
}

const SearchBar = () => {

    const [value, setValue] = useState<Project | null>(null);

    const { projects, selectProject } = useProjectContext();
    const { fetchTasksForProject } = useTaskContext();

    const handleProjectClick = async (project: Project | null) => {
        if (!project) return;
        selectProject(project.id);
        await fetchTasksForProject(project.id);
        setValue(null);
    };

    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={projects}
                getOptionLabel={(option) => option.title}
                value={value}
                onChange={(event, newValue) => {
                    handleProjectClick(newValue);
                }}
                sx={{
                    '.MuiAutocomplete-inputRoot': {
                        color: 'black',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#cfe7fe',
                        }
                    },
                    '.MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'grey',
                            borderRadius: '16px',
                        },
                        '&:hover fieldset': {
                            borderColor: '#cfe7fe',
                        }
                    },
                    '.MuiInputLabel-outlined.Mui-focused': {
                        color: 'grey'
                    }
                }}
                renderInput={(params) => <TextField {...params} label="Search projects" />}
            />
        </div>
    );
};

export default SearchBar;
