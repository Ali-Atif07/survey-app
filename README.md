# 📊 Survey Kiosk App (React.js)

A dynamic customer feedback survey application built with React.js.  
It allows users to complete a step-by-step survey with smooth navigation, session tracking, and persistent storage using localStorage.

---

## 🚀 Features

### 🏁 Welcome Screen
- Start button to begin survey

### ❓ Dynamic Survey System
- 5 default questions (config-driven)
- Supports:
  - Rating (1–5)
  - Rating (1–10)
  - Text input
- Easy to add new questions without breaking the app

### 🔁 Navigation
- Next / Previous buttons
- Skip question option
- Progress indicator (e.g., 1/5, 2/5…)

### 💾 Data Persistence
- Answers saved in localStorage
- Each answer stored with:
  - Question ID
  - Session ID

### 👤 Session Management
- Unique session ID per customer
- Session lifecycle tracking
- Status marked as `COMPLETED` after submission

### ✅ Submission Flow
- Confirmation dialog before final submit
- Thank you screen after submission
- Auto redirect to welcome screen after 5 seconds

---

## 🧠 Key Highlights

- Config-driven architecture (questions.js)
- Fully dynamic survey rendering
- Scalable and extensible design
- Clean separation of components
- Smooth UI transitions with Framer Motion

---

## 📁 Project Structure
```bash
survey-app/
├── src/
│   ├── questions.js              
│   ├── storage.js                
│   ├── App.jsx                   
│   ├── index.css                 
│   └── components/
│       ├── WelcomeScreen.jsx
│       ├── QuestionScreen.jsx
│       ├── RatingInput.jsx
│       ├── ConfirmDialog.jsx
│       └── ThankYouScreen.jsx
├── vercel.json              
└── index.html
```
---

## 🛠️ Tech Stack

- React.js
- Framer Motion
- LocalStorage
- CSS3
- Vercel (deployment ready)

---

## 📦 How it works

1. User starts survey from Welcome screen  
2. Questions are shown one by one  
3. User can answer, skip, or navigate freely  
4. All answers are stored in localStorage  
5. Final submission marks session as `COMPLETED`  
6. Thank you screen is shown  
7. App resets after 5 seconds  

---

## 🔮 Future Improvements

- Backend database integration
- Admin panel for managing questions
- Analytics dashboard
- Multi-language support
- Real kiosk hardware integration

---

## 📌 Author

Built as a frontend assessment project using React.js