import cors from "cors";
import express, { json, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { configService } from "../config/configService";
import { swaggerSpec } from "../config/swagger";
import userRoutes from "../routes/userRoutes";

const app = express();
const port = configService.port;

// Middleware
app.use(cors());
app.use(json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `API Documentation available at http://localhost:${port}/api-docs`
  );
});
