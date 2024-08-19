import User from "../user/user";
import Task from "../task/task";

export default class Updater {
    private users: User[];
    private tasks: Task[];

    public constructor(defaultUsers?: User[], defaultTasks?: Task[]) {
        this.users = defaultUsers ? defaultUsers : [];
        this.tasks = defaultTasks ? defaultTasks : [];
    }

    public getUsers(): User[] {
        return this.users;
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    public setUsers(caller: Updater = this, newUsers: any) {
        caller.users = newUsers;
    }

    public setTasks(caller: Updater = this, newTasks: any) {
        caller.tasks = newTasks;
    }

    public getDatabaseUsers(): User[] {
        return [];
    }

    public updateUsers() {
        //setUsers(this.getDatabaseUsers());
    }

    public updateTasks() {
        
    }

    public updateUser(caller: Updater = this, oldUser: User, newUser: User): boolean {
        if (caller.updateAmbiguous(caller, oldUser, newUser, caller.users, caller.setUsers)) {
            caller.updateUsers();
            return true;
        }
        return false;
    }

    public appendUser(caller: Updater = this, userToAdd: User) {
        caller.appendAmbiguous(caller, userToAdd, caller.users, caller.setUsers);
        caller.updateUsers();
    }

    public removeUser(caller: Updater = this, userToRemove: User): boolean {
        if (caller.removeAmbiguous(caller, userToRemove, caller.users, caller.setUsers)) {
            caller.updateUsers();
            return true;
        }
        return false;
    }

    public updateTask(caller: Updater = this, oldTask: Task, newTask: Task): boolean {
        if (caller.updateAmbiguous(caller, oldTask, newTask, caller.tasks, caller.setTasks)) {
            caller.updateTasks();
            return true;
        }
        return false;
    }

    public appendTask(caller: Updater = this, taskToAdd: Task) {
        caller.appendAmbiguous(caller, taskToAdd, caller.tasks, caller.setTasks);
        caller.updateTasks();
    }

    public removeTask(caller: Updater = this, taskToRemove: Task): boolean {
        if (caller.removeAmbiguous(caller, taskToRemove, caller.tasks, caller.setTasks)) {
            caller.updateTasks();
            return true;
        }
        return false;
    }

    public updateAmbiguous(caller: Updater, oldValue: any, newValue: any, collection: any, setter: (updater: Updater, updatedCollection: any) => void): boolean {
        let newCollection = collection;
        let indexToUpdate = collection.indexOf(oldValue);
        if (indexToUpdate <= -1) {
            return false;
        }
        newCollection[indexToUpdate] = newValue;
        setter(caller, newCollection);
        return true;
    }

    public appendAmbiguous(caller: Updater, toAdd: any, collection: any, setter: (updater: Updater, updatedCollection: any) => void) {
        let newCollection = collection;
        newCollection.push(toAdd);
        setter(caller, newCollection);
    }

    public removeAmbiguous(caller: Updater, toRemove: any, collection: any, setter: (updater: Updater, updatedCollection: any) => void): boolean {
        let newCollection = collection;
        let indexToRemove = collection.indexOf(toRemove);
        if (indexToRemove <= -1) {
            return false;
        }
        newCollection.splice(indexToRemove, 1);
        setter(caller, newCollection);
        return true;
    }
}