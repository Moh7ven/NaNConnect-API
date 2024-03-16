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
import commentairesRoutes from "./routes/commentaireRoute.js";
import likePubRoutes from "./routes/likePubRoute.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectDB();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/naniens/pubcomment", commentairesRoutes);
app.use("/api/naniens/likepub", likePubRoutes);
app.use("/api/naniens/notifications", notificationsRoutes);
app.use("/assets", express.static(path.join(__dirname, "assets")));
export default app;
