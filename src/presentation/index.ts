import express, { Request, Response } from "express";
import { createMovieEndpoint } from "./endpoints/movies/createMovie";
import { createSeriesEndpoint } from "./endpoints/series/createSeries";
import { getMovieByIdEndpoint } from "./endpoints/movies/getMovieById";
import { getSeriesByIdEndpoint } from "./endpoints/series/getSeriesById";


const app = express();
app.use(express.json());


app.post("/movies", createMovieEndpoint);
app.get("/movies/:id", getMovieByIdEndpoint)

app.post("/series", createSeriesEndpoint)
app.get("/series/:id", getSeriesByIdEndpoint)

export default app;
