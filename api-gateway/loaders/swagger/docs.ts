import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Gateway APIs",
        description: "Gateway API Information",
        contact: {
          name: "Luca Martinelli"
        },
        servers: ["http://localhost:3000"]
      }
    },
    apis: ['./loaders/express/index.ts','./routes/v1/gateway/routes.ts','./routes/v1/authentication/routes.ts','./routes/v1/documentation/routes.ts']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}