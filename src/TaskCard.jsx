import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div className="card bg-gray-800 p-4 rounded-md cursor-pointer transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-lime-500 mb-2">{task.name}</h3>
            <p className="text-gray-400">{task.status}</p>
        </div>
    );
};

export default TaskCard;
