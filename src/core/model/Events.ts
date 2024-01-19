class Events {
    eventTitle: string;
    eventType: string;
    eventDescription: string;
    eventTime: Date;
    eventPoster: Blob;
    eventLink: string;
    constructor(eventTitle: string, eventType: string, eventDescription: string, eventTime: Date, eventPoster: Blob, eventLink: string) {
        this.eventTitle = eventTitle;
        this.eventType = eventType;
        this.eventDescription = eventDescription;
        this.eventTime = eventTime;
        this.eventPoster = eventPoster;
        this.eventLink = eventLink;
    }
}