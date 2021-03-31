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
        servers: ["http://localhost:3001"]
      }
    },
    apis: ['./loaders/express/index.ts', './routes/v1/users/routes.ts']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}