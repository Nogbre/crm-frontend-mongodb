const { gql } = require('apollo-server');

const typeDefs = gql `
    # Existing types and inputs...

    type Empleado {
        id: ID
        nombre: String
        apellido: String
        ci: String
        email: String
        salario: Float
        bono: Float
        creado: String
    }

    input EmpleadoInput {
        nombre: String!
        apellido: String!
        ci: String!
        email: String!
        salario: Float!
        bono: Float!
    }

    # Queries
    type Query {
        # Existing queries...

        obtenerEmpleados: [Empleado]
        obtenerEmpleadoPorID(id: ID!): Empleado
    }

    # Mutations
    type Mutation {
        # Existing mutations...

        nuevoEmpleado(input: EmpleadoInput): Empleado
        actualizarEmpleado(id: ID!, input: EmpleadoInput): Empleado
        eliminarEmpleado(id: ID!): String
    }
`;

module.exports = typeDefs;
