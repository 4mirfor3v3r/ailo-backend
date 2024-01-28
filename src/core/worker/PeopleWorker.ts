import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import Peoples from "../model/Peoples";

export default class MemberWorker {

	// READ
    getAllPeoples(): Promise<BaseResponse<Peoples[]>> {
        return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query('SELECT * FROM peoples', (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(BaseResponse.success(result));
			});
		});
    }

	getPeopleById(id: number): Promise<BaseResponse<Peoples>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`SELECT * FROM peoples WHERE id = ${id}`, (err, result) => {
				if (err) {
					reject(err);
				}
				if (result && result.length > 0) {
					resolve(BaseResponse.success(result[0]));
				} else {
					resolve(BaseResponse.error('Member not found'));
				}
			});
		});
	}


	// DELETE
	deletePeopleById(id: number): Promise<BaseResponse<Peoples>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`DELETE FROM peoples WHERE id = ${id}`, (err, result) => {
				if (err) {
					reject(err);
				}
				if (result && result.length > 0) {
					resolve(BaseResponse.success(result[0]));
				} else {
					resolve(BaseResponse.error('Member not found'));
				}
			});
		});
	}

}