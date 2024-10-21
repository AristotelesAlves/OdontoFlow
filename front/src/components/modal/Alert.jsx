"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";

export default function Alert({ handleBtn, text, error = false }) {
    
    const audioRef = useRef(new Audio('/error.mp3'));

    useEffect(() => {
        audioRef.current.play()
    },[])

    const frame = {
        
    }

    return (
        <div className={`bg-white shadow-lg border-2 border-l-4 top-2 rounded-l-xl ${error ? 'border-l-red': 'border-l-green-500'}  fixed right-0 p-2 flex items-center font-bold animate-shake`}>
            <button className="" onClick={handleBtn}>
                <X size={25} />
            </button>
            {text}
        </div>
    );
}
