export class User {
    id: string;
    name: string;
    password: string;
    constructor(id: string, name: string, publicKey: string, password: string) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}