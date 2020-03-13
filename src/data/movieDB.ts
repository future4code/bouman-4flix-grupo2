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
}
