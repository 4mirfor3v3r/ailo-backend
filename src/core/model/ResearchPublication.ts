class ResearchPublication {
    title: string;
    authors: string;
    publicationDate: Date;
    publisher: string;
    abstract: string;
    keywords: string;
    link: string;
    constructor(title: string, authors: string, publicationDate: Date, publisher: string, abstract: string, keywords: string, link: string) {
        this.title = title;
        this.authors = authors;
        this.publicationDate = publicationDate;
        this.publisher = publisher;
        this.abstract = abstract;
        this.keywords = keywords;
        this.link = link;
    }
    static getInstace(title: string, authors: string, publicationDate: Date, publisher: string, abstract: string, keywords: string, link: string) {
        return new ResearchPublication(title, authors, publicationDate, publisher, abstract, keywords, link);
    }
}