class ResearchPublications {
    research_publication_id: number;
    research_area_id: number;
    research_publication_title: string;
    research_publication_abstract: string;
    research_publication_date: Date;
    research_publication_link: string;

    constructor(research_publication_id: number, research_area_id: number, research_publication_title: string, research_publication_abstract: string, research_publication_date: Date, research_publication_link: string) {
        this.research_publication_id = research_publication_id;
        this.research_area_id = research_area_id;
        this.research_publication_title = research_publication_title;
        this.research_publication_abstract = research_publication_abstract;
        this.research_publication_date = research_publication_date;
        this.research_publication_link = research_publication_link;
    }
}

export default ResearchPublications;