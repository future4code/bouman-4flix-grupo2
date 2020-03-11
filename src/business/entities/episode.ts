export class Episode {
    constructor(
        private id: string,
        private title: string,
        private length: string,
        private link: string,
        private picture: string,
        private synopsis: string,
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
        
        public getLength(): string {
            return this.length;
        }
        
        public setLength(length: string): void {
            this.length = length;
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
                
        public getSynopsis(): string {
            return this.synopsis;
        }
        
        public setSynopsis(synopsis: string): void {
            this.synopsis = synopsis;
        }
}