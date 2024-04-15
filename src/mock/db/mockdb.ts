import {DBFactory} from "../../db/dbfactory";
import {User} from "../../classes/user";
import {Message} from "../../classes/message";
import {UserList} from "../data/users";
import {Messages} from "../data/messages";

export class MockDB implements DBFactory {

    login(username: string, password: string): Promise<String> {
        //TODO: Implement this
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
}