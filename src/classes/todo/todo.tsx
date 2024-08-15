import { TodoCategory } from "../../components/todoItem/todoCategory";
import { TodoPriority } from "../../components/todoItem/todoPriority";
import { TodoState } from "../../components/todoItem/todoState";

export default class Todo {
    private readonly title: string;
    private readonly category: TodoCategory;
    private readonly priority: TodoPriority;
    private readonly progress: number;
    private readonly startDate: Date;
    private readonly goalDate: Date;

    public constructor(title: string = "", category: TodoCategory, priority: TodoPriority, goalDate: Date, startDate?: Date, progress?: number) {
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.progress = (progress ? progress : 0);
        this.startDate = (startDate ? startDate : new Date());
        this.goalDate = goalDate;
    }

    public getTitle(): string {
        return this.title;
    }

    public getCategory(): TodoCategory {
        return this.category;
    }

    public getPriority(): TodoPriority {
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

    public getState(): TodoState {
        return this.progress > 0 ? this.progress >= 100 ? TodoState.Completed : TodoState.InProgress : TodoState.NotStarted;
    }
}