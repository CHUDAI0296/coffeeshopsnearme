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
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WERZ70HF93"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WERZ70HF93');
          `,
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
} 