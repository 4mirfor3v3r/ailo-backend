import { IController } from 'core/shared/IController';
import EventWorker from '../worker/EventWorker';
import express from 'express';

export class EventController implements IController {
  path = '/event';
  router = express.Router();
  _worker: EventWorker;

  constructor() {
    this._worker = new EventWorker();
    this.initRouter();
  }

  initRouter() {
    this.router.get(`${this.path}/get-all`, this.getAllEvents);
    this.router.get(`${this.path}/get/:id`, this.getEventById);
    
  }


  private getAllEvents = (req: express.Request, res: express.Response) => {
    this._worker
    .getAllEvent()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
  }

  private getEventById = (req: express.Request, res: express.Response) => {
    this._worker
    .getEventById(Number(req.params.id))
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
  }
}
