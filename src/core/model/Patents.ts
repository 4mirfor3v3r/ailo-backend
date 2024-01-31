class Patents {
    patent_id: number;
    patent_title: string;
    patent_type: string;
    no_patent: string;
    date: Date;
    patent_status: string;

    constructor(patent_id: number, patent_title: string, patent_type: string, no_patent: string, date: Date, patent_status: string) {
        this.patent_id = patent_id;
        this.patent_title = patent_title;
        this.patent_type = patent_type;
        this.no_patent = no_patent;
        this.date = date;
        this.patent_status = patent_status;
    }
}

export default Patents;
