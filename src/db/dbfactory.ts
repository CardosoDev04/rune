import { User } from "../classes/user";
import { Message } from "../classes/message";
import {PublicKey} from "../classes/publicKey";
import {Password} from "../classes/password";

export interface DBFactory {
    login(username: string, password: string): Promise<String>
    getAllUsers(): Promise<User[]>
    getUser(id: string): Promise<User>
    getAllMessagesFromUser(id: string): Promise<Message[]>
    sendMessage(recipient_id: string, sender_id: string, text: string): Promise<String>
    storePublicKey(userID: string, publicKey: string): Promise<PublicKey>
    getPublicKey(id: string): Promise<PublicKey>
    storePassword(userID: string, label: string, hashed_value: string): Promise<Password>
}