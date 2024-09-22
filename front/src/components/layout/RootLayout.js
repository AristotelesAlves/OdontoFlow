
import "../../app/globals.css";
import Header from "../common/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col gap-4 h-screen w-screen overflow-auto px-10">
        <Header/>
        {children}
      </body>
    </html>
  )
}
