import { Episode } from "../../entities/episode";
import { EpisodeGateway } from "../../gateways/episodeGateway";
import { InvalidParameterError } from "../../error/InvalidParameterError";


export class GetEpisodeByIdUC {
    constructor(private episodeGateway: EpisodeGateway) {}

    public async execute(input: GetEpisodeByIdUCInput): Promise<GetEpisodeByIdUCOutput> {
        if (input.id === undefined) {
            throw new InvalidParameterError("Id must not be undefined");
        } else if (input.id === "") {
            throw new InvalidParameterError("Id must not be an empty string");
        }
    }
}