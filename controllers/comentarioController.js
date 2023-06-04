import express from "express";
import Blog from "../models/Blog.js";
import Comentario from "../models/comments.js";


const listarComentarios = async (request, response) => {
    const { id } = request.params;
    const blog = await Blog.findById(id);

    if(!blog) {
        return response.status(404).json({msg:"Blog no encontrado"});
    }

    const comentario = await Comentario.find({blog_id: blog._id});
    response.json(comentario);
};



const agregarComentario = async (request, response) => {
    const { id } = request.params;
    const blog = await Blog.findById(id);

    if(!blog) {
        return response.status(404).json({msg:"Blog no encontrado"});
    }

    const comentario = new Comentario(request.body);
    console.log(comentario)

    comentario.blog_id = blog._id;
    comentario.nombre = request.usuario.nombre;
    comentario.email = request.usuario.email;

    try {
        const comentarioAgregado = await comentario.save();
        response.json(comentarioAgregado);
    } catch (error) {
        console.log(`Ocurrio un error al agregar el comentario:  ${error}`);
    }
};

const eliminarComentario = async (request, response) => {
    const { id } = request.params;
    const comment = await Comentario.findById(id);

    if(!comment) {
        return response.status(404).json({msg:"Comentario no encontrado"});
    }

    try {
        await comment.deleteOne();
        response.json({msg: "Comentario eliminado"});
    } catch (error) {
        console.log(`Hubo un error al intentar eliminar el comentario: ${error}`);
    }
};



const editarComentario = async (request, response) =>{
    const { id } = request.params;
    const comment = await Comentario.findById(id);

    if(!comment) {
        return response.status(404).json({msg:"Comentario no encontrado"});
    }

    comment.comentario = request.body.comentario || comment.comentario;

    try {
        const commentAlmacenado = await comment.save();
        response.json(commentAlmacenado);

    } catch (error) {
        console.log(`Error al editar el proyecto ${error}`);
    }
};


export {
    listarComentarios,
    agregarComentario,
    editarComentario,
    eliminarComentario
}