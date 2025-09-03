import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div className="py-4 flex items-center justify-between">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        이전
      </button>
      <span className="text-gray-700">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages - 1}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
