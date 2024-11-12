const mongoose = require("mongoose");

const EmpleadoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    ci: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    salario: {
        type: Number,
        required: true,
    },
    bono: {
        type: Number,
        validate: {
            validator: function(bono) {
                return this.salario > bono;
            },
            message: 'El salario debe ser mayor que el bono.'
        },
        required: true
    },
    creado: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Empleado", EmpleadoSchema);
