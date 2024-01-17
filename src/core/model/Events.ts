class Events {
    title: string;
    eventType: string;
    eventDescription: string;
    eventTime: Date;
    eventPoster: Blob;
    eventLink: string;
    constructor(title: string, eventType: string, eventDescription: string, eventTime: Date, eventPoster: Blob, eventLink: string) {
        this.title = title;
        this.eventType = eventType;
        this.eventDescription = eventDescription;
        this.eventTime = eventTime;
        this.eventPoster = eventPoster;
        this.eventLink = eventLink;
    }
}