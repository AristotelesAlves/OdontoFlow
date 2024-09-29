export const metadata = {
  title: 'Odonto Flow',
  description: 'description',
}

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  )
}
