import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});

//hash de contraseña
userSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        const saltos = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, saltos);
        next();
    } catch (error) {
        console.log(error);
        throw new Error('Fallo el hash de contraseñan');
    }
});

//comparar contraseñas guardadas e ingresadas al login
userSchema.methods.comparedPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
};



export const User = mongoose.model ('User', userSchema); 
