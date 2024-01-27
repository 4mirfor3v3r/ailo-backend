import { IController } from 'core/shared/IController';
import EventWorker from '../worker/EventWorker';
import Events from '../model/Events';
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
    this.router.get(`${this.path}`, this.getEvents);
    this.router.get(`${this.path}/:event_id`, this.getEventById);
    this.router.post(`${this.path}/:event_id`, this.addEvent);
    this.router.delete(`${this.path}/:event_id`, this.deleteEvent);
    this.router.patch(`${this.path}/:event_id`, this.updateEvent);
    
  }


  private getEvents = async (req: express.Request, res: express.Response) => {
    try {
        const category = req.query.category as string;
        const year = req.query.year as string;
        const month = req.query.month as string;

        if (category || year || month) {
            const eventData = await this._worker.getEventByFilter(category, year, month);
            res.json(eventData);
        } else {
            const eventData = await this._worker.getAllEvent();
            res.json(eventData);
        }
    } catch (err) {
        res.json(err);
    }
  }





  private getEventById = (req: express.Request, res: express.Response) => {
    this._worker
      .getEventById(Number(req.params.event_id))
      .then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
  }
  

  private addEvent = async (req: express.Request, res: express.Response) => {
    try {
      const event: Events = new Events(
        0,
        req.body.title,
        req.body.type,
        req.body.description,
        req.body.time,
        req.body.poster,
        req.body.link
      );

      const eventData = await this._worker.addEvent(event);
      res.json(eventData);
    } catch (err) {
      res.json(err);
    }
  }

  private updateEvent = async (req: express.Request, res: express.Response) => {
    try {
      const event_id = Number(req.params.event_id);
      const updatedEvent: Events = {
        event_id,
        event_title: req.body.title,
        event_type: req.body.type,
        event_description: req.body.description,
        event_time: req.body.time,
        event_poster: req.body.poster,
        event_link: req.body.link,
      };
  
      const eventData = await this._worker.updateEvent(event_id, updatedEvent);
      res.json(eventData);
    } catch (err) {
      res.json(err);
    }
  }

  private deleteEvent = async (req: express.Request, res: express.Response) => {
    try {
      const event_id = Number(req.params.event_id);
      const eventData = await this._worker.deleteEvent(event_id);
      res.json(eventData);
    } catch (err) {
      res.json(err);
    }
  }
}
