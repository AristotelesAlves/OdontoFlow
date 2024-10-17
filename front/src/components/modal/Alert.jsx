"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";

export function Alert({ handleBtn }) {
    
    const audioRef = useRef(new Audio('/error.mp3'));

    useEffect(() => {
        audioRef.current.play()
    },[])

    return (
        <div className="bg-black text-white border-t-4 border-red p-5 absolute right-0 top-10 flex items-center font-bold animate-shake">
            <button className="p-2" onClick={handleBtn}>
                <X size={25} />
            </button>
            Usuário cancelado com sucesso
        </div>
    );
}
