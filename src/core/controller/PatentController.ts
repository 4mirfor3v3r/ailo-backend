  import { IController } from 'core/shared/IController';
  import PatentWorker from '../worker/PatentWorker';
  import Patents from '../model/Patents';
  import express from 'express';




  export class PatentController implements IController {
    path = '/patents';
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
      }).catch((err) => {
        res.send(err);
      });
    }

    private addPatent = async (req: express.Request, res: express.Response) => {
      try {
        const patent: Patents = new Patents(
          0,
          req.body.title,
          req.body.type,
          req.body.noPatent,
          req.body.date,
          req.body.status
        );

        const patentData = await this._worker.addPatent(patent);
        res.json(patentData);
      } catch (err) {
        res.json(err);
      }
    }

    private updatePatent = async (req: express.Request, res: express.Response) => {
    try {
      const patentId = Number(req.params.patent_id);
      const updatedPatent: Patents = {
        id: patentId,
        title: req.body.title,
        type: req.body.type,
        no_patent: req.body.noPatent,
        date: req.body.date,
        status: req.body.status,
      };

      const patentData = await this._worker.updatePatent(patentId, updatedPatent);
      res.json(patentData);
    } catch (err) {
      res.json(err);
    }
  }



    private deletePatent = async (req: express.Request, res: express.Response) => {
      try {
        const patentData = await this._worker.deletePatent(Number(req.params.patent_id));
        res.json(patentData);
      } catch (err) {
        res.json(err)
      }
    }}
