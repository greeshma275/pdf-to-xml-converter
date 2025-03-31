"use client";

import { useState, useEffect } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [history, setHistory] = useState<{ name: string; time: string; url: string }[]>([]);

  // Load history from localStorage when the component mounts
  useEffect(() => {
    const storedHistory = localStorage.getItem("conversionHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Function to update history in localStorage
  const updateHistory = (newHistory: { name: string; time: string; url: string }[]) => {
    setHistory(newHistory);
    localStorage.setItem("conversionHistory", JSON.stringify(newHistory));
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const xmlFileUrl = data.xmlFile; // Get XML file URL from backend
        const timestamp = new Date().toLocaleString();

        // Update history and persist in localStorage
        const newHistory = [...history, { name: file.name, time: timestamp, url: xmlFileUrl }];
        updateHistory(newHistory);

        // Automatically download the converted XML file
        const a = document.createElement("a");
        a.href = xmlFileUrl;
        a.download = "converted.xml";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        alert("File converted to XML and downloaded!");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <>
      <div className="container">
        <h2>Upload PDF</h2>
        <form onSubmit={handleFileUpload}>
          {/* Custom File Upload Button */}
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />

          <button type="submit">Upload & Convert</button>
        </form>

        <h3>Conversion History</h3>
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
              <span>{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button Placed Outside the Container */}
      <button className="logout-btn" onClick={() => (window.location.href = "/login")}>
        Logout
      </button>
    </>
  );
}
