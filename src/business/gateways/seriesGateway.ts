import { Series } from "../entities/series";

export interface SeriesGateway {
    createSeries(series: Series): Promise<void>  
}