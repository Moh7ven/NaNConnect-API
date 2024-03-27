import express from "express";
import useragent from "express-useragent";
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
import searchRoutes from "./routes/searchRoutes.js";
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

/* // Middleware pour récupérer l'adresse IP de la requête
app.use((req, res, next) => {
  const ip =
    req.ip ||
    req.remoteAddress ||
    req.socket.remoteAddress ||
    req.socket.remoteAddress;
  req.ipAddress = ip;

  console.log(`IP de la requête: ${ip}`);
  next();
});

app.use(useragent.express());

// Middleware pour ajouter les informations de l'utilisateur
app.use((req, res, next) => {
  req.useragent = useragent.parse(req.headers["user-agent"]);
  console.log(req.useragent);

  next();
}); */

console.log(theDate());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/naniens", userRoutes);
app.use("/api/naniens/confirmation-email", confirmationEmailRoutes);
app.use("/api/naniens/publications", publicationsRoutes);
app.use("/api/naniens/pubcomment", commentairesRoutes);
app.use("/api/naniens/likepub", likePubRoutes);
app.use("/api/naniens/notifications", notificationsRoutes);
app.use("/api/naniens/search", searchRoutes);
app.use("/assets", express.static(path.join(__dirname, "assets")));
export default app;
