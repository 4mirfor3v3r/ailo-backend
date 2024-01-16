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
        this.router.get(`${this.path}/get-all`, this.getAllResearchPublications);
        this.router.get(`${this.path}/get/:id`, this.getResearchPublicationById);
    }
    
    private getAllResearchPublications = (
        req: express.Request,
        res: express.Response
    ) => {
        this._worker
        .getAllResearchPublication()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json(error);
        });
    };
    
    private getResearchPublicationById = (
        req: express.Request,
        res: express.Response
    ) => {
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
}