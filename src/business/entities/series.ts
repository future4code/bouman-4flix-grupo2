import { Episode } from "./episode";

export class Series {
    constructor(
        private id: string,
        private title: string,
        private date: string,
        private synopsis: string,
        private link: string,
        private picture: string,
        ){ }
        
        public getId(): string {
            return this.id;
        }
        
        public setId(id: string): void {
            this.id = id;
        }
        
        public getTitle(): string {
            return this.title;
        }
        
        public setTitle(title: string): void {
            this.title = title;
        }
        
        public getDate(): string {
            return this.date;
        }
        
        public setDate(date: string): void {
            this.date = date;
        }
                
        public getSynopsis(): string {
            return this.synopsis;
        }
        
        public setSynopsis(synopsis: string): void {
            this.synopsis = synopsis;
        }
        
        public getLink(): string | undefined {
            return this.link;
        }
        
        public setLink(link: string): void {
            this.link = link;
        }

        public getPicture(): string | undefined {
            return this.picture;
        }
        
        public setPicture(picture: string): void {
            this.picture = picture;
        }
}

export class SerieWithEpisodes extends Series {
    constructor(
        id: string,
        title: string,
        date: string,
        synopsis: string,
        link: string,
        picture: string,
        private episodes: Episode[]
        ) {
            super(id, title, date, synopsis, link, picture);
        }
        
        // falta estruturar essa classe melhor - abrir atendimento para ver como acessar o array de episodios.
}