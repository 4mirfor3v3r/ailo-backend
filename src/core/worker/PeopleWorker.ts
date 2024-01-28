import SQLSingleton from '../util/SQLSingleton';
import { BaseResponse } from '../util/BaseResponse';
import Peoples from "../model/Peoples";
import { resolve } from 'path';

export default class MemberWorker {

	// CREATE
	addPeople(people: Peoples): Promise<BaseResponse<Peoples>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(
				`INSERT INTO peoples (name, code, member_status, position, study_program, biography, expertise, research_and_publication, linkedin_link, github_link, instagram_link, email, profile_picture) VALUES ('${people.name}', '${people.code}', '${people.member_status}', '${people.position}', '${people.study_program}', '${people.biography}', '${people.expertise}', '${people.research_and_publication}', '${people.linkedin_link}', '${people.github_link}', '${people.instagram_link}', '${people.email}', '${people.profile_picture}')`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					if (result && result.affectedRows > 0) {
						resolve(BaseResponse.success(people));
					} else {
						resolve(BaseResponse.error('Failed to add Member'));
					}
				}
			);
		});
	}

	// READ
    getAllPeoples(): Promise<BaseResponse<Peoples[]>> {
        return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query('SELECT * FROM peoples', (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(BaseResponse.success(result));
			});
		});
    }

	getPeopleById(id: number): Promise<BaseResponse<Peoples>> {
		return new Promise((resolve, reject) => {
			SQLSingleton.getInstance().query(`SELECT * FROM peoples WHERE people_id = ${id}`, (err, result) => {
				if (err) {
					reject(err);
				}
				if (result && result.length > 0) {
					resolve(BaseResponse.success(result[0]));
				} else {
					resolve(BaseResponse.error('Member not found'));
				}
			});
		});
	}

	filterPeopleByMemberStatus(member_status: string): Promise<BaseResponse<Peoples[]>> {
		return new Promise((resolve, reject) => {
		  try {
			// Validate member_status
			if (typeof member_status !== 'string' || member_status.trim() === '') {
			  throw new Error('Invalid member_status');
			}
	  
			// Construct the SQL query to filter people by member_status
			const query = 'SELECT * FROM peoples WHERE member_status = ?';
			const params = [member_status];
	  
			// Execute the query using your SQLSingleton or database connection
			SQLSingleton.getInstance().queryParam(query, params, (err, result) => {
			  if (err) {
				reject(err);
			  } else {
				// Check if any result is found
				if (result && result.length > 0) {
				  resolve(BaseResponse.success(result));
				} else {
				  resolve(BaseResponse.error('No matching records found'));
				}
			  }
			});
		  } catch (error) {
			reject(BaseResponse.error);
		  }
		});
	  }
	
	// UPDATE
	updatePeople(id: number, updatePeople: Peoples): Promise<BaseResponse<Peoples>> {
		return new Promise((resolve, reject) => {
			const setClauses = Object.entries(updatePeople)
				.filter(([key, value]) => value !== undefined)
				.map(([key, value]) => `${key} = '${value}'`)
				.join(', ');

			SQLSingleton.getInstance().query(
				`UPDATE peoples SET ${setClauses} WHERE people_id = ${id}`,
				(err, result) => {
					if (err) {
						reject(err);
					}
					if (result && result.affectedRows > 0) {
						resolve(BaseResponse.success(updatePeople));
					} else {
						resolve(BaseResponse.error('Member not found'));
					}
				}
			);
		});
	}
	
	// DELETE
	deletePeopleById(id: number): Promise<BaseResponse<Peoples>> {
		return new Promise((resolve, reject) => {
		  const query = 'DELETE FROM peoples WHERE people_id = ?';
		  
		  SQLSingleton.getInstance().queryParam(query, [id], (err, result) => {
			if (err) {
			  reject(err);
			} else {
			  if (result && result.affectedRows > 0) {
				resolve(BaseResponse.success(result));
			  } else {
				resolve(BaseResponse.error('Member not found'));
			  }
			}
		  });
		});
	  }

}