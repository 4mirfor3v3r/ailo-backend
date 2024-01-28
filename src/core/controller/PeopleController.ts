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
    this.router.get(`${this.path}`, this.handleGetRequest);
    this.router.get(`${this.path}/:people_id`, this.getPeopleById);
    this.router.post(`${this.path}/:people_id`, this.addPeople);
    this.router.patch(`${this.path}/:people_id`, this.updatePeople);
    this.router.delete(`${this.path}/:people_id`, this.deletePeople);
  }

  private handleGetRequest = (req: express.Request, res: express.Response) => {
    try {
      const role = req.query.role as string;

      if (role) {
        this.filterPeopleByRole(role, req, res);
      } else {
        this.getAllPeoples(req, res);
      }
    } catch (error) {
      res.json(error);
    }
  };

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

  private filterPeopleByRole = (role: string, req: express.Request, res: express.Response) => {
    this._worker
      .filterPeopleByMemberStatus(role)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  };

  private getPeopleById = (req: express.Request, res: express.Response) => {
    const peopleId = Number(req.params.people_id); // Fixed parameter name
    this._worker
      .getPeopleById(peopleId)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  };

  // POST
  private addPeople = async (req: express.Request, res: express.Response) => {
    try {
      const newPeople = req.body;
      const peopleData = await this._worker.addPeople(newPeople);
      res.json(peopleData);
    } catch (error) {
      res.json(error);
    }
  };

  // PATCH
  private updatePeople = async (req: express.Request, res: express.Response) => {
    try {
      const peopleId = Number(req.params.people_id);
      const updatedPeople = req.body;

      const peopleData = await this._worker.updatePeople(peopleId, updatedPeople);

      res.json(peopleData);
    } catch (error) {
      res.json(error);
    }
  };

  // Delete

  private deletePeople = async (req: express.Request, res: express.Response) => {
    try {
      const peopleId = Number(req.params.people_id);
      const peopleData = await this._worker.deletePeopleById(peopleId);
      res.json(peopleData);
    } catch (error) {
      res.json(error);
    }
  }
}
