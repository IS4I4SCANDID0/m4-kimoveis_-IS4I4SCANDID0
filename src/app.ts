import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { userRoutes } from "./routes/user.routes";
import { handleErrors } from "./middlewares/handleErros";

const app = express();
app.use(express.json());

app.use("/users", userRoutes)

app.use(handleErrors)

export default app;