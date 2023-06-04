import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registro = async (request, response) => {

    const {email} = request.body;
    const existeUser = await Usuario.findOne({email});

    console.log(existeUser);

    if (existeUser){
        const error = new Error(`Usuario ${usuario} ya esta registrado en la base de datos`);
        return response.status(404).json({msg:error.message});
    };

    try {
        const usuario = new Usuario(request.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        response.json(usuarioAlmacenado);

    } catch (error) {
        console.log(`Error al guardar usuario: ${error}`);
    }
};



const autenticarUsuario = async (request, response) => {
    const {email, password} = request.body;
    const usuario = await Usuario.findOne({email});

    if (!usuario){
        const error = new Error(`Usuario: ${usuario}, no existe.`)
        return response.status(404).json({msg:error.message});
    };


    if (await usuario.comprobarPassword(password)){
        return response.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    } else  {
        const error = new Error("Password incorrecto");
        return response.status(403).json({msg:error.message});
    };
};


const perfil = async (request, response) => {
    const {usuario} = request;
    response.json(usuario);
};

export {
    registro,
    autenticarUsuario,
    perfil
};