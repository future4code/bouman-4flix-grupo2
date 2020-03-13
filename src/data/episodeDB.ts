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

    public async getEpisodeFromId(id: string): Promise<EpisodeWithSeries | undefined> {
        const result = await this.connection.raw(`SELECT * from ${this.episodeTableName} WHERE id = ${id};`)

        if(!result[0][0]) {
            return undefined
        }

        const episode = new EpisodeWithSeries(
            result[0][0].id,
            result[0][0].title,
            result[0][0].picture,
            result[0][0].synopsis,
            result[0][0].length,
            result[0][0].link,
            result[0][0].,
            result[0][0].id,
        )
    } 

}