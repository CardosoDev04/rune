import { User } from "../classes/user";
import { Message } from "../classes/message";
export interface DBFactory {
    login(username: string, password: string): Promise<String>
    getAllUsers(): Promise<User[]>
    getAllMessagesFromUser(id: string): Promise<Message[]>
}