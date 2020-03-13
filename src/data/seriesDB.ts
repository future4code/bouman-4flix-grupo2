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
}