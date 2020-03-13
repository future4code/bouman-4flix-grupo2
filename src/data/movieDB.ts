import { BaseDB } from "./baseDB";
import { Movie } from "../business/entities/movie"
import { MovieGateway } from "../business/gateways/movieGateway";


export class MovieDB extends BaseDB implements MovieGateway{
    private movieTableName: string = "movies";

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        return `${year + "-" + month + "-" + date}`;
    }

    private mapDbDateToDate(input: string): Date {
        return new Date(input);
    }

    public async createMovie(movie: Movie): Promise<void> {
        await this.connection.raw(`INSERT INTO ${this.movieTableName} (id, title, date, length, synopsis, link, picture) 
            VALUES (
                '${movie.getId()}', 
                '${movie.getTitle()}', 
                '${this.mapDateToDbDate(movie.getDate())}', 
                '${movie.getLength()}', 
                '${movie.getSynopsis()}', 
                '${movie.getLink()}', 
                '${movie.getPicture()}');`
        )
    }

    public async getMovieById(id: string): Promise<Movie | undefined> {
        const result = await this.connection.raw(
            `SELECT * FROM ${this.movieTableName} WHERE id = '${id}';`)
        
        if(!result[0][0]) {
            return undefined
        }

        const movie = new Movie(
            result[0][0].id,
            result[0][0].title,
            this.mapDbDateToDate(result[0][0].date),
            result[0][0].length,
            result[0][0].synopsis,
            result[0][0].link,
            result[0][0].picture,
        )

        return (
            result[0][0] && movie
        )
    }
}
