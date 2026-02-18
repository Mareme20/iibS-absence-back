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
        url: 'https://iibs-absence-back.onrender.com', // Ton URL Render
        description: 'Serveur Production',
      },
      {
        url: 'http://localhost:3000',
        description: 'Serveur Local',
      },
    ],
  },
  // CRUCIAL : On ajoute le chemin vers "dist" pour Render
  apis: [
    './src/router/*.ts', 
    './dist/router/*.js',
    './src/dto/*.ts',
    './dist/dto/*.js'
  ], 
};

export const specs = swaggerJsdoc(options);
