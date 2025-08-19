🛒 Grocery App

A MERN stack based online grocery shopping application where users can browse products, add them to cart/wishlist, and place orders with a smooth checkout experience.

🚀 Live Demo 
Link: https://grocery-52wy.onrender.com

---

✨ Features

🔑 User Authentication & Authorization (JWT)

📦 Product Management (list, filter, search)

🛒 Cart System with total price & tax calculation

❤️ Wishlist (add/remove items)

🧾 Order & Checkout System

💾 Persistent Data with MongoDB

🔄 Cart & Wishlist Sync with backend API

📱 Responsive UI built with React + Tailwind CSS



---

🏗️ Tech Stack

Frontend

React.js (Vite)

Context API (for cart & wishlist state)

Axios (API calls)

Tailwind CSS


Backend

Node.js + Express.js

MongoDB + Mongoose

JWT Authentication


Deployment

Render (backend)

Vercel/Netlify (frontend)



---

⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-username/grocery-app.git
cd grocery-app
2️⃣ Install Dependencies

Frontend

cd frontend
npm install

Backend

cd backend
npm install

3️⃣ Setup Environment Variables

Create a .env file inside backend/ with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the Application

Backend

cd backend
npm start

Frontend

cd frontend
npm run dev


---

📂 Project Structure

grocery-app/
│── backend/
│   ├── controllers/    # API logic
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
|   ├── utilites/
│   ├── server.js       # Entry point
│── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # Cart & Wishlist Context API
│   │   ├── pages/      # App pages
│   │   ├── App.jsx
│── .gitignore
│── README.md


---

📷 Screenshots

(Add screenshots of Home, Cart, Wishlist, Checkout here once UI is ready 🚀)


---

🤝 Contributing

1. Fork the repo


2. Create a feature branch (feature-new)


3. Commit changes


4. Push to branch


5. Open a PR




---

📜 License

Licensed under the MIT License.


---

⚡ Syam’s Grocery App – making online grocery shopping seamless & efficient!
