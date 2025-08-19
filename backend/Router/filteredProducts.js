import express from "express";
const router = express.Router();
import { getProductsByCategory } from "../Controllers/filteredProductsControl.js";

// Get products for a given category
router.get("/:category", getProductsByCategory);

export default router;
