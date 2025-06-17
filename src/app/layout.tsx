import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coffee Shops Near Me',
  description: 'Find the best coffee shops in your area',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 