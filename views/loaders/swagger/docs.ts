import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Views APIs",
        description: "Views API Information",
        contact: {
          name: "Luca Martinelli"
        },
        servers: ["http://localhost:3002"]
      }
    },
    apis: ['./loaders/express/index.ts','./routes/v1/views/routes.ts']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);


export {swaggerUi, swaggerDocs}