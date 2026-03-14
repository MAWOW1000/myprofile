import type { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CursorFollower from '../components/CursorFollower'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-brand-black min-h-screen">
      <CursorFollower />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
