import { IController } from "core/shared/IController";
import ResearchPublicationWorker from "../worker/ResearchPublicationWorker";
import express from "express";

export class ResearchPublicationController implements IController {
	path = "/research-publication";
	router = express.Router();
	_worker: ResearchPublicationWorker;

	constructor() {
		this._worker = new ResearchPublicationWorker();
		this.initRouter();
	}

	initRouter() {
		this.router.get(`${this.path}`, this.getAllResearchPublications, this.searchResearchPublication);
		this.router.get(`${this.path}/:research_publication_id`, this.getResearchPublicationById);
        this.router.delete(`${this.path}/:research_publication_id`, this.deleteResearchPublication);
        this.router.patch(`${this.path}/:research_publication_id`, this.updateResearchPublication);
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

	private getResearchPublicationById = (req: express.Request,res: express.Response) => {
		const researchPublicationId = Number(req.params.id);
		this._worker
			.getResearchPublicationById(researchPublicationId)
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.json(error);
			});
	};

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
