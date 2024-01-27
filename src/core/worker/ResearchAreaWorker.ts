import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import ResearchArea from "../model/ResearchAreas";

export default class ResearchAreaWorker {
    
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
                    `SELECT * FROM research_areas WHERE research_area_short_title = '${originalData}'`,
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
        
    
        // CREATE
        // addResearchArea(research_area: ResearchArea): Promise<BaseResponse<ResearchArea>> {
        //     return new Promise((resolve, reject) => {
        //         SQLSingleton.getInstance().query(`INSERT INTO research_areas (research_area_name, research_area_description, research_area_icon, research_area_image) VALUES ('${research_area.research_area_name}', '${research_area.research_area_description}', '${research_area.research_area_icon}', '${research_area.research_area_image}')`, (err, result) => {
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
    
        // UPDATE
        // updateResearchAreaById(id: number, research_area: ResearchArea): Promise<BaseResponse<ResearchArea>> {
        //     return new Promise((resolve, reject) => {
        //         SQLSingleton.getInstance().query(`UPDATE research_areas SET research_area_name = '${research_area.research_area_name}', research_area_description = '${research_area.research_area_description}', research_area_icon = '${research_area.research_area_icon}', research_area_image = '${research_area.research_area_image}' WHERE id_research_area = ${id}`, (err, result) => {
        //             if (err) {
}