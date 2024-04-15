import {ApolloServer} from 'apollo-server';
import {typeDefs} from './schema/type-defs';
import {resolvers} from './schema/resolvers';

const server = new ApolloServer({
    typeDefs,resolvers,
    context: ({ req }) => {
        return {
            headers: req.headers
        };
    }
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
