export class PublicKey {
    id: string;
    userID: string;
    publicKey: string;
    constructor(id: string, userID: string, publicKey: string) {
        this.id = id;
        this.userID = userID;
        this.publicKey = publicKey;
    }
}