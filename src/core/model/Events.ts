class Events {
    event_id: number;
    event_title: string;
    event_type: string;
    event_description: string;
    event_time: Date;
    event_poster: Blob;
    event_link: string;

    constructor(event_id: number, event_title: string, event_type: string, event_description: string, event_time: Date, event_poster: Blob, event_link: string) {
        this.event_id = event_id;
        this.event_title = event_title;
        this.event_type = event_type;
        this.event_description = event_description;
        this.event_time = event_time;
        this.event_poster = event_poster;
        this.event_link = event_link;
    }
}

export default Events;
