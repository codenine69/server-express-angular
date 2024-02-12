import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken';

export const newUser = async (req:Request, res: Response) =>{
    
    const {username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    //validamos si el usuario ya existe en la  bd
    //esto es como select * from username where username=username
    const user  = await User.findOne({
        where: {username: username}
    })

    if(user){
        //si colocas return ya no continua
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        })
    }

    try {
        //guardamos usuario en la base de datos 
        await User.create({
            username: username,
            password: hashedPassword
        }) 
        console.log(hashedPassword);
        res.json({
            msg: 'Usuario creado exitosamente: ' + username 
        })
    } catch (error) {
        res.status(400).json({msg:' Ocurrio un error',error});
    }
   
}
export const loginUser = async (req:Request, res: Response) =>{
    
    const {username, password} = req.body;

    //Validar si el usuario existe en la BD
    const user:any  = await User.findOne({
        where: {username: username}
    })

    if(!user){
        return res.status(400).json({
            msg: "No existe el usuario en la base de datos" + username
        })
    }
    //Validar password
   
    const passwordValid = await bcrypt.compare(password, user.password); //devuelve false o true
    console.log(passwordValid);
    if(!passwordValid){
        return res.status(400).json({
            msg: 'password incorrecto'
        })
    }
    //generar Token
    
    const token = jwt.sign({
        username:username
    },process.env.SECRET_KEY || 'pepito123',{
        expiresIn: '3600000' //60 minutos
    })

    res.json({token})
}