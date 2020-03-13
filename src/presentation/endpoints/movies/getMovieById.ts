import { Request, Response } from "express";
import { MovieDB } from "../../../data/movieDB";
import { GetMovieByIdUC } from "../../../business/usecase/movies/getMovieById";

export const getMovieByIdEndpoint = async (req: Request, res: Response) => {
    try{
        const getMovieByIdUC = new GetMovieByIdUC(new MovieDB());
        const result = await getMovieByIdUC.execute({
            id: req.params.id,
        })

        res.status(200).send(result)
    } catch(error) {
        res.status(error.errorCode || 400).send({
            message: error.message
        })
    }
}