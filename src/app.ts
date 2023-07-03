import "express-async-errors";
import "dotenv/config"
import "reflect-metadata";
import express, { Application } from "express";
import { userRoutes } from "./routes/user.routes";
import { handleErrors } from "./middlewares/handleErros";
import { sessionRoutes } from "./routes/session.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { realEstateRoutes } from "./routes/realEstate.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes)
app.use("/login", sessionRoutes)
app.use("/categories", categoriesRoutes)
app.use("/realEstate", realEstateRoutes)

app.use(handleErrors)

export default app;