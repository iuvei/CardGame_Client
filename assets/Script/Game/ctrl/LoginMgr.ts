import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { ROUTE } from "../../Frame/common/Common";
import pomelo from "../../Frame/pomelo/pomelo";
import { UserMgr } from "./UserMgr";
import UserData from "../module/UserData";
import Pomelo from "../../Frame/pomelo/pomelo";
import { ClientData } from "../../Frame/module/ClientData";


export default class LoginMgr extends BaseCtrl {
    private static _gctor : LoginMgr;
    public static getInstance () : LoginMgr {
        if (! this._gctor) {
            this._gctor = new LoginMgr();
        }
        return this._gctor;
    }

    initNet (cb : Function) : void {
        //初始化网络
		Pomelo.getInstance().initNet(cc['RES']['Res']['global']['config']['clienthost'], cc['RES']['Res']['global']['config']['clientport'], (msg)=>{
            ClientData.getInstance().setServer(msg.list);
            cb();
        });
    }

    //获取服务器列表
    getServerList () : any {
        return ClientData.getInstance().getServer();
    }

    //请求登录
    reqLogin (msg : any, cb : Function) : void {
        Pomelo.getInstance().request(ROUTE.LOGIN, msg, cb);
    }

    //请求创建角色
    reqCreateRole (name : string, uid : number) : void {
        Pomelo.getInstance().notify(ROUTE.CREATEROLE, {
            name : name,
            uid : uid
        });
    }
}