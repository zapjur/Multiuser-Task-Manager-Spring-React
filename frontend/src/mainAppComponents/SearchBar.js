import React, { useState } from 'react';
import './mainAppStyles.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
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
