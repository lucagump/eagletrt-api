import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Users APIs",
        description: "Users API Information",
        contact: {
          name: "Luca Martinelli"
        },
        servers: ["http://localhost:3333"]
      }
    },
    apis: ['./routes/v1/users/routes.ts', "./source/server.ts"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}