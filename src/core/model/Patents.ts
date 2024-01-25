class Patents {
    id: number;
    title: string;
    type: string;
    no_patent: string;
    date: Date;
    status: string;
    constructor(id: number, title: string, type: string, noPatent: string, date: Date, status: string) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.no_patent = noPatent;
        this.date = date;
        this.status = status;
    }
}

export default Patents;