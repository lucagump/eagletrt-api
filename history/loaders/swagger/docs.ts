import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Database APIs",
        description: "Database API Information",
        contact: {
          name: "Luca Martinelli"
        },
        servers: ["http://localhost:3333"]
      }
    },
    apis: ['./routes/v1/database/routes.ts']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}