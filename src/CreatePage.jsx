import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const CreatePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        description: '',
    });

    // Take the text that is being typed and store it
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    // POST the task to the API once form has been submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Save task response from the API
                const newTask = await response.json();

                // Redirect to the details page of the newly created task
                navigate(`/TasksReact/details/${newTask._id}`);
            } else {
                console.error('Failed to create task:', response.status);
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="responsive-width max-w-2xl mx-auto mt-8 p-8 bg-gray-800 rounded-md shadow-md">
            <div className="flex justify-between border-b-2 border-gray-700 pb-4">
                <Link to="/TasksReact/" className="bg-gray-600 text-white py-2 px-6 rounded-md transition duration-300 hover:bg-gray-700">
                    &#8592;
                </Link>
            </div>
            <h1 className="mt-4 mb-4 text-3xl font-bold">Create New Task</h1>
            <form onSubmit={handleSubmit} autoComplete="off">
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
                    <button type="submit" className="bg-lime-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-lime-600">
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePage;
