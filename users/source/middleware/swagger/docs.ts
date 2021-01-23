import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Users API",
        description: "Users API Information",
        contact: {
          name: "Luca Martinelli"
        },
        servers: ["http://localhost:3333"]
      }
    },
    apis: ['./routes/users/routes.ts', 'server.ts']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}