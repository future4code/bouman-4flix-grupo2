import { Request, Response } from "express";
import { CreateMovieUC } from "../../../business/usecase/movies/createMovie";
import { MovieDB } from "../../../data/movieDB";

export const createMovieEndpoint = async (req: Request, res: Response) => {
    try{
        const createMovieUC = new CreateMovieUC(new MovieDB());
        const result = await createMovieUC.execute({
            title: req.body.title,
            date: req.body.date,
            length: req.body.length,
            synopsis: req.body.synopsis,
            link: req.body.link,
            picture: req.body.picture,
        })

        res.status(200).send(result)
    } catch(error) {
        res.status(error.errorCode || 400).send({
            message: error.message
        })
    }
}