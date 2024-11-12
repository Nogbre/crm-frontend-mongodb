const mongoose = require('mongoose');
const Empleado = require('../Models/Empleado');

const resolvers = {
    Query: {
        obtenerEmpleados: async () => {
            try {
                const empleados = await Empleado.find({});
                return empleados;
            } catch (error) {
                console.log(error);
                throw new Error("Error al obtener los empleados");
            }
        },
        obtenerEmpleadoPorID: async (_, { id }) => {
            try {
                const empleado = await Empleado.findById(id);
                if (!empleado) {
                    throw new Error(`El empleado con el id: ${id} no existe`);
                }
                return empleado;
            } catch (error) {
                console.log(error);
                throw new Error("Error al obtener el empleado");
            }
        }
    },
    Mutation: {
        nuevoEmpleado: async (_, { input }) => {
            const { ci, email, salario, bono } = input;

            const existeCI = await Empleado.findOne({ ci });
            if (existeCI) {
                throw new Error("Ya existe un empleado con ese CI");
            }

            const existeEmail = await Empleado.findOne({ email });
            if (existeEmail) {
                throw new Error("Ya existe un empleado con ese email");
            }

            //salario y bono
            if (salario < 0 && bono < 0) {
                throw new Error("Tanto el salario como el bono no pueden ser números negativos");
            }
            if (salario < 0) {
                throw new Error("El salario no puede ser un número negativo");
            }
            if (bono < 0) {
                throw new Error("El bono no puede ser un número negativo");
            }
            if (salario <= bono) {
                throw new Error("El salario debe ser mayor que el bono");
            }

            try {
                const empleado = new Empleado(input);
                await empleado.save();
                return empleado;
            } catch (error) {
                console.log(error);
                throw new Error("Error al crear el empleado");
            }
        },
        actualizarEmpleado: async (_, { id, input }) => {
            const { salario, bono } = input;

            if(salario == bono){
                throw new Error("El salario y bono son iguales")

            }
            if (salario < 0 && bono < 0) {
                throw new Error("El salario y el bono no pueden ser negativos");
            }
            if (salario < 0) {
                throw new Error("El salario no puede ser un numero negativo");
            }
            if (bono < 0) {
                throw new Error("El bono no puede ser un numero negativo");
            }

            let empleado = await Empleado.findById(id);
            if (!empleado) {
                throw new Error(`El empleado con el id:${id} no existe`);
            }

            if (salario !== undefined && bono !== undefined) {
                if (salario <= bono) {
                    throw new Error("El salario debe ser mayor que el bono");
                }
            }

            try {
                empleado = await Empleado.findByIdAndUpdate(id, input, { new: true });
                return empleado;
            } catch (error) {
                console.log(error);
                throw new Error("Error al actualizar el empleado");
            }
        },
        eliminarEmpleado: async (_, { id }) => {
            let empleado = await Empleado.findById(id);
            if (!empleado) {
                throw new Error(`El empleado con el id: ${id} no existe`);
            }

            await Empleado.findByIdAndDelete(id);
            return "Empleado eliminado con éxito";
        }
    }
};

module.exports = resolvers;
