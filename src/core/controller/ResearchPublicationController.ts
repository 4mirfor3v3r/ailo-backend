import { IController } from "core/shared/IController";
import ResearchAreaWorker from "../worker/ResearchAreaWorker";
import ResearchPublicationWorker from "../worker/ResearchPublicationWorker";
import express from "express";

export class ResearchPublicationController implements IController {
	path = "/research-publication";
	router = express.Router();
	_worker: ResearchPublicationWorker;
	_RAWorker: ResearchAreaWorker;

	constructor() {
		this._worker = new ResearchPublicationWorker();
		this._RAWorker = new ResearchAreaWorker();
		this.initRouter();
	}

	initRouter() {
		
		// Research Publication
		this.router.get(`${this.path}`, this.getLatestResearchPublications);
		this.router.get(`${this.path}/search`, this.searchResearchPublication);
		this.router.get(`${this.path}/all`, this.getAllResearchPublications);
		this.router.get(`${this.path}/all`, this.searchResearchPublication);
		this.router.get(`${this.path}/all/:research_publication_id`, this.getResearchPublicationById);
		this.router.post(`${this.path}/all/:research_publication_id`, this.addResearchPublication);
        this.router.delete(`${this.path}/all/:research_publication_id`, this.deleteResearchPublication);
        this.router.patch(`${this.path}/all/:research_publication_id`, this.updateResearchPublication);

		// Research Area
		this.router.get(`${this.path}/research-area`, this.getAllResearchArea);
		this.router.get(`${this.path}/research-area/:research_area_id`, this.getResearchPublicationByResearchAreaId);
		this.router.post(`${this.path}/research-area/:research_area_id`, this.addResearchArea);
		this.router.patch(`${this.path}/research-area/:research_area_id`, this.updateResearchArea);
		this.router.delete(`${this.path}/research-area/:research_area_id`, this.deleteResearchArea);
	}

	// POST
	private addResearchPublication = async (req: express.Request, res: express.Response) => {
		try {
			const newResearchPublication = req.body;
			const researchPublicationData = await this._worker.addResearchPublication(newResearchPublication);
			res.json(researchPublicationData);
		} catch (error) {
			res.json(error);
		}
	}

	private addResearchArea = async (req: express.Request, res: express.Response) => {
		try {
			const newResearchArea = req.body;
			const researchAreaData = await this._RAWorker.addResearchArea(newResearchArea);
			res.json(researchAreaData);
		} catch (error) {
			res.json(error);
		}
	}

	// private addResearchAreaImage = async (req: express.Request, res: express.Response) => {
	// 	try {
	// 		const newResearchArea = req.body;
	// 		// ... (your existing logic for handling the file and uploading to Firebase Storage)
			

	
	// 		// Assuming you have the download URL of the uploaded image
	// 		newResearchArea.research_area_image = 'https://example.com/path/to/image.jpg';
	
	// 		const researchAreaData = await this._RAWorker.addImageResearchArea(newResearchArea);
	// 		res.json(researchAreaData);
	// 	} catch (error) {
	// 		res.json(error);
	// 	}
	// }
	
	// GET

