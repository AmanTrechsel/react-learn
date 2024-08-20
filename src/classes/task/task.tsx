import { TaskCategory } from "../../components/taskItem/taskCategory";
import { TaskPriority } from "../../components/taskItem/taskPriority";
import { TaskState } from "../../components/taskItem/taskState";

export default class Task {
    private readonly id: number;
    private readonly title: string;
    private readonly category: TaskCategory;
    private readonly priority: TaskPriority;
    private readonly progress: number;
    private readonly startDate: Date;
    private readonly goalDate: Date;
    private readonly users: number[]

    public constructor(id: number, title: string = "", category: TaskCategory, priority: TaskPriority, goalDate: Date, startDate?: Date, progress?: number, users?: number[]) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.progress = (progress ? progress : 0);
        this.startDate = (startDate ? startDate : new Date());
        this.goalDate = goalDate;
        this.users = (users ? users : []);
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getCategory(): TaskCategory {
        return this.category;
    }

    public getPriority(): TaskPriority {
        return this.priority;
    }

    public getProgress(): number {
        return this.progress;
    }

    public getStartDate(): Date {
        return this.startDate;
    }
    
    public getGoalDate(): Date {
        return this.goalDate;
    }

    public getUsers(): number[] {
        return this.users;
    }

    public getState(): TaskState {
        return this.progress > 0 ? this.progress >= 100 ? TaskState.Completed : TaskState.InProgress : TaskState.NotStarted;
    }

    public hasUser(userId: number): boolean {
        return this.users.indexOf(userId) != -1;
    }

    public appendUser(userId: number) {
        this.users.push(userId);
    }

    public removeUser(userId: number) {
        var index = this.users.indexOf(userId);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }
}