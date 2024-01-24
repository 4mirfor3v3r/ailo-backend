import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';

export default class EventWorker {

	// CREATE
	addEvent(event: Events): Promise<BaseResponse<Events>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`INSERT INTO events (eventTitle, eventType, eventDescription, eventTime, eventPoster, eventLink) VALUES ('${event.eventTitle}', '${event.eventType}', '${event.eventDescription}', '${event.eventTime}', '${event.eventPoster}', '${event.eventLink}')`, (err, result) => {
				if (err) {
					reject(err);
				}
				if (result && result.length > 0) {
					resolve(BaseResponse.success(result[0]));
				} else {
					resolve(BaseResponse.error('Event not found'));
				}
			});
		});
	}

	// READ
	getAllEvent(): Promise<BaseResponse<Events[]>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query('SELECT * FROM events', (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(BaseResponse.success(result));
			});
		});
	}
	getEventById(id: number): Promise<BaseResponse<Events>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`SELECT * FROM events WHERE id = ${id}`, (err, result) => {
				if (err) {
					reject(err);
				}
				if (result && result.length > 0) {
					resolve(BaseResponse.success(result[0]));
				} else {
					resolve(BaseResponse.error('Event not found'));
				}
			});
		});
	}

	// UPDATE
	updateEvent(eventId: number, updatedEvent: Events): Promise<BaseResponse<string>> {
		return new Promise((resolve, reject) => {
		  SQLSingleton.getInstance().query(
			`UPDATE events SET eventTitle = '${updatedEvent.eventTitle}', eventType = '${updatedEvent.eventType}', eventDescription = '${updatedEvent.eventDescription}', eventTime = '${updatedEvent.eventTime}', eventPoster = '${updatedEvent.eventPoster}', eventLink = '${updatedEvent.eventLink}' WHERE id = ${eventId}`,
			(err, result) => {
			  if (err) {
				reject(err);
			  }
			  resolve(BaseResponse.success('Event updated'));
			}
		  );
		});
	}
	

	// DELETE 
	deleteEvent(id: number): Promise<BaseResponse<Events>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`DELETE FROM events WHERE id = ${id}`, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(BaseResponse.success(result));
			});
		});
	}


}
