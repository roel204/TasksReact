import React from 'react';

const Pagination = ({ tasksPerPage, totalTasks, currentPage, setCurrentPage, setTasksPerPage }) => {
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const options = [2, 5, 10, 25];

    return (
        <div className="pagination flex justify-center items-center">
            <button
                className="mx-2 p-2 rounded-md bg-gray-600 text-gray-300"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                {'<'}
            </button>

            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`mx-2 p-2 rounded-md ${
                        currentPage === number ? 'bg-gray-800 text-white' : 'bg-gray-600 text-gray-300'
                    }`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </button>
            ))}

            <button
                className="mx-2 p-2 rounded-md bg-gray-600 text-gray-300"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                {'>'}
            </button>

            <select
                className="mx-2 p-2 rounded-md bg-gray-600 text-white"
                value={tasksPerPage}
                onChange={(e) => {
                    setTasksPerPage(Number(e.target.value))
                    setCurrentPage(1);
                }}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Pagination;
