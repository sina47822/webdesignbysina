// Import global styles and fonts
import '../globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
 
const inter = Inter({ subsets: ['latin'] })
 
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function GlobalNotFound() {
  return (
        <div className='relative h-[100%] w-[100%] flex justify-center items-center'>
            <div className='py-[20vh]'>
                <h1>404 - Page Not Found</h1>
                <p>This page does not exist.</p>
            </div>
        </div>
  )
}