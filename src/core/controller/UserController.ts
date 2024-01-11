import { IController } from "core/shared/IController";
import UserWorker from "../worker/UserWorker";
import express from "express";

export class UserController implements IController{
    path = '/user';
    router = express.Router();
    _worker : UserWorker
    constructor(){
        this._worker = new UserWorker();
        this.initRouter()
    }
    initRouter(){
		this.router.get(`${this.path}/get-all`, this.getAllUser);
    }

    private getAllUser = (req: express.Request, res: express.Response)=>{
		this._worker.getAllUser().then((data)=>{
			res.json(data)
		}).catch((error) => {
			res.json(error)
		})
    }
}