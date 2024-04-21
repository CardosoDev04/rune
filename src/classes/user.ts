export class User {
    id: string;
    name: string;
    constructor(id: string, name: string, publicKey: string) {
        this.id = id;
        this.name = name;
    }
}