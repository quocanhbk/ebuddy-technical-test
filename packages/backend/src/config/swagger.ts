import fs from "fs";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import { configService } from "./configService";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EBUDDY Technical Test API",
      version: "1.0.0",
      description: "API documentation for EBUDDY Technical Test",
    },
    servers: [
      {
        url: `http://localhost:${configService.port}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);

// Write swagger spec to file
const outputPath = path.resolve(__dirname, "../..", "swagger.json");
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`Swagger specification written to ${outputPath}`);
