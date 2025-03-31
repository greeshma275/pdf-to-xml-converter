# PDF to XML Converter

## 📌 Project Overview

This is a full-stack web application that allows users to upload a PDF file and convert it into XML format. The project includes authentication, file upload, and conversion features.

## 🛠 Tech Stack

- **Frontend:** Next.js, React, CSS  
- **Backend:** NestJS, Multer  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Token)  

### 🔍 Technology Choices & Reasoning

- **Next.js:** Chosen for its performance optimizations and server-side rendering capabilities.  
- **NestJS:** Provides a structured backend framework with TypeScript support.  
- **PostgreSQL:** Ensures reliable storage of user data and conversion history.  
- **Multer:** Handles file uploads efficiently.  
- **JWT:** Used for secure authentication.  

## 🚀 Features

- User authentication (Register/Login)  
- PDF file upload  
- Convert PDF to XML  
- View converted files  
- Copy and download converted XML  
- Store conversion history in a database  
- Simple list view of previous conversions  

## 🎯 Challenge Level Implemented

**Level 1 Implementation** includes:

- Simple login/registration system (email/password)  
- PDF file upload functionality  
- Basic PDF-to-XML conversion that extracts text content  
- Display the converted XML on screen  
- Copy and download functionality for the XML  
- Simple list view of previous conversions  
- Store conversion history in a database  

## 📂 Project Structure

```
📦 pdf-to-xml-converter
├── 📂 backend
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
├── 📂 frontend
│   ├── pages/
│   ├── package.json
│   ├── next.config.js
│   ├── README.md
├── .gitignore
├── README.md
```

## 📌 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/pdf-to-xml-converter.git
cd pdf-to-xml-converter
```

### 2️⃣ Backend Setup

```sh
cd backend
npm install
npm run start
```

### 3️⃣ Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

## 🔗 API Endpoints

### **Auth Routes**

- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Login and receive JWT  

### **File Upload & Conversion**

- `POST /upload` – Upload a PDF file  
- `GET /converted/:fileId` – Retrieve converted XML file  

## 🛠 Approach to PDF-to-XML Conversion

The application extracts text content from the PDF and structures it into a simple XML format. The conversion process follows these steps:

1. **Extract text** from the uploaded PDF file.
2. **Format the extracted text** into an XML structure.
3. **Store the conversion history** in the database.
4. **Display the XML output** on the frontend.
5. **Provide options to copy and download** the XML file.

## 🔍 Assumptions & Limitations

- **Assumption:** The primary focus is text extraction, not images or complex layouts.  
- **Limitation:** Does not support OCR for scanned PDFs.  
- **Limitation:** XML structure is basic and may not match all use cases.  

## 🔮 Future Enhancements

- Add real-time conversion progress  
- Support for different file formats (DOCX, TXT, etc.)  
- Optimize XML output structure  
- Implement OCR for scanned PDFs  
- Improve UI/UX for better user experience  
