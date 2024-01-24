import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

const DetailsPage = () => {
    const {taskId} = useParams();
    const [task, setTask] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to delete task:', response.status);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const showConfirmationPopup = () => {
        setShowConfirmation(true);
    };

    const hideConfirmationPopup = () => {
        setShowConfirmation(false);
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="responsive-width max-w-2xl mx-auto mt-8 p-8 bg-gray-800 rounded-md shadow-md">
                <div className="flex justify-between border-b-2 border-gray-700 pb-4">
                    <Link to="/" className="bg-gray-600 text-white py-2 px-6 rounded-md transition duration-300 hover:bg-gray-700">
                        &#8592;
                    </Link>
                    <Link to={`/edit/${task._id}`} className="bg-blue-500 text-white py-2 px-6 rounded-md transition duration-300 hover:bg-blue-600">
                        Edit
                    </Link>
                    <button onClick={showConfirmationPopup} className="bg-red-500 text-white py-2 px-6 rounded-md transition duration-300 hover:bg-red-600">
                        Delete
                    </button>
                </div>
                <h1 className="text-3xl font-bold mb-4 mt-6">{task.name}</h1>
                <p className="text-gray-500 mb-4">{`Status: ${task.status}`}</p>
                <p className="text-gray-300" style={{ whiteSpace: 'pre-line' }}>{`${task.description}`}</p>
                <div className="mt-8"></div>
            </div>
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
                    <div className="bg-gray-800 p-8 rounded-md">
                        <p className="mb-4">Are you sure you want to delete this task?</p>
                        <div className="flex justify-center items-center">
                            <button onClick={hideConfirmationPopup} className="bg-gray-500 text-white py-2 px-4 rounded-md mr-4 transition duration-300 hover:bg-gray-600">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md ml-4 transition duration-300 hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailsPage;
