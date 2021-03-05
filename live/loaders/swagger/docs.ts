import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Live APIs",
        description: "Live API Information",
        contact: {
          name: "Luca Martinelli"
        },
        servers: ["http://localhost:3335"]
      }
    },
    apis: ['./routes/v1/mqtt/routes.ts']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}