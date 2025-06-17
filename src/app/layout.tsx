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
      <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WERZ70HF93"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WERZ70HF93');
</script>
      </head>
      <body>{children}</body>
    </html>
  )
} 