import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
    return (
        <Link to={`/details/${task.id}`}>
            <div className="w-30vw bg-gray-800 p-4 rounded-md cursor-pointer transition duration-300 transform hover:scale-105 mb-4">
                <h3 className="text-xl font-semibold text-lime-500 mb-2">{task.name}</h3>
                <p className="text-gray-400">{task.status}</p>
            </div>
        </Link>
    );
};

export default TaskCard;
