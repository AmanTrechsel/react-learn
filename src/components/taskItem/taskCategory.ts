export enum TaskCategory{
    Design,
    Code,
    Test,
    Implement,
    Refactor
}

export function parseTaskCategory(category: string): TaskCategory {
    switch (category) {
        case "DESIGN":
            return TaskCategory.Design;
        case "CODE":
            return TaskCategory.Code;
        case "TEST":
            return TaskCategory.Test;
        case "IMPLEMENT":
            return TaskCategory.Implement;
        case "REFACTOR":
            return TaskCategory.Refactor;
        default:
            return TaskCategory.Design;
    }
}

export function categorify(category: TaskCategory): string {
    switch (category) {
        case TaskCategory.Design:
            return "DESIGN";
        case TaskCategory.Code:
            return "CODE";
        case TaskCategory.Test:
            return "TEST";
        case TaskCategory.Implement:
            return "IMPLEMENT";
        case TaskCategory.Refactor:
            return "REFACTOR";
        default:
            return "DESIGN";
    }
}