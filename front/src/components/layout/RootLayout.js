"use client";

import { useEffect, useState } from "react";
import "../../app/globals.css";
import Header from "../common/Header";
import { checkRouterPrivate } from "../../util/checkRouterPrivate";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = checkRouterPrivate(); 
    if (!auth) {
      router.push('/login'); 
    } else {
      setLoading(false); 
    }
  }, [router]);

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>; 
  }

  return (
    <html lang="pt-br">
      <body className="flex flex-col gap-4 h-screen w-screen overflow-auto px-10">
        <Header />
        {children}
      </body>
    </html>
  );
}
