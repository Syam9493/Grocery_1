import mongoose from "mongoose";
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import users from './Models/userModel.js';
import Product from './Models/productModel.js';
import Cart from './Models/cartModel.js';
import CheckOut from './Models/checkOutModel.js';
import connectDB from "./Config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

connectDB();

        const filePath = path.join(__dirname, './Data/db.json');
        const filePath1 = path.join(__dirname, './Data/users.json');
        const data = await fs.readFile(filePath, 'utf8');
        const data1 = await fs.readFile(filePath1, 'utf8');
        const products =  JSON.parse(data);
        const Users =  JSON.parse(data1);

        const allProducts = [
    ...products.Products.vegetables,
    ...products.Products.Fruits,
    ...products.Products.Beverages
];

const allUsers = [
    ...Users.users
]

const importData = async () => {
    try {
      await  users.deleteMany();
      await  Product.deleteMany();
      await Cart.deleteMany();
      await CheckOut.deleteMany();

     const createdUsers = await users.insertMany(allUsers);
     const  adminUser = await createdUsers[0]._id;
     const sampleProducts = allProducts.map((product) => {
        return {...product, user: adminUser}
     });

     await Product.insertMany(sampleProducts);
      console.log("✅ Data Imported");
      process.exit();   
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await  users.deleteMany();
      await  Product.deleteMany();
      await Cart.deleteMany();
      await CheckOut.deleteMany();

      console.log('Data deleted!');
      process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}


if(process.argv[2] === '-d'){
   deleteData();
}else{
    importData();
}

