import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';

export default class ResearchPublicationWorker {
    


    // READ
    getAllResearchPublication(): Promise<BaseResponse<ResearchPublications[]>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query('SELECT * FROM research_publication', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(BaseResponse.success(result));
            });
        });
    }

    getResearchPublicationById(id: number): Promise<BaseResponse<ResearchPublications>> {
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

    getLatestResearchPublication(): Promise<BaseResponse<ResearchPublications[]>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query('SELECT * FROM research_publication ORDER BY research_publication_date DESC LIMIT 3', (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(BaseResponse.success(result));
                } else {
                    resolve(BaseResponse.error('ResearchPublication not found'));
                }
            });
        });
    }

    SearchResearchPublication(title: string, description: string): Promise<BaseResponse<ResearchPublications[]>> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM research_publication WHERE title LIKE ? OR description LIKE ?';
            const params = [`%${title}%`, `%${description}%`];
    
            SQLSingleton.getInstance().queryParam(query, params, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(BaseResponse.success(result));
                } else {
                    resolve(BaseResponse.error('ResearchPublication not found'));
                }
            });
        });
    }
     

    // UPDATE
    updateResearchPublication(id: number, updatedResearchPublication: ResearchPublications): Promise<BaseResponse<string>> {
      return new Promise((resolve, reject) => {
          const setClause = Object.entries(updatedResearchPublication)
              .filter(([key, value]) => value !== undefined)
              .map(([key, value]) => `${key} = '${value}'`)
              .join(', ');

          if (!setClause) {
              // No fields to update, resolve with success message
              resolve(BaseResponse.success('No fields to update'));
              return;
          }

          SQLSingleton.getInstance().query(
              `UPDATE research_publication SET ${setClause} WHERE id = ${id}`,
              (err, result) => {
                  if (err) {
                      reject(err);
                  }
                  if (result && result.affectedRows > 0) {
                        resolve(BaseResponse.success('ResearchPublication updated'));
                    } else {    
                        resolve(BaseResponse.error('ResearchPublication not found'));
                    }
              }
          );
      });
    }

    // DELETE
    deleteResearchPublication(id: number): Promise<BaseResponse<ResearchPublications>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query(`DELETE FROM research_publication WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.affectedRows > 0) {
                    resolve(BaseResponse.success(result[0]));
                } else {
                    resolve(BaseResponse.error('ResearchPublication not found'));
                }
            });
        });
    }
}