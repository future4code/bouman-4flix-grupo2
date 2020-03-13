import { Episode } from "../entities/episode";

export interface EpisodeGateway {
    createEpisode(episode: Episode): Promise<void>  
}