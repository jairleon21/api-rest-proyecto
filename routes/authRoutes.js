import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { body } from 'express-validator';
import { validations } from '../middlewares/validations.js';

const router = Router();

//validaciones para registrar usuario
router.post('/register',[
    body('email', 'formato Email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', 'minimo 6 caracteres')
    .trim()
    .isLength({min:6})
    ], 
    validations,
    register
);

//validaciones para ingresar login
router.post('/login', [
    body('email','Email Incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password','Minimo 6 caracteres')
    .trim()
    .isLength({min: 6}),
    ],
    validations,
    login
);

export default router;