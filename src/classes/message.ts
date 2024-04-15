
export class Message {
    id: string;
    recipient_id: string;
    sender_id: string;
    text: string;
    constructor(id: string, recipient_id: string, sender_id: string, text: string) {
        this.id = id;
        this.recipient_id = recipient_id;
        this.sender_id = sender_id;
        this.text = text;
    }
}