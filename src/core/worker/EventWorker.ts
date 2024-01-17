import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';

export default class EventWorker {
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
}
