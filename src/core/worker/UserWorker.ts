import SQLSingleton from './../util/SQLSingleton';
import { BaseResponse } from './../util/BaseResponse';

export default class UserWorker {
    getAllUser(): Promise<BaseResponse<User[]>> {
        return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query('SELECT * FROM user', (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(BaseResponse.success(result));
			});
		});
    }
}