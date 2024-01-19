import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';

export default class PatentWorker {

    // CREATE
    addPatent(patent: Patents): Promise<BaseResponse<Patents>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query(`INSERT INTO patents (patentTitle, patentType, patentNo, patentDate, patenStatus) VALUES ('${patent.title}', '${patent.type}', '${patent.noPatent}', '${patent.date}', '${patent.status}')`, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(BaseResponse.success(result[0]));
                } else {
                    resolve(BaseResponse.error('Patent not found'));
                }
            });
        });
    }

    // READ
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

    // UPDATE
    updatePatent(patentId: number, updatedPatent: Patents): Promise<BaseResponse<string>> {
        return new Promise((resolve, reject) => {
          SQLSingleton.getInstance().query(
            `UPDATE patents SET patentTitle = '${updatedPatent.title}', patentType = '${updatedPatent.type}', patentNo = '${updatedPatent.noPatent}', patentDate = '${updatedPatent.date}', patentStatus = '${updatedPatent.status}' WHERE id = ${patentId}`,
            (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(BaseResponse.success('Patent updated'));
            }
          );
        });
      }
    
    // DELETE
    deletePatent(patentId: number): Promise<BaseResponse<string>> {
        return new Promise((resolve, reject) => {
          SQLSingleton.getInstance().query(
            `DELETE FROM patents WHERE id = ${patentId}`,
            (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(BaseResponse.success('Patent deleted'));
            }
          );
        });
      }
}