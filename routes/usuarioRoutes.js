import express from "express";
const router = express.Router();
import {registro, autenticarUsuario, perfil} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

// ENDPOINTS USUARIOS
// Creacion de usuario. CREATE
router.post('/', registro);

// Autenticacion de usuario
router.post('/login', autenticarUsuario);

// Obtener perfil
router.get('/perfil', checkAuth, perfil);


export default router;