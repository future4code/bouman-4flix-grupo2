import { Movie } from "../entities/movie";

export interface MovieGateway {
    createMovie(movie: Movie): Promise<void>  
    getMovieById(id: string): Promise<Movie | undefined>
}