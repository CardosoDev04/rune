import {MockDB} from "../mock/db/mockdb";
import {MockAuthenticator} from "../auth/mock/mockauth";
import {CustomError} from "../errors/http";

const db = new MockDB();
const auth = new MockAuthenticator();

export const resolvers = {
    Query: {
        async users(_:any, {}:any, context: any) {
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const isAdmin = await auth.authenticateAdmin(userToken);
            if(!isAdmin){
                throw new CustomError ("Unauthorized", 401);
            }
            return await db.getAllUsers();
        },
        async messages(_: any,{id}: any, context:any){
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const isAuth = await auth.authenticate(userToken,id);
            if(!isAuth){
                throw new CustomError ("Unauthorized", 401);
            }
            return await db.getAllMessagesFromUser(id)
        },

        async login(_: any, {name, password}: any){
            const token = await db.login(name, password);
            return {token: token};
        }
    }
}