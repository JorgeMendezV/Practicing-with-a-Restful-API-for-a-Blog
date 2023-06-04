import express from "express";
import {
    listarComentarios,
    agregarComentario,
    editarComentario,
    eliminarComentario
} from "../controllers/comentarioController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/:id")
    .post(checkAuth, agregarComentario)
    .get(checkAuth, listarComentarios)
    .put(checkAuth, editarComentario)
    .delete(checkAuth, eliminarComentario)

export default router;