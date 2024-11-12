import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import React from "react";

export default function PagNavigation({ page, setPage }) {
    const totalPages = 4; // Número total de páginas

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <ul className="flex gap-1 items-center text-xl">
            <li>
                <button 
                    onClick={handlePrevious} 
                    className="p-1 rounded-full border w-9 h-9 flex items-center justify-center"
                    disabled={page === 1}
                >
                    <ArrowLeft />
                </button>
            </li>
            <li>
                <button
                    onClick={() => setPage(1)}
                    className={`p-1 rounded-full border w-9 h-9 flex items-center justify-center ${
                        page === 1 ? 'bg-cyan text-white' : ''
                    }`}
                >
                    1
                </button>
            </li>
            <li>
                <button
                    onClick={() => setPage(2)}
                    className={`p-1 rounded-full border w-9 h-9 flex items-center justify-center ${
                        page === 2 ? 'bg-cyan text-white' : ''
                    }`}
                >
                    2
                </button>
            </li>
            <li>
                <button
                    onClick={() => setPage(3)}
                    className={`p-1 rounded-full border w-9 h-9 flex items-center justify-center ${
                        page === 3 ? 'bg-cyan text-white' : ''
                    }`}
                >
                    3
                </button>
            </li>
            <li>
                <button
                    onClick={() => setPage(4)}
                    className={`p-1 rounded-full border w-9 h-9 flex items-center justify-center ${
                        page === 4 ? 'bg-cyan text-white' : ''
                    }`}
                >
                    4
                </button>
            </li>
            <li>
                <button 
                    onClick={handleNext} 
                    className="p-1 rounded-full border w-9 h-9 flex items-center justify-center"
                    disabled={page === totalPages}
                >
                    <ArrowRight />
                </button>
            </li>
        </ul>
    );
}
