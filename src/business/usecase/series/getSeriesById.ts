import { SeriesGateway } from "../../gateways/seriesGateway";
import { InvalidParameterError } from "../../error/InvalidParameterError";
import { NotFoundError } from "../../error/NotFoundError";
import { SeriesWithEpisodes } from "../../entities/series";
import { EpisodeGateway } from "../../gateways/episodeGateway";


export class GetSeriesByIdUC {
    constructor(private seriesGateway: SeriesGateway, private episodeGateway: EpisodeGateway) {}

    public async execute(input:CreateSeriesUCInput): Promise<CreateSeriesUCOutput> {
        if(input.id === undefined) {
            throw new InvalidParameterError('Id must not be an undefined')
        } else if(input.id === ""){
            throw new InvalidParameterError('Id must not be an empty string')
        }

        const series = await this.seriesGateway.getSeriesById(input.id)

        if(series === undefined) {
            throw new NotFoundError("Series not found")
        }

        const allEpisodes = await this.episodeGateway.getAllEpisodesFromSeries(input.id)

        if(allEpisodes === undefined) {
            throw new NotFoundError("Episodes not found")
        }

        const seriesWithEpisodes = new SeriesWithEpisodes(
            series.getId(),
            series.getTitle(),
            series.getDate(),
            series.getSynopsis(),
            series.getLink(),
            series.getPicture(),
            allEpisodes
        )

        return {
            result: seriesWithEpisodes
        }
    }
}


export interface CreateSeriesUCInput {
    id: string
}

export interface CreateSeriesUCOutput {
    result: SeriesWithEpisodes
}
