import { Series } from "../../entities/series";
import { v4 } from "uuid";
import { SeriesGateway } from "../../gateways/seriesGateway";
import { InvalidParameterError } from "../../error/InvalidParameterError";
import { Episode } from "../../entities/episode";
import { EpisodeGateway } from "../../gateways/episodeGateway";


export class CreateSeriesUC {
    constructor(private seriesGateway: SeriesGateway, private episodeGateway: EpisodeGateway) {}

    public async execute(input:CreateSeriesUCInput): Promise<CreateSeriesUCOutput> {
        const seriesId = v4();

        if (input.title === "") {
            throw new InvalidParameterError("Title must not be an empty string");
        }

        if (input.date === "") {
            throw new InvalidParameterError("Date must not be an empty string");
        }

        if (input.synopsis === "") {
            throw new InvalidParameterError("Synopsis must not be an empty string");
        }

        if (input.link === "") {
            throw new InvalidParameterError("Link must not be an empty string");
        }

        if (input.picture === "") {
            throw new InvalidParameterError("Picture must not be an empty string");
        }

        if (input.episodes.length === -1) {
            throw new InvalidParameterError("Episodes must not be an empty array");
        }
        

        const series = new Series(
            seriesId,
            input.title,
            new Date(input.date),
            input.synopsis,
            input.link,
            input.picture
        )

        await this.seriesGateway.createSeries(series)
        
        input.episodes.forEach( async(episodeInput) => {
            const episodeId = v4();

            const episodeOfSeries = new Episode(
                episodeId,
                episodeInput.title,
                episodeInput.length,
                episodeInput.link,
                episodeInput.picture,
                episodeInput.synopsis,
                series
            )

            await this.episodeGateway.createEpisode(episodeOfSeries)
        })
            

        return {
            message: "Series created successfully"
        }
    }
}


export interface CreateSeriesUCInput {
	title: string,
	date: string,
	synopsis: string
	link: string
    picture: string
    episodes: CreateEpisodeUCInput[]
}

export interface CreateEpisodeUCInput {
    title: string,
    length: string,
    link: string,
    picture: string,
    synopsis: string,
}

export interface CreateSeriesUCOutput {
    message: string
}
