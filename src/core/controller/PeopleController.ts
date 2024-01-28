import { IController } from 'core/shared/IController';
import PeopleWorker from '../worker/PeopleWorker';
import express from 'express';

export class PeopleController implements IController {
  path = '/people';
  router = express.Router();
  _worker: PeopleWorker;

  constructor() {
    this._worker = new PeopleWorker();
    this.initRouter();
  }

  initRouter() {
    this.router.get(`${this.path}`, this.getAllPeoples);
    this.router.get(`${this.path}/:people_id`, this.getPeopleById);
    
  }


  private getAllPeoples = (req: express.Request, res: express.Response) => {
    this._worker
      .getAllPeoples() 
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  };

  private getPeopleById = (req: express.Request, res: express.Response) => {
    const peopleId = Number(req.params.id); 
    this._worker
      .getPeopleById(peopleId) 
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  }
}
