import { IController } from 'core/shared/IController';
import MemberWorker from '../worker/MemberWorker';
import express from 'express';

export class MemberController implements IController {
  path = '/member';
  adminPath = '/admin/member'
  router = express.Router();
  _worker: MemberWorker;

  constructor() {
    this._worker = new MemberWorker();
    this.initRouter();
  }

  initRouter() {
    this.router.get(`${this.path}/get-all`, this.getAllMembers);
    this.router.get(`${this.path}/get/:id`, this.getMemberById);
    // this.router.post(`${this.path}/add`, this.addMember);
    // this.router.put(`${this.path}/update`, this.updateMember);
  }


  private getAllMembers = (req: express.Request, res: express.Response) => {
    this._worker
      .getAllMember() 
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  };

  private getMemberById = (req: express.Request, res: express.Response) => {
    const memberId = Number(req.params.id); 
    this._worker
      .getMemberById(memberId) 
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  }
}
