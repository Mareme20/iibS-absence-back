import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IIBS Absence API',
      version: '1.0.0',
      description: 'Documentation de l\'API de gestion des absences',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
             ? 'https://iibs-absence-back.onrender.com' 
             : 'http://localhost:3000',
        description: 'Serveur principal',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/router/*.ts', './src/dto/*.ts'], // Chemin vers tes fichiers de routes
};

export const specs = swaggerJsdoc(options);
