"use client"; 

import { useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import RootLayout from "../../components/layout/RootLayout";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <RootLayout>
      <h1>Bem-vindo ao Dashboard</h1>
      <p>Esta é a sua área de administração.</p>
    </RootLayout>
  );
}
