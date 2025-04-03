"use client";

import { useEffect, useState } from "react";
import "./globals.css"; 
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {  // ✅ Ensure `window` is available
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);

      const isFirstLoad = sessionStorage.getItem("firstLoad");
      if (!isFirstLoad) {
        sessionStorage.setItem("firstLoad", "true");
        setTimeout(() => {
          setShowHome(false);
          router.push("/login");
        }, 5000);
      } else {
        setShowHome(false);
      }
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
          {showHome ? <h1>Welcome to Home Page</h1> : children}
        </main>
      </body>
    </html>
  );
}
