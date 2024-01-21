import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetailsPage = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        // Fetch the specific task based on the taskId
        const fetchTaskDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTask(data);
                } else {
                    console.error('Failed to fetch task details:', response.status);
                }
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-gray-800 rounded-md shadow-md">
            <Link to="/" className="bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-700">
                &#8592;
            </Link>
            <h1 className="text-3xl font-bold mb-4 mt-4">{task.name}</h1>
            <p className="text-gray-500 mb-4">{`Status: ${task.status}`}</p>
            <p className="text-gray-300">{`Description: ${task.description || 'N/A'}`}</p>
            <div className="mt-8">
            </div>
        </div>
    );
};

export default DetailsPage;
