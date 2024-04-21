import {DBFactory} from "../../db/dbfactory";
import {User} from "../../classes/user";
import {Message} from "../../classes/message";
import {UserList} from "../data/users";
import {Messages} from "../data/messages";

import {MockAuthenticator} from "../../auth/mock/mockauth";

const auth = new MockAuthenticator();

export class MockDB implements DBFactory {

    login(username: string, password: string): Promise<String> {
        return auth.login(username, password)
    }
    getAllUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            resolve(UserList);
        });
    }
    getAllMessagesFromUser(id: string): Promise<Message[]> {
        const messages = Messages.filter((message) => message.recipient_id === id);
        return new Promise((resolve, reject) => {
            resolve(messages);
        });
    }
    sendMessage(recipient_id: string, sender_id: string, text: string): Promise<String> {
        Messages.push({id: String(Messages.length+1), recipient_id: recipient_id, sender_id: sender_id, text: text});
        return new Promise((resolve, reject) => {
            resolve("Message sent from " + sender_id + " to " + recipient_id );
        });
    }
}