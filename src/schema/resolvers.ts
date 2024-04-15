
import {MockDB} from "../mock/db/mockdb";

const db = new MockDB();

export const resolvers = {
    Query: {
        async users() {
            return await db.getAllUsers();
        },
        async messages(_: any,{id}: any){
            return await db.getAllMessagesFromUser(id)
        }
    }
}