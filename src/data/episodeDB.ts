import { BaseDB } from "./baseDB";
import { Episode } from "../business/entities/episode";
import { EpisodeGateway } from "../business/gateways/episodeGateway";


export class EpisodeDB extends BaseDB implements EpisodeGateway{
    private episodeTableName: string = "episodes";

    public async createEpisode(episode: Episode): Promise<void> {
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
}