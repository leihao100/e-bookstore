# 📚 Bookstore Management System

A full-stack web application for managing an online bookstore, supporting user interaction, book browsing, and administrative operations.

---

## 🚀 Features

### 👤 User Features
- User registration and login  
- Browse book catalog  
- Search books by keywords or categories  
- View book details  
- Add books to shopping cart  
- Place and manage orders  
- Personal profile management  

### 🛠 Admin Features
- Add / edit / delete books  
- Manage book categories  
- View user and order summaries  
- Inventory management  

---

## 🏗️ Tech Stack

### Frontend
- React  
- CSS  
- React Router  

### Backend
- Java (Spring Boot)  
- RESTful API  

### Database
- MySQL  

---

## 📂 Project Structure

```
web_hw/
│
├── src/                # React frontend
│   ├── component/      # Reusable UI components
│   ├── view/           # Page-level views
│   ├── Service/        # Frontend logic & helpers
│   └── photos/         # Static assets
│
├── src_end/            # Backend (Spring Boot)
│   ├── main/           
│   ├── resources/      
│   ├── sql/            
│   └── lib/            
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd web_hw
```

---

### 2️⃣ Backend Setup (Spring Boot)

1. Configure database in:
```
src_end/main/resources/application.yml
```

2. Import database schema from:
```
src_end/sql/
```

3. Run backend:
```bash
mvn spring-boot:run
```
or run via IDE

---

### 3️⃣ Frontend Setup (React)

```bash
cd src
npm install
npm start
```

Frontend runs at:
```
http://localhost:3000
```

---

## 🔌 API Communication

- Frontend communicates with backend via REST APIs  
- Backend handles:
  - Authentication  
  - Book CRUD  
  - Cart & order management  

---

## 📊 Highlights

- Full-stack architecture (React + Spring Boot + MySQL)  
- Modular frontend design  
- RESTful backend services  
- Role-based access (user & admin)  
- Simulates real-world e-commerce workflow  

---

## 📌 Future Improvements

- Payment integration  
- JWT authentication  
- Performance optimization  
- UI/UX enhancements  
- Recommendation system  

---

## 👨‍💻 Author

**Yuhao Lei**
