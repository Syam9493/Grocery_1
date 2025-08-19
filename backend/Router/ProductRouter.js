import express from "express";
const router = express.Router();
import { products, productById } from "../Controllers/productControl.js";

router.get("/", products); // GET /api/products
router.get("/:id", productById); // GET /api/products/:id

export default router;
