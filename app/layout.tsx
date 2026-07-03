'use client';

import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>II STRIPS - Premium Luxury Streetwear</title>
        <meta name="description" content="Strength is in Silence. Discipline is in Choice. Legacy is Earned." />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='50' font-size='80' fill='white' font-family='serif' text-anchor='middle' dominant-baseline='middle'>II</text></svg>" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
