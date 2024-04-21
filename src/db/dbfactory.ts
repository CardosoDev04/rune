import { User } from "../classes/user";
import { Message } from "../classes/message";
import {PublicKey} from "../classes/publicKey";
export interface DBFactory {
    login(username: string, password: string): Promise<String>
    getAllUsers(): Promise<User[]>
    getAllMessagesFromUser(id: string): Promise<Message[]>
    sendMessage(recipient_id: string, sender_id: string, text: string): Promise<String>
    storePublicKey(userID: string, publicKey: string): Promise<PublicKey>
}