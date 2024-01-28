class ResearchArea {
    research_area_id: number;
    research_area_name: string;
    research_area_description: string;
    research_area_icon: string;
    research_area_image: string;

    constructor(research_area_id: number, research_area_name: string, research_area_description: string, research_area_icon: string, research_area_image: string) {
        this.research_area_id = research_area_id;
        this.research_area_name = research_area_name;
        this.research_area_description = research_area_description;
        this.research_area_icon = research_area_icon;
        this.research_area_image = research_area_image;
    }
}

export default ResearchArea;