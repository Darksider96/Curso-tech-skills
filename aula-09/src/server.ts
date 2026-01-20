import { Application, request, Response, Express } from "express"
import CountryRoutes from "./routes/country.route";
import dot from "dotenv";
import express from "express";

const app: Application = express();
const PORT: (string | number) = process.env.APP_PORT || 3000;

app.use(express.json)



