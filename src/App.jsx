import React, {useState, useEffect, useCallback} from 'react';
import TaskCard from './TaskCard';
import Pagination from './Pagination';
import {Link} from "react-router-dom";

function App() {
    const [tasks, setTasks] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    // Get the correct page of tasks from the API
    const getTasks = useCallback(async () => {
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
    }, [currentPage, tasksPerPage]);

    // GetTasks everytime one of the dependencies is updated ^
    useEffect(() => {
        getTasks();
    }, [getTasks]);

    // If there are no tasks yet, return Loading message
    if (!tasks) {
        return <div>Loading... <br/>If it takes too long try to refresh the page. <br/>(This app only works when my TasksAPI is turned on)</div>;
    }

    // Return the page
    return (
        <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
            <div className="sticky top-0 z-10 bg-black pb-6 pt-4 px-6">
                <div className="flex responsive-width">
                    <h1 className="text-4xl text-lime-400 font-bold mr-10">Tasks:</h1>
                    <Link to="/TasksReact/create" className="block w-full bg-lime-500 text-white text-center py-2 px-4 rounded-md transition duration-300 hover:bg-lime-600">
                        Create New Task
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-8 mb-10">

                {/*Map tasks and create a card for each*/}
                {tasks.map((task, index) => (
                    <TaskCard
                        key={index}
                        task={task}
                        getTasks={getTasks}
                    />
                ))}
            </div>

            {/*Create pagination and pass all of the imporant values*/}
            <div className="fixed bottom-0 p-4 px-6 bg-black text-center z-10">
                <Pagination
                    tasksPerPage={tasksPerPage}
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
