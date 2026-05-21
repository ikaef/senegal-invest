export const metadata = {
  title: 'Sénégal Invest — Espace Investisseurs',
  description: 'Plateforme privée de présentation du projet agri-élevage Sénégal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f7f4; color: #1a1208; line-height: 1.6; }
          a { color: inherit; text-decoration: none; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
