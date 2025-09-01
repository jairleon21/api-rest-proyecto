import  'dotenv/config'
import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI)
    console.log('conexion a mongoDB👍👍👍');
} catch (error) {
    console.log('error de conexion a mongoDB😢😢'+ error);
}

