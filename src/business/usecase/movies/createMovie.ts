import { Movie } from "../../entities/movie";
import { v4 } from "uuid";
import { MovieDB } from "../../../data/movieDB";

export class CreateMovieUC {
    constructor(private db: MovieDB) {}

    public async execute(input:CreateMovieUCInput): Promise<CreateMovieUCOutput> {
        const id = v4();

        const movie = new Movie(
            id,
            input.title,
            new Date(input.date),
            input.length,
            input.synopsis,
            input.link,
            input.picture
        )

        await this.db.createMovie(movie)

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
