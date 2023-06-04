import express from "express";
import Blog from "../models/Blog.js";

const listarBlogs = async (request, response) => {
    const blog = await Blog.find();
    response.json(blog);
};

const listarBlog = async (request, response) => {
    const blog = await Blog.find({creador:request.usuario._id});
    response.json(blog);
};

const agregarBlog = async (request, response) => {
    const blog = new Blog(request.body);

    blog.creador = request.usuario._id;
    try {
        const blogAgregado = await blog.save();
        response.json(blogAgregado);
    } catch (error) {
        console.log(`Ocurrio un error al agregar blog ${error}`);
    }
};

const eliminarBlog = async (request, response) => {
    const { id } = request.params;

    const blog = await Blog.findById(id);

    if(!blog) {
        return response.status(404).json({msg:"Blog no encontrado"});
    }
// Si el Id no es igual a uno existente en la bd la accion es no valida.
    if (blog._id.toString() !== id.toString()){
        return response.status(404).json({msg:"Accion n valida"});
    }

    try {
        await blog.deleteOne();
        response.json({msg: "Blog eliminado"});
    } catch (error) {
        console.log(`Hubo un error al intentar eliminar el blog: ${error}`);
    }
};



const editarBlog = async (request, response) =>{
    const { id } = request.params;

    const blog = await Blog.findById( id );

    if(!blog){
        return response.status(404).json({msg:"Blog no encontrado"});
    }

    // Si el Id no es igual a uno existente en la bd la accion es no valida.
    if (blog._id.toString() !== id.toString()) {
        console.log(blog.creador.toString() + "  " + request.usuario._id);
        return response.status(404).json({msg:"Accion no valida"});
    }

    blog.titulo = request.body.titulo || blog.titulo;
    blog.contenido = request.body.contenido || blog.contenido;
    blog.autor = request.body.autor || blog.autor;
    blog.fechaPublicacion = request.body.fechaPublicacion || blog.fechaPublicacion;

    try {
        const blogAlmacenado = await blog.save();
        response.json(blogAlmacenado);

    } catch (error) {
        console.log(`Error al editar el proyecto ${error}`);
    }
};


export {
    listarBlog,
    listarBlogs,
    agregarBlog,
    eliminarBlog,
    editarBlog
}