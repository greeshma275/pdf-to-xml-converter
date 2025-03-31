import "./globals.css"; // Import CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>PDF to XML Converter</title>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/upload">Upload</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
