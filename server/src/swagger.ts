import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3333;
const BASE_URL = process.env.API_URL || `http://localhost:${PORT}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Segurali - API de Usuários',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários do teste técnico da Segurali',
      contact: {
        name: 'Guilherme Saud',
      },
    },
    servers: [
      {
        url: BASE_URL,
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário',
            },
            name: {
              type: 'string',
              description: 'Nome do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário',
            },
            age: {
              type: 'integer',
              description: 'Idade do usuário',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
          },
        },
        CreateUser: {
          type: 'object',
          required: ['name', 'email', 'age'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              example: 'Guilherme Saud',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'guilherme@example.com',
            },
            age: {
              type: 'integer',
              minimum: 18,
              example: 25,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
