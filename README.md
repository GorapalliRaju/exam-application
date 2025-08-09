# 📝 Online Exam Application

This project is a **MERN Stack (MongoDB, Express.js, React, Node.js)** based online examination system with **JWT authentication**.  
It includes the following features:

- User **Registration & Login** (JWT authentication)
- Protected **Exam Page** (only logged-in users can access)
- **Timer-based** questions
- Answer submission & score calculation
- Result display
- Fully styled frontend
- API testing support via **Postman collection**

---

## 📂 Project Structure

```
main-folder/
│
├── backend/   # Node.js + Express + MongoDB
│
└── frontend/  # React.js (UI)
```

---

## 🛠️ Technologies Used

### **Frontend**
- React.js
- Axios
- CSS

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs (password hashing)
- dotenv (environment variables)

---

## ⚙️ Backend Setup

1️⃣ Navigate to backend folder  
```bash
cd backend
```

2️⃣ Install dependencies  
```bash
npm install
```

3️⃣ Create `.env` file in backend folder  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4️⃣ Run the backend server  
```bash
npm start
```
Backend will start at **http://localhost:5000**

---

## 💻 Frontend Setup

1️⃣ Navigate to frontend folder  
```bash
cd frontend
```

2️⃣ Install dependencies  
```bash
npm install
```
3️⃣ Run the frontend  
```bash
npm start
```
Frontend will start at **http://localhost:3000**

---

## 📌 API Endpoints

### **Auth Routes**
- **POST** `/api/auth/register` → Register a new user
- **POST** `/api/auth/login` → Login & get token

### **Exam Routes** (Protected)
- **GET** `/api/exam/questions` → Get all exam questions  
  _(Requires `Authorization: Bearer <token>` in headers)_
- **POST** `/api/exam/submit` → Submit answers & get score  
  _(Requires `Authorization: Bearer <token>` in headers)_
  - **POST** `/api/exam/add-question` → Add questions  
  _(Requires `Authorization: Bearer <token>` in headers)_

---

## 🔍 Testing via Postman

A **Postman Collection** is included in:  
📂 `postman/OnlineExam.postman_collection.json`

### Steps to Test:
1. Import the collection into Postman.
2. First, use **Register API** to create an account.
3. Use **Login API** to get the JWT token.
4. Copy the token and set it in the **Authorization** tab:  
   ```
   Type: Bearer Token
   Token: <your-token-here>
   ```
5. Test the **Exam APIs**.

---

## 🖥️ cURL Examples

### 1️⃣ Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"123456"}'
```

### 2️⃣ Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"testuser","password":"123456"}'
```

### 3️⃣ Get Questions
```bash
curl -X GET http://localhost:5000/api/exam/questions \
-H "Authorization: Bearer <your_token_here>"
```

### 4️⃣ Submit Answers
```bash
curl -X POST http://localhost:5000/api/exam/submit \
-H "Authorization: Bearer <your_token_here>" \
-H "Content-Type: application/json" \
-d '{"answers":[{"_id":"123","answer":0},{"_id":"456","answer":2}]}'
```

---

## 📌 Notes
- Ensure **MongoDB** is running locally or use MongoDB Atlas.
- Replace `<your_token_here>` in API calls with the token from login.
- Protected routes return **403 Forbidden** if the token is missing or invalid.

---

