import User from "../user/user";
import Task from "../task/task";

import { getUsers, getTasks, insertUser, updateUser, removeUser, insertTask, updateTask, removeTask } from "../../utils/queries";
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject, useQuery } from "@apollo/client";
import { categorify, parseTaskCategory, TaskCategory } from "../../components/taskItem/taskCategory";
import { parseTaskPriority, prioritify, TaskPriority } from "../../components/taskItem/taskPriority";

const cache = new InMemoryCache();

export default class Updater {
    private static apolloClient: ApolloClient<NormalizedCacheObject> | undefined
    private users: User[];
    private tasks: Task[];

    public static initializeApolloClient() {
        if (Updater.apolloClient === undefined) {
            const client = new ApolloClient({
                cache: cache,
                uri: "http://localhost:4000/",
                defaultOptions: { query: { fetchPolicy: 'no-cache' } },
            });
            Updater.apolloClient = client;
        }
    }

    public static async fetch(query: any) { 
        Updater.initializeApolloClient();
        return await Updater.apolloClient!.query({
            query: query,
            fetchPolicy: 'no-cache',
        });
    }

    public static async mutate(query: any, variables: any) {
        Updater.initializeApolloClient();
        return await Updater.apolloClient!.mutate({
            mutation: query,
            variables: variables,
            fetchPolicy: 'no-cache',
        });
    }

    public constructor() {
        this.users = [];
        this.tasks = [];

        Updater.initializeApolloClient();

        this.updateUsers();
        this.updateTasks();
    }

    public getUsers(caller: Updater = this): User[] {
        return caller.users;
    }

    public getTasks(caller: Updater = this): Task[] {
        return caller.tasks;
    }

    public setUsers(caller: Updater = this, newUsers: any) {
        caller.users = newUsers;
    }

    public setTasks(caller: Updater = this, newTasks: any) {
        caller.tasks = newTasks;
    }

    public async updateUsers() {
        const fetchedUsers = await Updater.fetch(getUsers);
        let newUsers: User[] = [];
        fetchedUsers.data.users.forEach((user: { id: number, firstname: string; lastname: string; email: string; password: string; picture: string | undefined; }) => {
            newUsers.push(new User(user.id, user.firstname, user.lastname, user.email, user.password, user.picture));
        });
        this.setUsers(this, newUsers);
    }

    public async updateTasks() {
        const fetchedTasks = await Updater.fetch(getTasks);
        let newTasks: Task[] = [];
        fetchedTasks.data.tasks.forEach((task: { id: number; title: string; category: string; priority: string; goalDate: number; startDate: number; progress: number; users: number[] }) => {
            let goalDate = new Date(task.goalDate * 1000);
            let startDate = new Date(task.startDate * 1000);
            let category = parseTaskCategory(task.category);
            let priority = parseTaskPriority(task.priority);
            newTasks.push(new Task(task.id, task.title, category, priority, goalDate, startDate, task.progress, task.users));
        });
        this.setTasks(this, newTasks);
    }

    public async updateUser(caller: Updater = this, userId: number, newUser: User): Promise<Updater> {
        await Updater.mutate(updateUser, {
            id: userId,
            firstname: newUser.getFirstName(),
            lastname: newUser.getLastName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            picture: newUser.getPicture()
        });
        await caller.updateUsers();
        return caller;
    }

    public async appendUser(caller: Updater = this, userToAdd: User): Promise<Updater> {
        await Updater.mutate(insertUser, {
            id: userToAdd.getId(),
            firstname: userToAdd.getFirstName(),
            lastname: userToAdd.getLastName(),
            email: userToAdd.getEmail(),
            password: userToAdd.getPassword(),
            picture: userToAdd.getPicture()
        });
        await caller.updateUsers();
        return caller;
    }

    public async removeUser(caller: Updater = this, removeId: number): Promise<Updater> {
        await Updater.mutate(removeUser, { id: removeId });
        await caller.updateUsers();
        return caller;
    }

    public async updateTask(caller: Updater = this, taskId: number, newTask: Task): Promise<Updater> {
        await Updater.mutate(updateTask, {
            id: taskId,
            title: newTask.getTitle(),
            category: categorify(newTask.getCategory()),
            priority: prioritify(newTask.getPriority()),
            progress: newTask.getProgress(),
            startDate: Math.round(newTask.getStartDate().getTime() / 1000),
            goalDate: Math.round(newTask.getGoalDate().getTime() / 1000),
            users: newTask.getUsers()
        });
        await caller.updateTasks();
        return caller;
    }

    public async appendTask(caller: Updater = this, taskToAdd: Task): Promise<Updater> {
        await Updater.mutate(insertTask, {
            id: taskToAdd.getId(),
            title: taskToAdd.getTitle(),
            category: categorify(taskToAdd.getCategory()),
            priority: prioritify(taskToAdd.getPriority()),
            progress: taskToAdd.getProgress(),
            startDate: Math.round(taskToAdd.getStartDate().getTime() / 1000),
            goalDate: Math.round(taskToAdd.getGoalDate().getTime() / 1000),
            users: taskToAdd.getUsers()
        });
        await caller.updateTasks();
        return caller;
    }

    public async removeTask(caller: Updater = this, removeId: number): Promise<Updater> {
        await Updater.mutate(removeTask, { id: removeId });
        await caller.updateTasks();
        return caller;
    }
}