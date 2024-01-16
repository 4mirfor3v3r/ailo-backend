import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';

export default class ResearchPublicationWorker {
    getAllResearchPublication(): Promise<BaseResponse<ResearchPublication[]>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query('SELECT * FROM research_publication', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(BaseResponse.success(result));
            });
        });
    }

    getResearchPublicationById(id: number): Promise<BaseResponse<ResearchPublication>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query(`SELECT * FROM research_publication WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(BaseResponse.success(result[0]));
                } else {
                    resolve(BaseResponse.error('ResearchPublication not found'));
                }
            });
        });
    }
}