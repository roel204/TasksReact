import React from 'react';

const Pagination = ({tasksPerPage, currentPage, totalPages, setCurrentPage, setTasksPerPage}) => {
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);
    const pageOptions = [2, 5, 10, 25];

    return (
        <div className="responsive-width flex flex-nowrap items-center justify-center">
            <div className="flex-1">
                <select
                    className="block p-3 rounded-md bg-gray-600 text-white cursor-pointer"
                    value={tasksPerPage}
                    onChange={(e) => {
                        setTasksPerPage(Number(e.target.value))
                        setCurrentPage(1);
                    }}>

                    {pageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <button
                    className="mr-7 p-3 rounded-md bg-gray-700 text-gray-300 transition duration-100 hover:bg-lime-600"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}>
                    {'<'}
                </button>

                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`mx-2 p-3 rounded-md ${
                            currentPage === number ? 'bg-lime-600 text-white' : 'bg-gray-600 text-gray-300 transition duration-100 hover:bg-gray-800'
                        }`}
                        onClick={() => setCurrentPage(number)}>
                        {number}
                    </button>
                ))}

                <button
                    className="ml-7 p-3 rounded-md bg-gray-700 text-gray-300 transition duration-100 hover:bg-lime-600"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}>
                    {'>'}
                </button>
            </div>
            <div className="flex-1"></div>
        </div>
    );
};

export default Pagination;
