import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import Events from '../model/Events';

export default class EventWorker {

	// CREATE
	addEvent(event: Events): Promise<BaseResponse<Events>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(
				`INSERT INTO events (event_title, event_type, event_description, event_time, event_poster, event_link) 
				VALUES ('${event.event_title}', '${event.event_type}', '${event.event_description}', '${event.event_time}', '${event.event_poster}', '${event.event_link}')`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					if (result && result.affectedRows > 0) {
						resolve(BaseResponse.success(result[0]));
					} else {
						resolve(BaseResponse.error('Event not found'));
					}
				}
			);
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
			SQLSingleton.getInstance().query(`SELECT * FROM events WHERE event_id = ${id}`, (err, result) => {
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
	getEventByFilter(category: string, year: string, month: string): Promise<BaseResponse<Events[]>> {
		return new Promise((resolve, reject) => {
			const validYear = /^\d{4}$/.test(year);
			const validMonth = /^\d{1,2}$/.test(month) && parseInt(month) >= 1 && parseInt(month) <= 12;

			if (!validYear || !validMonth) {
				return resolve(BaseResponse.error('Invalid year or month'));
			}

			let query = 'SELECT * FROM events WHERE 1';
			const params = [];
	
			if (category && typeof category === 'string') {
				query += ' AND event_type = ?';
				params.push(category);
			}
	
			if (year && /^\d{4}$/.test(year)) {
				query += ' AND YEAR(event_date) = ?';
				params.push(year);
			}
	
			if (month && /^\d{1,2}$/.test(month)) {
				query += ' AND MONTH(event_date) = ?';
				params.push(month);
			}
	
			SQLSingleton.getInstance().queryParam(query, params, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(BaseResponse.success(result));
			});
		});
	}
	
	
	
	
	
	


	// UPDATE
	updateEvent(event_id: number, updatedEvent: Events): Promise<BaseResponse<string>> {
		return new Promise((resolve, reject) => {
			const setClause = Object.entries(updatedEvent)
				.filter(([key, value]) => value !== undefined)
				.map(([key, value]) => `${key} = '${value}'`)
				.join(', ');

			if (!setClause) {
				// No fields to update, resolve with success message
				resolve(BaseResponse.success('No fields to update'));
				return;
			}

			SQLSingleton.getInstance().query(
				`UPDATE events SET ${setClause} WHERE event_id = ${event_id}`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					if (result && result.affectedRows > 0) {
						resolve(BaseResponse.success('Event updated'));
					} else {
						resolve(BaseResponse.error('Event not found'));
					}
				}
			);
		});
	}

	// DELETE 
	deleteEvent(event_id: number): Promise<BaseResponse<string>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(
				`DELETE FROM events WHERE event_id = ${event_id}`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					if (result && result.affectedRows > 0) {
						resolve(BaseResponse.success('Event deleted'));
					} else {
						resolve(BaseResponse.error('Event not found'));
					}
				}
			);
		});
	}
}
