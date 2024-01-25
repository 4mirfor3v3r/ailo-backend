import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import Patents from '../model/Patents';

export default class PatentWorker {

    // CREATE
    addPatent(patent: Patents): Promise<BaseResponse<Patents>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query(
                `INSERT INTO patents (title, type, no_patent, date, status) VALUES ('${patent.title}', '${patent.type}', '${patent.no_patent}', '${patent.date}', '${patent.status}')`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.affectedRows > 0) {
                        resolve(BaseResponse.success(patent));
                    } else {
                        resolve(BaseResponse.error('Failed to add patent'));
                    }
                }
            );
        });
    }

    // READ
    getAllPatent(): Promise<BaseResponse<Patents[]>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query('SELECT * FROM patents', (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(BaseResponse.success(result));
                } else {
                    resolve(BaseResponse.error('Patent not found'));
                }
            });
        });
    }

    // UPDATE
    updatePatent(patentId: number, updatedPatent: Patents): Promise<BaseResponse<string>> {
      return new Promise((resolve, reject) => {
        const setClause = Object.entries(updatedPatent)
          .filter(([key, value]) => value !== undefined) 
          .map(([key, value]) => `${key} = '${value}'`)
          .join(', ');
    
        if (!setClause) {
          // No fields to update, resolve with success message
          resolve(BaseResponse.success('No fields to update'));
          return;
        }
    
        SQLSingleton.getInstance().query(
          `UPDATE patents SET ${setClause} WHERE id = ${patentId}`,
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
              if (result && result.affectedRows > 0) {
                resolve(BaseResponse.success('Patent deleted'));
              } else {
                  resolve(BaseResponse.error('Patent not found'));
              }
            }
          );
        });
      }
}