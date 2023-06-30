import "dotenv/config"
import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { userRoutes } from "./routes/user.routes";
import { handleErrors } from "./middlewares/handleErros";
import { sessionRoutes } from "./routes/session.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes)
app.use("/login", sessionRoutes)

app.use(handleErrors)

export default app;