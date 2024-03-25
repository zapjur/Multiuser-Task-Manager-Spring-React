import React, { useState } from 'react';
import './mainAppStyles.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <form className="searchBar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search projects"
                    value={searchTerm}
                    onChange={handleChange}
                    className="searchInput"
                />
            </form>
        </div>
    );
};

export default SearchBar;
