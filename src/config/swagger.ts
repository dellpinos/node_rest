import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/routes.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://www.svgrepo.com/show/530661/genetic-data.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45
        }
    `,
    customSiteTitle: 'Documentación REST API',
    customfavIcon: 'https://www.svgrepo.com/show/530661/genetic-data.svg',
}
export default swaggerSpec;
export {
    swaggerUiOptions
}