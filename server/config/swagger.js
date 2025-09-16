require("dotenv").config();
// swagger

const port = process.env.API_PORT || 3000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MyContacts API',
            version: '1.0.0',
            description: 'API documentation for MyContacts - Contact Management System',
            contact: {
                name: 'API Support',
                email: 'support@mycontacts.com'
            }
        },
        // Use relative URL for production to match current origin (avoids mixed content/CORS on HTTPS)
        servers: [
            {
                url: '/',
                description: 'Current host (production)'
            },
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ["./docs/*.yaml"],
};

module.exports = swaggerOptions;