import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='bg-black w-full h-screen overflow-hidden flex justify-center items-center text-white flex-col gap-2'>
      <h2>Página não encontrada</h2>
      <p className='text-9xl font-bold'>404</p>
      <Link className='p-2 bg-blue text-white text-xl hover:bg-blue hover:bg-opacity-70 rounded-xl' href="/dashboard">Voltar para Dashboard</Link>    
    </div>
  )
}