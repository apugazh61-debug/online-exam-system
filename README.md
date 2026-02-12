# 🎓 Online Exam System - Gnanamani College of Technology

A comprehensive, fully-featured online examination platform built with modern web technologies. This system provides a complete end-to-end solution for conducting online exams with real-time result generation and detailed performance analytics.

## ✨ Features

### 🔐 Authentication & Security

- Secure user registration with email validation
- Firebase Authentication integration
- Password strength validation (min 10 chars, uppercase, number, special symbol)
- Password visibility toggle for better UX
- Unique email validation

### 📝 Exam Management

- Multi-section exam support (Aptitude, Technical, Logical Reasoning, Current Affairs)
- 40 questions across 4 sections (10 questions each)
- Real-time countdown timer (60 minutes)
- Question navigation with status indicators (answered/unanswered)
- Auto-submit on timeout
- Locally stored question bank

### 📊 Results & Analytics

- Instant result generation upon submission
- Section-wise performance breakdown
- Total score with percentage calculation
- Detailed answer review with correct/wrong indicators
- Time taken tracking
- Filter results by section
- Answer history for returning users

### 🎨 User Interface

- Beautiful animated preloader with college branding
- Fully responsive design (Desktop, Tablet, Mobile)
- Modern gradient-based UI
- Smooth animations and transitions
- Professional card-based layout
- Password visibility toggle with eye icons

### 💾 Data Management

- Firebase Firestore for data storage
- Real-time data synchronization
- User profiles stored in `users` collection
- Exam results stored in `results` collection
- Automatic attempt tracking

## 🛠️ Technology Stack

### Frontend

- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Firebase SDK** - Authentication and Firestore
- **CSS3** - Styling with modern features

### Backend

- **Firebase Authentication** - User management
- **Firebase Firestore** - NoSQL database
- **Node.js & Express** - Backend server (optional)

### Development Tools

- **Git** - Version control
- **npm** - Package management
- **VS Code** - Development environment

## 📦 Installation & Setup

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Firebase account

### 1. Clone Repository

```bash
git clone <repository-url>
cd online-exam-system-main
```

### 2. Frontend Setup

```bash
cd online-exam-system-main/frontend
npm install
```

### 3. Firebase Configuration

Create `frontend/src/config/firebase.js` with your Firebase credentials:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 4. Run Development Server

```bash
npm run dev
```

Access at: `http://localhost:5173`

### 5. Mobile Access (Same WiFi Network)

```bash
npm run dev -- --host
```

Access from mobile: `http://YOUR_IP_ADDRESS:5173`

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- **Desktop** (>968px) - Multi-column layouts, side-by-side components
- **Tablet** (768px - 968px) - Adaptive grids, stacked navigation
- **Mobile** (576px - 768px) - Single column, touch-optimized
- **Small Mobile** (<576px) - Compact design, thumb-friendly navigation

## 🎯 User Flow

1. **Registration** → User creates account with email/password
2. **Login** → Authenticate and check for existing attempts
3. **First-time Users** → View instructions → Start exam
4. **Returning Users** → Auto-redirect to results page
5. **Exam Page** → Answer questions → Submit
6. **Results** → View scores, section breakdown, answer review

## 📂 Project Structure

```
online-exam-system-main/
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   └── gct-logo.png
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── Preloader.jsx
│   │   │   │   ├── Auth.css
│   │   │   │   └── Preloader.css
│   │   │   ├── Exam/
│   │   │   │   ├── ExamPage.jsx
│   │   │   │   └── ExamPage.css
│   │   │   ├── Instructions.jsx
│   │   │   └── Result.jsx
│   │   ├── config/
│   │   │   └── firebase.js
│   │   ├── data/
│   │   │   └── questions.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── backend/ (optional)
    └── src/
        └── server.js
```

## 🔥 Firebase Collections

### `users`

```javascript
{
  uid: string,
  name: string,
  email: string,
  collegeName: string,
  department: string,
  hasAttempted: boolean,
  createdAt: timestamp
}
```

### `results`

```javascript
{
  uid: string,
  userName: string,
  email: string,
  totalScore: number,
  totalQuestions: number,
  percentage: number,
  timeTaken: string,
  sectionScores: {
    "Aptitude": { correct: number, total: number },
    "Technical": { correct: number, total: number },
    "Logical Reasoning": { correct: number, total: number },
    "Current Affairs": { correct: number, total: number }
  },
  answers: Array,
  submittedAt: timestamp
}
```

## 🎨 Key Features Implementation

### Preloader Animation

- Logo pop-up effect at center
- Smooth movement to right side
- Text reveal with swipe animation
- Two-line college name display
- 3-second duration with auto-dismiss

### Password Visibility Toggle

- Eye icon buttons on password fields
- Click to toggle between hidden/visible
- Works on both Login and Register pages
- Touch-friendly for mobile devices

### Responsive Forms

- Full-width inputs with proper spacing
- Touch-optimized button sizes
- Validation error messages
- Real-time form validation

## 👥 Credits

**Created by CSE Students:**

- Pugazhenthi
- Karthikeyan

**Institution:** Gnanamani College of Technology

## 📄 License

Educational project - All rights reserved by creators.

## 🤝 Contributing

This is an educational project. For suggestions or improvements, please contact the creators.

## 📞 Support

For issues or questions, please contact the development team.

---

**Made with ❤️ for Gnanamani College of Technology**
