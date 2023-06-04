import express from "express";
import conexionDB from "./config/db.js";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import comentariosRoutes from "./routes/comentariosRoutes.js"
// Configuraciones
const app = express();
app.use(express.json());
dotenv.config();


// Iniciar conexion
conexionDB();


// Routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// USUARIOS
app.use('/api/usuarios', usuarioRoutes);

// BLOG
app.use('/api/blog', blogRoutes);

app.use('/api/comentarios', comentariosRoutes);

