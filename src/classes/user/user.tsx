export default class User {
    private readonly firstname: string;
    private readonly lastname: string;
    private readonly email: string;
    private readonly password: string;
    private readonly picture: string;
    private readonly tasks: number[];

    public constructor(firstname: string, lastname: string, email: string, password: string, picture?: string, tasks?: number[]) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email.toLowerCase();
        this.password = password;
        this.picture = picture ? picture : "default";
        this.tasks = tasks ? tasks : [];
    }

    public getFirstName(): string {
        return this.firstname;
    }

    public getLastName(): string {
        return this.lastname;
    }

    public getFullName(): string {
        return this.firstname + " " + this.lastname;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getPicture(): string {
        return this.picture;
    }

    public getTasks(): number[] {
        return this.tasks;
    }

    public hasTask(taskId: number): boolean {
        return this.tasks.indexOf(taskId) != -1;
    }

    public appendTask(taskId: number) {
        this.tasks.push(taskId);
    }

    public removeTask(taskId: number) {
        var index = this.tasks.indexOf(taskId);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }

    public validateLogin(email: string, password: string): boolean {
        return (email.toLowerCase() === this.email) && (password === this.password);
    }
}