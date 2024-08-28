import { User } from "./user.model";

export default class UsersChat {

    constructor(){
        this.users = [];
    }


    userHasConnected(user){
        this.users = [user, ...this.users];
    }


    userHasDisconnected(id){
        this.users = this.users.filter(user => user.id !== id);
    }

};


export class User {
    constructor(id, username){
        this.id = id;
        this.username = username;
    }
}