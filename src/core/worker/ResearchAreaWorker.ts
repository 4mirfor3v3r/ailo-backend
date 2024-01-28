import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import ResearchArea from "../model/ResearchAreas";

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

    getResearchAreaByTitle(title: string): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            // Convert the human-readable title to the original data using regex
            const originalData = title.replace(/-/g, ' ').toLowerCase();
    
            // Use the original data in the SQL query
            SQLSingleton.getInstance().query(
                `SELECT * FROM research_areas WHERE research_area_short_name = '${originalData}'`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.length > 0) {
                        resolve(BaseResponse.success(result[0]));
                    } else {
                        resolve(BaseResponse.error('Research Area not found'));
                    }
                }
            );
        });
    }

    getResearchAreaIdByTitle(title: string): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            // Convert the human-readable title to the original data using regex
            const originalData = title.replace(/-/g, ' ').toLowerCase();
    
            // Use the original data in the SQL query
            SQLSingleton.getInstance().query(
                `SELECT research_area_id FROM research_areas WHERE research_area_short_title = '${originalData}'`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.length > 0) {
                        resolve(BaseResponse.success(result[0]));
                    } else {
                        resolve(BaseResponse.error('Research Area not found'));
                    }
                }
            );
        });
    }
    

    // UPDATE

    updateResearchArea(researchArea: ResearchArea): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            const updatedFields = Object.entries(researchArea)
                .filter(([key, value]) => value !== undefined && key !== 'research_area_id')    
                .map(([key, value]) => `${key} = '${value}'`)
                .join(', ');

            if (!updatedFields) {
                resolve(BaseResponse.success(researchArea));
                return;
            }

            SQLSingleton.getInstance().query(
                `UPDATE research_areas SET ${updatedFields} WHERE research_area_short_name = '${researchArea.research_area_short_name}'`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.affectedRows > 0) {
                        resolve(BaseResponse.success(researchArea));
                    } else {
                        resolve(BaseResponse.error('Failed to update Research Area'));
                    }
                }
            );
        });
    }


    deleteResearchArea(title: string): Promise<BaseResponse<ResearchArea>> {
        return new Promise((resolve, reject) => {
            // Convert the human-readable title to the original data using regex
            const originalData = title.replace(/-/g, ' ').toLowerCase();
    
            // Use the original data in the SQL query
            SQLSingleton.getInstance().query(
                `DELETE FROM research_areas WHERE research_area_short_name = '${originalData}'`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    if (result && result.affectedRows > 0) {
                        resolve(BaseResponse.success(result[0]));
                    } else {
                        resolve(BaseResponse.error('Research Area not found'));
                    }
                }
            );
        });
    }
    
        
}