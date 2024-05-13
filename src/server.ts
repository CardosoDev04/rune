import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schema/type-defs';
import { resolvers } from './schema/resolvers';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import { BaseContext } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import bodyParser from 'body-parser';

const app = express();

// This `app` is     the returned value from `express()`.
const httpServer = createServer(app);

const schema = makeExecutableSchema(
    { typeDefs, resolvers }
);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<BaseContext>({  // Specify generic type here
    schema,
    context: ({ req, res })=> {
        return { req, res };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        }
    ],
});


(async () => {
    await server.start()
    httpServer.listen(4000, () => {
        console.log(`Query endpoint ready at http://localhost:4000/graphql`);
        console.log(`Subscription endpoint ready at ws://localhost:4000/subscriptions`);
    });
    app.use('/graphql', bodyParser.json(), expressMiddleware(server));
})();

