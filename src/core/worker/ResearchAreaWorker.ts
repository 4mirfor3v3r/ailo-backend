import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import ResearchArea from "../model/ResearchAreas";
import ResearchPublications from '../model/ResearchPublications';

export default class ResearchAreaWorker {

    // CREATE
    addResearchArea(researchArea: ResearchArea): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query(
                `INSERT INTO research_areas (research_area_name, research_area_short_name, research_area_description, research_area_icon, research_area_image) VALUES ('${researchArea.research_area_name}', '${researchArea.research_area_short_name}', '${researchArea.research_area_description}', '${researchArea.research_area_icon}', '${researchArea.research_area_image}')`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.affectedRows > 0) {
                        resolve(BaseResponse.success(researchArea));
                    } else {
                        resolve(BaseResponse.error('Failed to add Research Area'));
                    }
                }
            );
        });
    }

    addImageResearchArea(researchArea: ResearchArea): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().queryParam(
                `UPDATE research_areas SET research_area_image = ? WHERE research_area_id = ?`,
                [researchArea.research_area_image, researchArea.research_area_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.affectedRows > 0) {
                        resolve(BaseResponse.success(researchArea));
                    } else {
                        resolve(BaseResponse.error('Failed to add Research Area Image'));
                    }
                }
            );
        });
    }

    // READ
    getAllResearchArea(): Promise<BaseResponse<ResearchArea[]>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query('SELECT * FROM research_areas', (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(BaseResponse.success(result));
            });
        });
    }
            

    getResearchPublicationByAreaId(publicationId: number): Promise<BaseResponse<ResearchArea | null>> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT ra.*, rp.*
                FROM research_areas ra
                LEFT JOIN research_publication rp ON ra.research_area_id = rp.research_area_id
                WHERE ra.research_area_id = ?;
            `;
    
            SQLSingleton.getInstance().queryParam(query, [publicationId], (err, result) => {
                if (err) {
                    reject(err);
                }
    
                if (result && result.length > 0) {
                    const areaData = result[0];
                    const researchArea = new ResearchArea(
                        areaData.research_area_id,
                        areaData.research_area_name,
                        areaData.research_area_short_name,
                        areaData.research_area_description,
                        areaData.research_area_icon,
                        areaData.research_area_image,
                        areaData.research_publication_id ? [new ResearchPublications(
                            areaData.research_publication_id,
                            areaData.research_area_id,
                            areaData.research_publication_title,
                            areaData.research_publication_abstract,
                            areaData.research_publication_date,
                            areaData.research_publication_link
                        )] : []
                    );
    
                    resolve(BaseResponse.success(researchArea));
                } else {
                    // If result is empty, return null with an empty array for publications
                    resolve(BaseResponse.success(null));
                }
            });
        });
    }
    
    
    

    // getResearchAreaById(id: number): Promise<BaseResponse<ResearchArea>> {
    //     return new Promise((resolve, reject) => {
    //         SQLSingleton.getInstance().query(`SELECT * FROM research_areas WHERE research_area_id = ${id}`, (err, result) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             if (result && result.length > 0) {
    //                 resolve(BaseResponse.success(result[0]));
    //             } else {
    //                 resolve(BaseResponse.error('Research Area not found'));
    //             }
    //         });
    //     });
        
    // }

    // getResearchAreaIdByTitle(title: string): Promise<BaseResponse<ResearchArea>> {
    //     return new Promise((resolve, reject) => {
    //         // Convert the human-readable title to the original data using regex
    //         const originalData = title.replace(/-/g, ' ').toLowerCase();
    
    //         // Use the original data in the SQL query
    //         SQLSingleton.getInstance().query(
    //             `SELECT research_area_id FROM research_areas WHERE research_area_short_title = '${originalData}'`,
    //             (err, result) => {
    //                 if (err) {
    //                     reject(err);
    //                 }
    //                 if (result && result.length > 0) {
    //                     resolve(BaseResponse.success(result[0]));
    //                 } else {
    //                     resolve(BaseResponse.error('Research Area not found'));
    //                 }
    //             }
    //         );
    //     });
    // }
    

    // UPDATE

    updateResearchArea(researchArea: ResearchArea): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            const { research_area_id, ...updateFields } = researchArea;
            const setClauses = Object.keys(updateFields)
                .map(field => `${field} = ?`)
                .join(', ');
    
            const query = `
                UPDATE research_areas
                SET ${setClauses}
                WHERE research_area_id = ?;
            `;
    
            const params = [...Object.values(updateFields), research_area_id];
    
            SQLSingleton.getInstance().queryParam(query, params, (err, result) => {
                if (err) {
                    reject(err);
                }
    
                // Check if any rows were affected to determine if the update was successful
                if (result && result.affectedRows > 0) {
                    resolve(BaseResponse.success(researchArea));
                } else {
                    reject(new Error("Failed to update research area. No matching record found."));
                }
            });
        });
    }
    


    deleteResearchArea(researchAreaId: number): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            SQLSingleton.getInstance().query(`DELETE FROM research_areas WHERE research_area_id = ${researchAreaId}`, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result && result.length > 0) {
                    resolve(BaseResponse.success(result[0]));
                } else {
                    resolve(BaseResponse.error('Research Area not found'));
                }
            });
        });
    }
    
        
}