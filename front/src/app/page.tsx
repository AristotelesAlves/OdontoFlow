"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function page(){
    
    const router = useRouter();
    
    useEffect(() => {
        router.push('/dashboard'); 
    })

    return (
        <div className="h-screen w-screen flex items-center justify-center">
          <img src="/gif_loading.gif"/>
        </div>
    )
}