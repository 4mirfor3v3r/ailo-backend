import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';

export default class PatentWorker {
    getAllPatent(): Promise<BaseResponse<Patents[]>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query('SELECT * FROM patents', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(BaseResponse.success(result));
            });
        });
    }
}