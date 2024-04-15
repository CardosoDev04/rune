import {Authenticator} from "../authenticator";

import {UserList} from "../../mock/data/users";
import jwt, {JwtPayload} from 'jsonwebtoken';

const secret = "secret";


export class MockAuthenticator implements Authenticator {

    register(username:string, password:string): Promise<void>{
        const user = UserList.find((user) => user.name === username);
        if(user){
            return new Promise((resolve, reject) => {
                reject("User already exists");
            });
        } else {
            const newUser = {
                id: (UserList.length + 1).toString(),
                name: username,
                publicKey: "",
                password: password
            };
            UserList.push(newUser);
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
    }

    authenticate(token: string, id: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    const payload = decoded as JwtPayload & { id: string };
                    if (payload && payload.id) {
                        resolve(payload.id === id);
                    } else {
                        reject('Invalid token');
                    }
                }
            });
        });
    }

    login(username: string, password: string): Promise<String> {
        const user = UserList.find((user) => user.name === username && user.password === password);
        if(user){
            const payload = {
                id: user.id,
                name: user.name
            };
            const token = jwt.sign(payload, secret, {expiresIn: '1h'});
            return new Promise((resolve, reject) => {
                resolve(token);
            });
        } else {
            return new Promise((resolve, reject) => {
                reject("Invalid username or password");
            });
        }
    }
}