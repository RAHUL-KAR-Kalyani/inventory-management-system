# Inventory & Billing Dashboard (MERN Stack)

## 📌 Overview

A full‑stack inventory and billing system built with the MERN stack.  
It includes customer management, product stock tracking, invoice generation, and dashboard with charts, alerts, and insights.

---

## ✨ Features

- **📦 Inventory Management** (products, stock, alerts).
- **🧾 Billing & Invoice CRUD**
- **💰 Daily Sales Tracking** (Chart.js + React).
- **📉 Stock per Item Chart** with auto reorder alerts.
- **🚨 Low Stock Alerts** with blinking indicators
- **📈 Dashboard Analytics** powered by controllers
- **📑 PDF Invoice Generation**
- **🔐 JWT-based Authentication**
- **🔔 Toast Notifications (Sonner)**
- **⚛️ Redux Toolkit** for state management.
- **🎨 Responsive UI** styled with Tailwind CSS.
- **✨ Optimized folder structure and clean architecture**

---

## 🛠 Tech Stack

- **Frontend**: React, Redux Toolkit, Chart.js
- **Backend**: Node.js, Express.js, MongoDB
- **Other**: JWT Auth, Axios

## 🎨 UI & Styling

- Tailwind CSS for responsive design
- Lucide React Icons for modern, lightweight iconography
- Sonner Toasts for notifications


---

## ⚙️ Environment variables (examples)

Create .env files for frontend and backend from the examples below.

Frontend (.env)

```env
# Base API URL for axios

VITE_DASHBOARD_ENDPOINT=backend_dashboard_api
VITE_USER_ENDPOINT=backend_user_api
VITE_PRODUCT_ENDPOINT=backend_product_api
VITE_CUSTOMER_ENDPOINT=backend_invoice_api

```

Backend (.env)

```env

PORT=backend_port
MONGO_URI=MongoDB connection string
SALT=password_salt_number
SECRET_KEY=your_jwt_secret_here
FRONTEND_URL= your_fronturl_used_for_CORS
```

Notes

- Never commit .env files to Git. Use environment-specific values in deployment (CI/CD, hosting console).
- For production, use strong secrets (long random JWT_SECRET) and production DB URIs.

---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/RAHUL-KAR-Kalyani/invoice-management-system.git

# Install dependencies
npm install

# Run backend
npm run server

# Run frontend
npm run dev
```
