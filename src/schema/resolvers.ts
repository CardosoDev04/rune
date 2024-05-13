import {MockDB} from "../mock/db/mockdb";
import {MockAuthenticator} from "../auth/mock/mockauth";
import {CustomError} from "../errors/http";
import {PgpClient} from "../lib/client/pgp-client";
import {PubSub} from "graphql-subscriptions"

const db = new MockDB();
const auth = new MockAuthenticator();
const pgpClient = new PgpClient();


export const pubsub = new PubSub();

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

        async login(_: any, {name, password}: any){
            const token = await db.login(name, password);
            return {token: token};
        },
        async publicKey(_: any, {id}: any){
            return await db.getPublicKey(id)
        },
        async user(_: any, {}: any, context:any){
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            console.log("User query token: " + userToken);
            const id = await auth.getIDFromToken(userToken);
            return await db.getUser(id);
        }
    },
    Mutation: {
        async sendMessage(_: any, {recipient_id, sender_id, text}: any, context: any){
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const isAuth = await auth.authenticate(userToken,sender_id);
            checkIsAuth(isAuth);
            await pubsub.publish("messages", {userID: recipient_id});
            return await db.sendMessage(recipient_id, sender_id, text);
        },
        async storePublicKey(_: any, {publicKey}: any,context:any){
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const id = await auth.getIDFromToken(userToken);
            return await db.storePublicKey(id, publicKey);
        },
        async register(_: any, {name, password}: any){
            return await auth.register(name, password);
        },
        async storePassword(_: any, {label, hashed_value}: any, context: any){
            const bearerToken = context.headers.authorization;
            const userToken = bearerToken.split(" ")[1];
            const id = await auth.getIDFromToken(userToken);
            return await db.storePassword(id, label, hashed_value);
        }
    },
    Subscription: {
        messages: {
            subscribe: (_: any, {userID}: any, context: any) => {
                return pubsub.asyncIterator('messages');
            }
        }
    }
}