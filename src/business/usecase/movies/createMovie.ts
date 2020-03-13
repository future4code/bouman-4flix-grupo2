import { Movie } from "../../entities/movie";
import { v4 } from "uuid";
import { MovieGateway } from "../../gateways/movieGateway";
import { InvalidParameterError } from "../../error/InvalidParameterError";


export class CreateMovieUC {
    constructor(private movieGateway: MovieGateway) {}

    public async execute(input:CreateMovieUCInput): Promise<CreateMovieUCOutput> {
        const id = v4();

        if (input.title === "") {
            throw new InvalidParameterError("Title must not be an empty string");
        }

        if (input.date === "") {
            throw new InvalidParameterError("Date must not be an empty string");
        }

        if (input.length === "") {
            throw new InvalidParameterError("Length must not be an empty string");
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
        

        const movie = new Movie(
            id,
            input.title,
            new Date(input.date),
            input.length,
            input.synopsis,
            input.link,
            input.picture
        )

        await this.movieGateway.createMovie(movie)

        return {
            message: "Movie created successfully"
        }
    }
}


export interface CreateMovieUCInput {
	title: string,
	date: string,
	length: string,
	synopsis: string
	link: string
	picture: string
}

export interface CreateMovieUCOutput {
    message: string
}
