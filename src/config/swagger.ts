import swaggerJsdoc from 'swagger-jsdoc';

const swaggerProdUrl = process.env.SWAGGER_PROD_URL || 'https://iibs-absence-back.onrender.com';
const swaggerLocalUrl = process.env.SWAGGER_LOCAL_URL || `http://localhost:${process.env.PORT || 3000}`;

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
        url: swaggerProdUrl,
        description: 'Serveur Production',
      },
      {
        url: swaggerLocalUrl,
        description: 'Serveur Local',
      },
    ],
  },
  apis: [
    './src/router/*.ts', 
    './dist/router/*.js',
    './src/dto/*.ts',
    './dist/dto/*.js'
  ], 
};

export const specs = swaggerJsdoc(options);
