export class Password {
    id: string;
    userID: string;
    label: string;
    hashed_value: string;
    constructor(id: string, userID: string,label: string, hashed_value: string) {
        this.id = id;
        this.userID = userID;
        this.label = label;
        this.hashed_value = hashed_value;
    }
}