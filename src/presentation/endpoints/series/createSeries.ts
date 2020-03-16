import { Request, Response } from "express";
import { CreateSeriesUC } from "../../../business/usecase/series/createSeries";
import { SeriesDB } from "../../../data/seriesDB";
import { EpisodeDB } from "../../../data/episodeDB";

export const createSeriesEndpoint = async (req: Request, res: Response) => {
    try {
        const createSeriesUC = new CreateSeriesUC(new SeriesDB(), new EpisodeDB());
        const result = await createSeriesUC.execute({
            title: req.body.title,
            date: req.body.date,
            synopsis: req.body.synopsis,
            link: req.body.link,
            picture: req.body.picture,
            episodes: req.body.episodes
        })

        res.status(200).send(result)
    } catch(error) {
        res.status(error.errorCode || 400).send({
            message: error.message
        })
    }
}