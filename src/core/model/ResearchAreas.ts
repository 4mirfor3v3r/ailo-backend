import ResearchPublications from '../model/ResearchPublications';


class ResearchArea {
    research_area_id: number;
    research_area_name: string;
    research_area_short_name: string;
    research_area_description: string;
    research_area_icon: string;
    research_area_image: string;
    research_and_publications: ResearchPublications[];

    constructor(research_area_id: number, research_area_name: string, research_area_short_name: string, research_area_description: string, research_area_icon: string, research_area_image: string, research_and_publications: ResearchPublications[]) {
        this.research_area_id = research_area_id;
        this.research_area_name = research_area_name;
        this.research_area_short_name = research_area_short_name;
        this.research_area_description = research_area_description;
        this.research_area_icon = research_area_icon;
        this.research_area_image = research_area_image;
        this.research_and_publications = research_and_publications;
    }
}

export default ResearchArea;