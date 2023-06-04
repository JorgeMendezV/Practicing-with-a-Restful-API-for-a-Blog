import express from "express";
import {
    listarBlog,
    listarBlogs,
    agregarBlog,
    editarBlog,
    eliminarBlog
} from "../controllers/blogController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get('/', listarBlogs);
router.post('/', checkAuth, agregarBlog);

router.route("/:id")
    .get(checkAuth, listarBlog)
    .put(checkAuth, editarBlog)
    .delete(checkAuth, eliminarBlog)

export default router;