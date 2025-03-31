# PDF to XML Converter

## 📌 Project Overview
This is a full-stack web application that allows users to upload a PDF file and convert it into XML format. The project includes authentication, file upload, and conversion features.

## 🛠 Tech Stack
- **Frontend:** Next.js, React, CSS
- **Backend:** NestJS, Multer
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)

## 🚀 Features
- User authentication (Register/Login)
- PDF file upload
- Convert PDF to XML
- View converted files
- Secure API endpoints

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

## 🎯 Future Enhancements
- Add real-time conversion progress
- Support for different file formats
- Optimize XML output structure