	private getAllResearchArea = (req: express.Request, res: express.Response) => {
		this._RAWorker
			.getAllResearchArea()
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.json(error);
			});
	}


	private getResearchPublicationByResearchAreaId = (req: express.Request, res: express.Response) => {
		const researchAreaId = Number(req.params.research_area_id);
		this._RAWorker
			.getResearchPublicationByAreaId(researchAreaId)
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.json(error);
			});

	}
	
	// private getResearchAreaDetails = async (req: express.Request, res: express.Response) => {
	// 	const research_area_name = req.params.research_area_short_name;

	// 	try {
	// 		const researchAreaDetails = await this._RAWorker.getResearchAreaByTitle(research_area_name);
	
	// 		if (researchAreaDetails.status === 'ok' && researchAreaDetails.response) {
	// 			const research_area_id = researchAreaDetails.response.research_area_id;
	
	// 			const researchPublications = await this._worker.getAllResearchPublicationByResearchAreaId(research_area_id);
	
	// 			res.json({
	// 				researchAreaDetails,
	// 				researchPublications,
	// 			});
	// 		} else {
	// 			res.json(researchAreaDetails);
	// 		}
	// 	} catch (error) {
	// 		res.status(500).json(error);
	// 	}
	// };
	
	


	// private getResearchPublicationByResearchAreaId = (req: express.Request, res: express.Response) => {
	// 	const researchAreaId = Number(req.params.research_area_id);
	// 	this._worker
	// 		.getAllResearchPublicationByResearchAreaId(researchAreaId)
	// 		.then((data) => {
	// 			res.json(data);
	// 		})
	// 		.catch((error) => {
	// 			res.json(error);
	// 		});

	// }
	


	private getAllResearchPublications = (req: express.Request, res: express.Response ) => {
		this._worker
			.getAllResearchPublication()
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.json(error);
			});
	};

	private getLatestResearchPublications = (req: express.Request, res: express.Response) => {
		this._worker
			.getLatestResearchPublication()
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.json(error);
			});
	}

	private getResearchPublicationById = (req: express.Request,res: express.Response) => {
		const researchPublicationId = Number(req.params.research_publication_id);
		this._worker
			.getResearchPublicationById(researchPublicationId)
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.json(error);
			});
	}

    private searchResearchPublication = async (req: express.Request, res: express.Response) => {
		try {
			const searchQuery = req.query.q as string;

			const searchResult = await this._worker.SearchResearchPublication(searchQuery);
			res.json(searchResult);
		} catch (error) {
			res.json(error);
		}
	}


	// PATCH
    private updateResearchPublication = async (req: express.Request, res: express.Response) => {
		try {
			const researchPublicationId = Number(req.params.research_publication_id);
			const updatedResearchPublication = req.body;
			const researchPublicationData = await this._worker.updateResearchPublicationById(researchPublicationId, updatedResearchPublication);
			res.json(researchPublicationData);
		} catch (error) {
			res.json(error);
		}
	}

	private updateResearchArea = async (req: express.Request, res: express.Response) => {
		try {
			const researchAreaId = Number(req.params.research_area_id);
			const updatedResearchArea = req.body;
			const researchAreaData = await this._RAWorker.updateResearchArea(updatedResearchArea);
			res.json(researchAreaData);
		} catch (error) {
			res.json(error);
		}
	}

	private updateResearchAreaImage = async (req: express.Request, res: express.Response) => {
		try {
			const researchAreaId = Number(req.params.research_area_id);
			const updatedResearchArea = req.body;
			const researchAreaData = await this._RAWorker.updateResearchArea(updatedResearchArea);
			res.json(researchAreaData);
		} catch (error) {
			res.json(error);
		}
	}

	// DELETE

    private deleteResearchPublication = async (req: express.Request, res: express.Response) => {
        try {
            const researchPublicationId = Number(req.params.research_publication_id);
            const deletionResult = await this._worker.deleteResearchPublication(researchPublicationId);

        if (deletionResult.status === 'ok') {
            res.json({
                status: 'ok',
                message: 'ResearchPublication deleted successfully'
            });
        } else {
            res.json(deletionResult);
        }
    } catch (error) {
        res.status(500).json(error);
    }
    };

	private deleteResearchArea = async (req: express.Request, res: express.Response) => {
		try {
			const researchAreaId = Number(req.params.research_area_id);
			const deletionResult = await this._RAWorker.deleteResearchArea(researchAreaId);

			if (deletionResult.status === 'ok') {
				res.json({
					status: 'ok',
					message: 'ResearchA rea deleted successfully'
				});
			} else {
				res.json(deletionResult);
			}
		}
		catch (error) {
			res.status(500).json(error);
		}
	}

}
