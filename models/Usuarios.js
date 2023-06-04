// paquetes
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Esquema de documentos
const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
});


// Encryptando password
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comprobarPassword = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password);
};

// creando la coleccion
const Usuario = mongoose.model("Usuario", userSchema);
export default Usuario;