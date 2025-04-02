"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css"; // Import CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Show Home for 5 seconds, then redirect to Login (only on first load)
    const isFirstLoad = sessionStorage.getItem("firstLoad");
    if (!isFirstLoad) {
      sessionStorage.setItem("firstLoad", "true"); // Prevent re-execution
      setTimeout(() => {
        setShowHome(false);
        router.push("/login");
      }, 5000);
    } else {
      setShowHome(false);
    }
  }, []);

  const handleUploadClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login first to upload files");
      router.push("/login");
    }
  };

  return (
    <html lang="en">
      <head>
        <title>PDF to XML Converter</title>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/upload" onClick={handleUploadClick}>Upload</a>
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                setIsLoggedIn(false);
                router.push("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </nav>
        <main>
          {showHome ? <a href="/">Home</a> : children}
        </main>
      </body>
    </html>
  );
}
