"use client";

import { useEffect, useState } from "react";
import "../../app/globals.css";
import Header from "../common/Header";
import {get, remover} from '../../util/userDateStoredLocally'
import { useRouter } from "next/navigation";
import apiService from "../../serive/apiService";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function verifyAuthUser(token){
    const verify = await apiService({
      endPoint:'auth/verify',
      body: {
          token: token
      },
      method: 'POST'
    })

    if(verify != "Token is valid"){
        return false
    }
    return true
  }
    // Logica de verificação de autenticação do usuário para paginas privadas

  //   useEffect(() => {
  //     const user = get();
  //     if (user && user.token) {
  //         verifyAuthUser(user.token).then(isValid => {
  //             if (!isValid) {
  //                 remover()
  //                 router.push('/login');
  //             } else {
  //                 setLoading(false);
  //             }
  //         });
  //     } else {
  //         router.push('/login'); 
  //     }
  // }, [router]);

  // if (loading) {
  //   return (
  //     <div className="h-screen w-screen flex items-center justify-center">
  //       <img src="/gif_loading.gif"/>
  //     </div>
  //   ) 
  // }

  return (
    <html lang="pt-br">
      <body className="flex flex-col gap-4 h-screen w-screen overflow-auto px-10">
        <Header />
        {children}
      </body>
    </html>
  );
}
