import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export const register =  async(req, res)=>{
    const{email, password} =req.body;
    try {
        //buscar usuario por email en la base de datos 
        let user = await User.findOne({email});
        if (user) throw{code: 11000};

        user = new User({email, password});
        await user.save()

        // generar el token 

        return res.status(201).json({ok: 'register'})
    } catch (error) {
        console.log(error);
        //buscar en la base de datos mongoose al usuario
        if(error.code === 11000){
            return res.status(400).json({error: 'ya existe este usuario'});
        }
        return res.status(500).json({error: 'Error de servidor'});

    }
};

export const login = async(req, res)=>{
    try {

        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user)  return res.status(403).json({error: 'no existe este usuario'});
         
        //comprar la contraseña en la base de datos con la q esta ingresando
        const resPassword = await user.comparedPassword(password)
        if(!resPassword)
            return res.status(403).json({error: 'contraseña incorrecta'})

        //generar el token 
        const token = jwt.sign( {uid: user.id}, process.env.JWTSECRET)

        return res.json({token});

    } catch (error) {
        console.log(error)
         return res.status(500).json({error: 'Error de servidor'});
    }

}