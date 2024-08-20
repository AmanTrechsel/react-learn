export default class User {
    private readonly id: number;
    private readonly firstname: string;
    private readonly lastname: string;
    private readonly email: string;
    private readonly password: string;
    private readonly picture: string;

    public constructor(id: number, firstname: string, lastname: string, email: string, password: string, picture?: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email.toLowerCase();
        this.password = password;
        this.picture = picture ? picture : "default";
    }

    public getId(): number {
        return this.id;
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

    public validateLogin(email: string, password: string): boolean {
        return (email.toLowerCase() === this.email) && (password === this.password);
    }
}