import type { Metadata } from 'next'
import './globals.css'
import Nav from "@/app/components/Nav";
import Provider from "@/app/components/Provider";
export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

      <Provider>
          <div className={'main'}>
              <div className={'gradient'}/>
          </div>

          <main className={'app'}>
              <Nav/>
              {children}
          </main>
      </Provider>

      </body>
    </html>
  )
}
