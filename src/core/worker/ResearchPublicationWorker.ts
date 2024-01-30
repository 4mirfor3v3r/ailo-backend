import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import ResearchPublications from '../model/ResearchPublications';

export default class ResearchPublicationWorker {
    

    // CREATE
    addResearchPublication(researchPublication: ResearchPublications): Promise<BaseResponse<ResearchPublications>> {
      return new Promise((resolve, reject) => {
          SQLSingleton.getInstance().query(
              `INSERT INTO research_publication (research_area_id, research_publication_title, research_publication_abstract, research_publication_date, research_publication_link) VALUES ('${researchPublication.research_area_id}', '${researchPublication.research_publication_title}', '${researchPublication.research_publication_abstract}', '${researchPublication.research_publication_date}', '${researchPublication.research_publication_link}')`,
              (err, result) => {
                  if (err) {
                      reject(err);
                  }
                  if (result && result.affectedRows > 0) {
                      resolve(BaseResponse.success(researchPublication));
                  } else {
                      resolve(BaseResponse.error('Failed to add researchPublication'));
                  }
              }
          );
      });
    }

    // READ 
    getAllResearchPublicationByResearchAreaId(researchAreaId: number): Promise<BaseResponse<ResearchPublications[]>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query(`SELECT * FROM research_publication WHERE research_area_id = ${researchAreaId}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(BaseResponse.success(result));
            });
        });
    }


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
            SQLSingleton.getInstance().query(`SELECT * FROM research_publication WHERE research_publication_id = ${id}`, (err, result) => {
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

    SearchResearchPublication(searchQuery: string): Promise<BaseResponse<ResearchPublications[]>> {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM research_publication
            WHERE research_publication_title LIKE ? OR research_publication_abstract LIKE ?;
            `;
            const params = [`%${searchQuery}%`, `%${searchQuery}%`];
    
            SQLSingleton.getInstance().queryParam(query, params, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(BaseResponse.success(result));
                } else {
                    resolve(BaseResponse.error('Research or Publication not found'));
                }
            });
        });
    }
     

    // UPDATE
    updateResearchPublicationById(id: number, researchPublication: ResearchPublications): Promise<BaseResponse<ResearchPublications>> {
        return new Promise((resolve, reject) => {
            const setClause = Object.entries(researchPublication)
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => `${key} = '${value}'`)
                .join(', ');
    
            if (!setClause) {
                resolve(BaseResponse.success(researchPublication));
                return;
            }
    
            SQLSingleton.getInstance().query(
                `UPDATE research_publication SET ${setClause} WHERE research_publication_id = ${id}`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.affectedRows > 0) {
                        resolve(BaseResponse.success(researchPublication));
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
            SQLSingleton.getInstance().query(`DELETE FROM research_publication WHERE research_publication_id = ${id}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.affectedRows > 0) {
                    resolve(BaseResponse.success(result[0]));
                } else {
                    resolve(BaseResponse.error('Research Publication not found'));
                }
            });
        });
    }
}