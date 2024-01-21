import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import TaskCard from './TaskCard';
import Pagination from './Pagination';
import {Link} from "react-router-dom";

function App() {
    const [tasks, setTasks] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const getTasks = async () => {
        try {
            const response = await fetch(`http://localhost:8000/tasks?start=${(currentPage - 1) * tasksPerPage + 1}&limit=${tasksPerPage}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data && Array.isArray(data.items)) {
                    setTasks(data.items);
                    setTotalPages(data.pagination.totalPages);
                } else {
                    console.error("Invalid data format received:", data);
                }
            } else {
                console.error("Failed to fetch tasks:", response.status);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getTasks();
    }, [currentPage, tasksPerPage]);

    if (!tasks) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
            <SearchBar/>
            <Link to="/create" className="mt-4 bg-lime-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-lime-600">
                Create New Task
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-8">

                {tasks.map((task, index) => (
                    <TaskCard key={index} task={task}/>
                ))}
            </div>
            <div className="mt-auto">
                <Pagination
                    tasksPerPage={tasksPerPage}
                    totalTasks={totalPages * tasksPerPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    setTasksPerPage={setTasksPerPage}
                />
            </div>
        </div>
    );
}

export default App;
