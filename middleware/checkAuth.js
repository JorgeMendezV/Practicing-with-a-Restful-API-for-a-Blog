import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";

const checkAuth = async (request, response, next) => {
    let token

    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
        try {

            token = request.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            request.usuario = await Usuario.findById(decoded.id).select("-password -createdAt -updateAt -__v");
            return next();
            
        } catch (error) {
            return response.status(404).json({msg:"Hubo un error al autenticar token"})
        };
    };

    if (!token) {
        const error = new Error("Token no valido");
        return response.status(401).json({msg:error.message});
    };

    next();
}

export default checkAuth;