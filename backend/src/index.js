const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');
//
const packageJson = require('./../package.json');
const config = require("./config");
const routes = require("./routes");
const data = require("./models/data-providers");
// ==================================================================
// Define backend
const app = express();

// Enable Cors
app.use(cors());

// Data source
const dataProvider = new data.CacheDataProvider(new data.DataProvider(config.dataSource));

// Routes
app.use(config.base, routes(dataProvider));

// Swagger UI
const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'GeoLocation API',
            version: packageJson.version,
            description: 'An example API to demonstrate GeoLocation endpoints.',
        },
		servers: [
            {
                url: config.base,
                description: 'Base path for API endpoints',
            },
        ],
    },
    apis: ['./routes.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(config.base, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==================================================================
// Start the server

app.listen(config.port, () => {
	console.log(`Backend Server is running on http://localhost:${config.port}`);
});
