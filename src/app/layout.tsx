import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from "@/app/components/NavBar";
import MyProfilePic from "@/app/components/MyProfilePic";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Tetiana's blog",
  description: 'Created by Tetiana Korsun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'bg-slate-800'} >
      <NavBar/>
      <MyProfilePic/>
      {children}</body>
    </html>
  )
}
