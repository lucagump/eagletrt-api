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
        servers: ["http://localhost:3004"]
      }
    },
    apis: ['./loaders/express/index.ts','./routes/v1/mqtt/routes.ts']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}