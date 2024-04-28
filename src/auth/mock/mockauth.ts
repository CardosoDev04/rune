import {Authenticator} from "../authenticator";
import {hash,compare} from 'bcrypt';
import {UserList} from "../../mock/data/users";
import {AdminList} from "../../mock/data/admins";
import jwt, {JwtPayload} from 'jsonwebtoken';
import {specialCharacters} from "../../character-sets/password";

const secret = "wt6uAs5uXhpJcRjoxVBouhs6b9Pdq7o93IrYlgcQqMJd9j0Pu38Noa06xoXyhR67";


export class MockAuthenticator implements Authenticator {



    authenticate(token: string, id: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    const payload = decoded as JwtPayload & { id: string };
                    if (payload && payload.id) {
                        console.log(payload.id)
                        resolve(payload.id === id);
                    } else {
                        reject('Invalid token');
                    }
                }
            });
        });
    }

    authenticateAdmin(token: string): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    const payload = decoded as JwtPayload & { id: string };
                    if (payload && payload.id) {
                        resolve(AdminList.some((admin) => admin.id === payload.id));
                    } else {
                        reject('Invalid token');
                    }
                }
            });
        });
    }

    async login(username: string, password: string): Promise<String> {
        const isPasswordCorrect = await compare(password, UserList.find((user) => user.name === username)?.password || '');
        const user = UserList.find((user) => user.name === username);
        if (user && isPasswordCorrect) {
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

    async register(username: string, password: string): Promise<Object> {

        if(!username || !password){
            return new Promise((resolve, reject) => {
                reject("Invalid username or password");
            });
        } else{
            const characterRegex = new RegExp(`[${specialCharacters}]`);
            const numberRegex = new RegExp(`[0-9]`);
            if(password.length <8 ||  !characterRegex.test(password) || !numberRegex.test(password)){
                return new Promise(( resolve, reject) => {
                    reject("Password must be at least 8 characters long and contain at least one number and one special character");
                });
            }
            const user = UserList.find((user) => user.name === username);
            if (user) {
                return new Promise((resolve, reject) => {
                    reject("User already exists");
                });
            } else {
                const hashedPassword = await hash(password, 13);
                const newUser = {
                    id: (UserList.length + 1).toString(),
                    name: username,
                    password: hashedPassword
                };
                console.log(newUser.password)
                UserList.push(newUser);
                const token = await this.login(username, password);
                return new Promise((resolve, reject) => {
                    resolve({
                        token: token
                    });
                });
            }
        }
    }

    getIDFromToken(token: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    const payload = decoded as JwtPayload & { id: string };
                    if (payload && payload.id) {
                        resolve(payload.id);
                    } else {
                        reject('Invalid token');
                    }
                }
            });
        });
    }
}