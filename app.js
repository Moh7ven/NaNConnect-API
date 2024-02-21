import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/naniensRoutes.js";
import confirmationEmailRoutes from "./routes/confirmationEmailRoutes.js";
import theDate from "./utils/generateDate.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";
import publicationsRoutes from "./routes/publicationsRoutes.js";

dotenv.config();

connectDB();
const app = express();

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, DELETE, PATH,OPTIONS"
  );
  next();
}); */

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log(theDate());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/naniens", userRoutes);
app.use("/api/naniens/confirmation-email", confirmationEmailRoutes);
app.use("/api/naniens/publications", publicationsRoutes);
export default app;
