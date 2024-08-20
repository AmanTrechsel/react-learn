export enum TaskPriority{
    Low,
    Medium,
    High,
    Top
}

export function parseTaskPriority(priority: string): TaskPriority {
    switch (priority) {
        case "LOW":
            return TaskPriority.Low;
        case "MEDIUM":
            return TaskPriority.Medium;
        case "HIGH":
            return TaskPriority.High;
        case "TOP":
            return TaskPriority.Top;
        default:
            return TaskPriority.Medium;
    }
}

export function prioritify(priority: TaskPriority): string {
    switch (priority) {
        case TaskPriority.Low:
            return "LOW";
        case TaskPriority.Medium:
            return "MEDIUM";
        case TaskPriority.High:
            return "HIGH";
        case TaskPriority.Top:
            return "TOP";
        default:
            return "MEDIUM";
    }
}