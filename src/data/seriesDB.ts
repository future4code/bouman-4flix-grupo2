import { BaseDB } from "./baseDB";
import { Series } from "../business/entities/series";
import { SeriesGateway } from "../business/gateways/seriesGateway";


export class SeriesDB extends BaseDB implements SeriesGateway{
    private seriesTableName: string = "series";

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        return `${year + "-" + month + "-" + date}`;
    }

    private mapDbDateToDate(input: string): Date {
        return new Date(input);
    }

    public async createSeries(series: Series): Promise<void> {
        await this.connection.raw(`INSERT INTO ${this.seriesTableName} (id, title, date, synopsis, link, picture) 
            VALUES (
                '${series.getId()}', 
                '${series.getTitle()}', 
                '${this.mapDateToDbDate(series.getDate())}',  
                '${series.getSynopsis()}', 
                '${series.getLink()}', 
                '${series.getPicture()}');`
        )
    }

    public async getSeriesById(id: string): Promise<Series | undefined> {
        const result = await this.connection.raw(
            `SELECT * FROM ${this.seriesTableName} WHERE id = '${id}';`)
        
        if(!result[0][0]) {
            return undefined
        }

        const series = new Series(
            result[0][0].id,
            result[0][0].title,
            this.mapDbDateToDate(result[0][0].date),
            result[0][0].synopsis,
            result[0][0].link,
            result[0][0].picture,
        )

        return (
            result[0][0] && series
        )
    }
}