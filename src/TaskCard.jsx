import React from 'react';
import {Link} from 'react-router-dom';

const TaskCard = ({task, getTasks}) => {

    //Sets the bookmark state of an item
    const toggleBookmark = async (event) => {
        // PreventDefault to stop the Link
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/tasks/${task.id}/bookmark`, {
                method: 'PATCH',
            });

            if (response.ok) {
                // Run getTasks again to reload the page
                getTasks();
            } else {
                console.error('Failed to toggle bookmark:', response.status);
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    return (
        <Link to={`/TasksReact/details/${task.id}`}>
            <div className="responsive-width bg-gray-800 p-4 rounded-md cursor-pointer transition duration-100 transform hover:scale-105 mb-4 relative">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-lime-400">{task.name}</h3>
                    <button
                        onClick={toggleBookmark}
                        className={`text-5xl transition duration-100 hover:text-lime-500 ${task.bookmark ? 'text-lime-500' : 'text-gray-500'}`}>
                        {task.bookmark ? '★' : '☆'}
                    </button>
                </div>
                <p className="text-gray-400">Status: {task.status}</p>
            </div>
        </Link>
    );
};

export default TaskCard;
