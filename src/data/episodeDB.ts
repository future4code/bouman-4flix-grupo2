import { BaseDB } from "./baseDB";
import { Episode, EpisodeWithSeries } from "../business/entities/episode";
import { EpisodeGateway } from "../business/gateways/episodeGateway";


export class EpisodeDB extends BaseDB implements EpisodeGateway{
    private episodeTableName: string = "episodes";

    public async createEpisode(episode: EpisodeWithSeries): Promise<void> {
        await this.connection.raw(`INSERT INTO ${this.episodeTableName} (id, title, length, link, picture, synopsis, series_id) 
            VALUES (
                '${episode.getId()}', 
                '${episode.getTitle()}', 
                '${episode.getLength()}',
                '${episode.getLink()}', 
                '${episode.getPicture()}', 
                '${episode.getSynopsis()}',
                '${episode.getSeries().getId()}');`
        )
    }

    public async getAllEpisodesFromSeries(seriesId: string): Promise<Episode[] | undefined> {
        const result = await this.connection.raw(
            `SELECT id, title, length, link, picture, synopsis from ${this.episodeTableName} WHERE series_id = '${seriesId}'`
        )

        if(result[0].length === -1) {
            return undefined
        }

        const allEpisodesFromSeries = result[0]

        return (
            allEpisodesFromSeries
        )    
    }
}