# HRMS Lite

A lightweight full-stack HR management app for employee records and attendance tracking. Built with React, Node.js, and MongoDB.

## 🚀 Features
- **Employee Management**: Add, view, and delete employees with auto-generated IDs.
- **Attendance Tracking**: Mark daily attendance (Present/Absent) with date filtering and present-day counts.
- **Data Export**: Download attendance records as CSV files.
- **Responsive UI**: Clean, animated interface with Tailwind CSS.
- **Secure Storage**: Data persisted in MongoDB Atlas.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Deployment**: Render

## 📋 Local Setup
1. Clone: `git clone https://github.com/ayush201456/hrms-lite.git`
2. Install: `npm install` (root) and `cd client && npm install`
3. Env: Create `.env` with `MONGO_URI=your_mongodb_atlas_string`
4. Run: `npm run dev` (server: port 5000, client: port 5173)
5. Open: `http://localhost:5173`

## 🌐 Live Demo
[https://hrms-lite-1-elyn.onrender.com/](https://hrms-lite-1-elyn.onrender.com/)

## 📝 Assumptions
- Single admin (no auth).
- Employee IDs: Auto-generated UUIDs.
- Attendance: Per employee per date (no duplicates).
- No advanced HR features (e.g., payroll).

## 👨‍💻 Author
Developed by Ayush Gupta. [GitHub](https://github.com/ayush201456)

---
3. The repo will update automatically.

This README is now complete with your live URL. If you need further edits (e.g., add screenshots or change text), let me know! 🚀 Your project is ready for submission.
