import { IController } from 'core/shared/IController';
import PatentWorker from '../worker/PatentWorker';
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
    this.router.get(`${this.path}/get-all`, this.getAllPatents);
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
}
