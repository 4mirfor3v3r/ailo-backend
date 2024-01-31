import { IController } from "core/shared/IController";
import express from "express";
import Patents from "../model/Patents";
import PatentWorker from "../worker/PatentWorker";

export class PatentController implements IController {
	path = "/patents";
	router = express.Router();
	_worker: PatentWorker;

	constructor() {
		this._worker = new PatentWorker();
		this.initRouter();
	}

	initRouter() {
		this.router.get(`${this.path}`, this.getAllPatents);
		this.router.post(`${this.path}/:patent_id`, this.addPatent);
		this.router.delete(`${this.path}/:patent_id`, this.deletePatent);
		this.router.put(`${this.path}/:patent_id`, this.updatePatent);
	}

	private getAllPatents = (req: express.Request, res: express.Response) => {
		this._worker
			.getAllPatent()
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.send(err);
			});
	};

	private addPatent = async (req: express.Request, res: express.Response) => {
		try {
			const patent: Patents = new Patents(
				0,
				req.body.title,
				req.body.type,
				req.body.noPatent,
				req.body.date,
				req.body.status,
			);

			const patentData = await this._worker.addPatent(patent);
			res.json(patentData);
		} catch (err) {
			res.json(err);
		}
	};

	private updatePatent = async (req: express.Request, res: express.Response, ) => {
		try {
			const patent_id = Number(req.params.patent_id);
			const updatedPatent: Patents = {
				patent_id,
				patent_title: req.body.title,
				patent_type: req.body.type,
				no_patent: req.body.noPatent,
				date: req.body.date,
				patent_status: req.body.status,
			};

			const patentData = await this._worker.updatePatent(
				patent_id,
				updatedPatent,
			);
			res.json(patentData);
		} catch (err) {
			res.json(err);
		}
	};

	private deletePatent = async (req: express.Request, res: express.Response, ) => {
		try {
			const patent_id = Number(req.params.patent_id);
			const patentData = await this._worker.deletePatent(patent_id);
			res.json(patentData);
		} catch (err) {
			res.json(err);
		}
	};
}
