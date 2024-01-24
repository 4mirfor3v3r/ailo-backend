import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';

export default class MemberWorker {

	// READ
    getAllMember(): Promise<BaseResponse<Members[]>> {
        return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query('SELECT * FROM members', (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(BaseResponse.success(result));
			});
		});
    }

	getMemberById(id: number): Promise<BaseResponse<Members>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`SELECT * FROM members WHERE id = ${id}`, (err, result) => {
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
	
	// CREATE
	// addMember(member: Members): Promise<BaseResponse<Members>> {
	// 	return new Promise((resolve, reject) => {
	// 		SQLSingleton.getInstance().query(`INSERT INTO members (name, email, phone, address) VALUES ('${member.name}', '${member.email}', '${member.phone}', '${member.address}')`, (err, result) => {
	// 			if (err) {
	// 				reject(err);
	// 			}
	// 			if (result && result.length > 0) {
	// 				resolve(BaseResponse.success(result[0]));
	// 			} else {
	// 				resolve(BaseResponse.error('Member not found'));
	// 			}
	// 		});
	// 	});
	// }




	// DELETE
	deleteMemberById(id: number): Promise<BaseResponse<Members>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`DELETE FROM members WHERE id = ${id}`, (err, result) => {
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