import {DBFactory} from "../../db/dbfactory";
import {User} from "../../classes/user";
import {Message} from "../../classes/message";
import {UserList} from "../data/users";
import {Messages} from "../data/messages";
import {PublicKeys} from "../data/publicKeys";
import {Passwords} from "../data/passwords";

import {MockAuthenticator} from "../../auth/mock/mockauth";
import {PublicKey} from "../../classes/publicKey";
import {Password} from "../../classes/password";

const auth = new MockAuthenticator();

export class MockDB implements DBFactory {

    login(username: string, password: string): Promise<String> {
        return auth.login(username, password)
    }

    getAllUsers(): Promise<User[]> {
        return new Promise((resolve) => {
            resolve(UserList);
        });
    }

    getAllMessagesFromUser(id: string): Promise<Message[]> {
        const messages = Messages.filter((message) => message.recipient_id === id);
        return new Promise((resolve, reject) => {
            if(!messages) reject("No messages found");
            resolve(messages);
        });
    }

    sendMessage(recipient_id: string, sender_id: string, text: string): Promise<String> {
        Messages.push({id: String(Messages.length + 1), recipient_id: recipient_id, sender_id: sender_id, text: text});
        return new Promise((resolve,reject) => {
            if(!recipient_id) reject("No recipient ID provided");
            resolve("Message sent from " + sender_id + " to " + recipient_id);
        });
    }

    storePublicKey(userID: string, publicKey: string): Promise<PublicKey> {
        return new Promise((resolve, reject) => {
            const obj = {id: String(PublicKeys.length + 1), userID: userID, publicKey: publicKey}
            try {
                if (!publicKey) throw new Error("No public key provided");
                if (!userID) throw new Error("No user ID provided");
                if (PublicKeys.find((key) => key.userID === userID)) throw new Error("Public key already exists");
                PublicKeys.push(obj);
                resolve(obj);
            } catch (e) {
                reject(e);
            }
        });
    }

    getPublicKey(id: string): Promise<PublicKey> {
        return new Promise((resolve, reject) => {
                try {
                    if (!id) throw new Error("No id provided");
                    const key = PublicKeys.find((key) => key.userID === id);
                    if (!key) throw new Error("No public key found");
                    resolve(key);
                } catch (e) {
                    reject(e);
                }
            }
        );
    }

    storePassword(userID: string, label: string, hashed_value: string): Promise<Password> {
        return new Promise((resolve, reject) => {
            try {
                if (!userID) throw new Error("No user ID provided");
                if (!label) throw new Error("No label provided");
                if (!hashed_value) throw new Error("No hashed value provided");
                const password: Password = {id: String(Passwords.length + 1), userID: userID, label: label, hashed_value: hashed_value}
                Passwords.push(password);
                resolve(password);
            } catch (e) {
                reject(e);
            }
        });
    }
}