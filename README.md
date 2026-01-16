# pHera Web Application

A mobile-first, multi-page web application developed during a Fullstack Developer internship at **pHera**.  
The app guides users through performing a pH test with a test strip, captures the test image using the camera, simulates pH analysis, and displays results. It also includes placeholders for extended user flows like registration, profile, and subscription.

---

## 🚀 Features Implemented

1. **Instruction Flow**  
   - Step-by-step guide explaining how to perform the pH test.
   - Multi-page navigation with clear UI/UX.

2. **Camera Integration & ArUco-Based Capture**  
   - Automatic detection of four ArUco markers.
   - Identifies the framed region and crops the image within the markers.
   - Prepares the app for future AI-based color and pH analysis.

3. **Low-Light Detection**  
   - Warns users if lighting is insufficient for accurate capture.
   - Suggests better illumination for reliable scanning.

4. **Result Display**  
   - Simulated backend returns placeholder pH values.
   - Displays results including pH level (Low / Normal / Elevated), timestamp, and visual scale.

5. **Extended User Flow (Placeholders)**  
   - Forms for additional user data.
   - Registration and login UI.
   - Profile pages and history tracking.
   - Library section and subscription screens.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router 7, React Hook Form, Axios, Swiper, Lottie React, React Webcam  
- **Build Tool:** Vite 7 with SWC React plugin  
- **Version Control:** GitHub (initially personal, transferred to pHera organization)  
- **Design:** Fully adheres to Figma specifications  
- **Environment:** Node.js v22.13.0  

---

## 📦 Project Structure (Overview)

project_phera/
├─ src/
│ ├─ assets/ # Images, icons, lottie animations
│ ├─ components/ # Reusable UI components
│ ├─ hooks/ # Custom hooks (camera ready, image quality)
│ ├─ pages/ # All route pages (CameraAccess, CameraCapture, Results, Steps, etc.)
│ ├─ shared/ 
│ │ ├─ api/ # API calls (addImage, simulated backend) 
│ │ ├─ styles/ # CSS modules and global styles
│ └─ main.jsx # Entry point
├─ package.json
├─ vite.config.js
└─ README.md


---

## 📋 Installation & Scripts

### Install dependencies
npm install

## Run development server
npm run dev

## Build production version
npm run build

## Preview production build
npm run preview

## Run ESLint
npm run lint


## 🔧 Features Summary
Multi-page mobile-first UI
Step-by-step test instructions
QR-based access on iOS and Android
ArUco marker-based camera capture
Automatic perspective crop and simulated backend response
Low-light detection logic
Placeholder for registration, profile, history, and subscription flows

## ⚠️ Current Limitations
No real backend or database
Authentication and subscription logic not functional
All dynamic data is placeholder-based
AI color/pH analysis pipeline will be implemented later

## 📌 Notes for Developers
OpenCV.js is loaded asynchronously in index.html.
Camera capture uses react-webcam and custom hooks for readiness checks.
ArUco marker detection runs periodically using requestAnimationFrame inside a setInterval.
Image processing and perspective transforms are handled in CameraCapture.jsx using OpenCV functions.
Placeholder backend responses are implemented via addImage() API in src/shared/api/images-api.js.

## 📄 License
MIT License — free to use, modify, and distribute.

## 👨‍💻 Author
Developed during a Fullstack Developer internship at pHera, following Figma specifications and modern React best practices.