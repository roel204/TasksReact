import React from 'react';

const SearchBar = () => {
    return (
        <div className="mb-8">
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-lime-500"
            />
        </div>
    );
};

export default SearchBar;
