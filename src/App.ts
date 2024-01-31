import SQLSingleton from './core/util/SQLSingleton';
import { Kernel } from './core/kernel/Kernel'
import { IController } from './core/shared/IController';

export class App {
    _kernel:Kernel
    _sqlSingleton:SQLSingleton
    constructor(_c:IController[]){
        this._kernel = new Kernel()
        this.initEnvironment()
        this.initController(_c)
        this._sqlSingleton = SQLSingleton.getInstance()
        this.connectStorage()
    }
    private initController(_c:IController[]){
        _c.forEach((controller) =>{
            this._kernel._defaultApps.use("/",controller.router)
        })
    }
    private connectStorage(){
        this._sqlSingleton.getConnection()
    }
    private initEnvironment(){
        this._kernel.initEnvironment()
    }
    listen(){
        this._kernel.appService()
    }
}