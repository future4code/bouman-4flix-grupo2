import { Request, Response } from "express";
import { SeriesDB } from "../../../data/seriesDB";
import { EpisodeDB } from "../../../data/episodeDB";
import { GetSeriesByIdUC } from "../../../business/usecase/series/getSeriesById";

export const getSeriesByIdEndpoint = async (req: Request, res: Response) => {
    try{
        const getSeriesByIdUC = new GetSeriesByIdUC(new SeriesDB(), new EpisodeDB());
        const result = await getSeriesByIdUC.execute({
            id: req.params.id,
        })

        res.status(200).send(result)
    } catch(error) {
        res.status(error.errorCode || 400).send({
            message: error.message
        })
    }
}