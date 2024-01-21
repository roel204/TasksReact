import React from 'react';

const Pagination = ({ tasksPerPage, totalTasks, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="pagination flex justify-center items-center">
            <button
                className="mx-2 p-2 rounded-md bg-gray-500 text-gray-300"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                {'<'}
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`mx-2 p-2 rounded-md ${
                        currentPage === number ? 'bg-gray-700 text-white' : 'bg-gray-500 text-gray-300'
                    }`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className="mx-2 p-2 rounded-md bg-gray-500 text-gray-300"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                {'>'}
            </button>
        </div>
    );
};

export default Pagination;