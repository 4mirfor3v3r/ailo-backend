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
		
		this.router.get(`${this.path}/all`, this.getAllResearchPublications);
		this.router.get(`${this.path}/all`, this.searchResearchPublication);
		this.router.get(`${this.path}/all/:research_publication_id`, this.getResearchPublicationById);
        this.router.delete(`${this.path}/all/:research_publication_id`, this.deleteResearchPublication);
        this.router.patch(`${this.path}/all/:research_publication_id`, this.updateResearchPublication);
		this.router.get(`${this.path}/:research_area_title`, this.getResearchAreaDetails);
		this.router.get(`${this.path}`, this.getLatestResearchPublications);

	}

	private getResearchAreaDetails = async (req: express.Request, res: express.Response) => {
		const research_area_title = req.params.research_area_title;

		try {
			const researchAreaDetails = await this._RAWorker.getResearchAreaByTitle(research_area_title);
	
			if (researchAreaDetails.status === 'ok' && researchAreaDetails.response) {
				const research_area_id = researchAreaDetails.response.research_area_id;
	
				const researchPublications = await this._worker.getAllResearchPublicationByResearchAreaId(research_area_id);
	
				res.json({
					researchAreaDetails,
					researchPublications,
				});
			} else {
				res.json(researchAreaDetails);
			}
		} catch (error) {
			console.error('Error in getResearchAreaDetails:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	};
	
	


	private getResearchPublicationByResearchAreaId = (req: express.Request, res: express.Response) => {
		const researchAreaId = Number(req.params.research_area_id);
		this._worker
			.getAllResearchPublicationByResearchAreaId(researchAreaId)
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.json(error);
			});

	}
	


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
            const searchQuery = req.query.search as string; 
            const [title, description] = searchQuery.split('|');
            const researchPublicationData = await this._worker.SearchResearchPublication(title, description);
            res.json(researchPublicationData);
        } catch (error) {
            res.json(error);
        }
    }

    private updateResearchPublication = async (req: express.Request, res: express.Response) => {
        try {
            const researchPublicationId = Number(req.params.id);
            const updatedResearchPublication = req.body;
            const researchPublicationData = await this._worker.updateResearchPublication(researchPublicationId, updatedResearchPublication);
            res.json(researchPublicationData);
        } catch (error) {
            res.json(error);
        }
    }


    private deleteResearchPublication = async (req: express.Request, res: express.Response) => {
        try {
            const researchPublicationId = Number(req.params.id);
            const researchPublicationData = await this._worker.deleteResearchPublication(researchPublicationId);
            res.json(researchPublicationData);
        } catch (error) {
            res.json(error);
        }
    };


}
