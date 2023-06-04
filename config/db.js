// Importamos modulo para trabajar la conexion a la bd
import mongoose from "mongoose";

// Creamos la conexion
const conexionDB = async () => {
    try {   
        const connection = await mongoose.connect(
            // Utilizando varible de entorno para evitar mostrar datos importantes.
            process.env.MONGO_URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            const url = `${connection.connection.host}:${connection.connection.port}`;
            console.log(`Mongodb conectado en ${url}`);
    } catch (error) {
        console.log(`Connection error: ${error}`);
        // En caso de error, salir.
        process.exit(1);
    }
};

// Export
export default conexionDB;