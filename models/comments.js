import mongoose from "mongoose";

const comentariosSchema  = mongoose.Schema({
    nombre: {
        type: mongoose.Schema.Types.String,
        ref: "Usuario"
    },
    email: {
        type: mongoose.Schema.Types.String,
        ref: "Usuario"
    },
    comentario: {
        type: String,
        required: true,
        trim: true
    },
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }
}, {
    timestamps: true
});

const comentario = mongoose.model("comentario", comentariosSchema);
export default comentario;