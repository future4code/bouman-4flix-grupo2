import { Movie } from "../../entities/movie";
import { MovieGateway } from "../../gateways/movieGateway";
import { InvalidParameterError } from "../../error/InvalidParameterError";
import { NotFoundError } from "../../error/NotFoundError";


export class GetMovieByIdUC {
    constructor(private movieGateway: MovieGateway) {}

    public async execute(input:CreateMovieUCInput): Promise<CreateMovieUCOutput> {
        if(input.id === undefined) {
            throw new InvalidParameterError('Id must not be an undefined')
        } else if(input.id === ""){
            throw new InvalidParameterError('Id must not be an empty string')
        }

        const movie = await this.movieGateway.getMovieById(input.id)

        if(movie === undefined){
            throw new NotFoundError("Movie not found")
        }

        return {
            result: movie
        }

    }
}


export interface CreateMovieUCInput {
    id: string
}

export interface CreateMovieUCOutput {
    result: Movie
}