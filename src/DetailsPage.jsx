import React from 'react';

const DetailsPage = ({ task }) => {
    // Your details page logic goes here
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
            <p className="text-gray-500">{`Status: ${task.status}`}</p>
            {/* Add more task details or interactions as needed */}
        </div>
    );
};

export default DetailsPage;