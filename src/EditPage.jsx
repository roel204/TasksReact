import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditPage = () => {
    const { taskId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        description: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
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
                    setFormData(data);
                } else {
                    console.error('Failed to fetch task details:', response.status);
                }
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Redirect to the details page of the updated task
                navigate(`/details/${taskId}`);
            } else {
                console.error('Failed to update task:', response.status);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="responsive-width max-w-2xl mx-auto mt-8 p-8 bg-gray-800 rounded-md shadow-md">
            <div className="flex justify-between border-b-2 border-gray-700 pb-4">
                <Link to={`/details/${taskId}`} className="bg-gray-600 text-white py-2 px-6 rounded-md transition duration-300 hover:bg-gray-700">
                    &#8592;
                </Link>
            </div>
            <h1 className="mt-4 mb-4 text-3xl font-bold">Edit Task</h1>
            <form onSubmit={handleUpdate} autoComplete="off">
                <div className="mb-4">
                    <label className="block text-gray-500 mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-lime-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-500 mb-1" htmlFor="status">
                        Status
                    </label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-lime-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-500 mb-1" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full h-64 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-lime-500"
                    />
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-lime-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-lime-600"
                    >
                        Update Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPage;
