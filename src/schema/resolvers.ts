import {MockDB} from "../mock/db/mockdb";
import {MockAuthenticator} from "../auth/mock/mockauth";
import {CustomError} from "../errors/http";
import {PgpClient} from "../lib/client/pgp-client";

const db = new MockDB();
const auth = new MockAuthenticator();
const pgpClient = new PgpClient();

function checkIsAuth(isAuth: Boolean){
    if(!isAuth){
        throw new CustomError ("Unauthorized", 401);
    }
}

export const resolvers = {
    Query: {
        async users(_:any, {}:any, context: any) {
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const isAdmin = await auth.authenticateAdmin(userToken);
            checkIsAuth(isAdmin);
            return await db.getAllUsers();
        },
        async messages(_: any,{id}: any, context:any){
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const isAuth = await auth.authenticate(userToken,id);
            checkIsAuth(isAuth);
            return await db.getAllMessagesFromUser(id)
        },
        async sendMessage(_: any, {recipient_id, sender_id, text}: any, context: any){
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const isAuth = await auth.authenticate(userToken,sender_id);
            checkIsAuth(isAuth);
            return await db.sendMessage(recipient_id, sender_id, text);
        },

        async login(_: any, {name, password}: any){
            const token = await db.login(name, password);
            return {token: token};
        },

        async generatePassphrase(_: any, {}: any, context: any){
            return pgpClient.generatePassphrase(64)
        }
    }
}