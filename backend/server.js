import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./Config/db.js";

// Routes
import productsRoutes from "./Router/ProductRouter.js";
import cartRouter from "./Router/cartRouter.js";
import userRouter from "./Router/userRouter.js";
import checkOutRouter from "./Router/checkOutOrder.js";
import filteredProductsRoutes from "./Router/filteredProducts.js";
import wishListRouter from "./Router/wishListRouter.js"; // Import wishlist router

// Load env variables
dotenv.config({ path: "./.env" });

// __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ===== Middlewares =====
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? //? 'https://grocery-52wy.onrender.com' // Your production frontend URL
          "http://localhost:5000" // loacal production development
        : "http://localhost:5173/", // Your development frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  })
);

// Parse incoming JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  API Routes
app.use("/api/products", productsRoutes);
app.use("/api/category", filteredProductsRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/order", checkOutRouter);
app.use("/api/wishlist", wishListRouter); // Use wishlist router

// Test route
app.get("/test", (req, res) => res.send("API Test works"));

//  Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // Handle SPA routing - MUST come last
  app.get(/^(?!\/?api).*/, (req, res) => {
    // Exclude /api routes
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
