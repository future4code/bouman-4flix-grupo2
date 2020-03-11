import express, { Request, Response } from "express";
import { createMovieEndpoint } from "./endpoints/movies/createMovie";


const app = express();
app.use(express.json());


app.post("/movies", createMovieEndpoint);

export default app;
