import {gql} from 'apollo-server';

export const typeDefs = gql`

    type Token {
        token: ID!
    }

    type User {
        id: ID!
        name: String!
    }

    type PublicKey {
        id: ID!
        userID: String!
        publicKey: String!
    }

    type Message {
        id: ID!
        recipient_id: ID!
        sender_id: ID!
        text: String!
    }

    type Password {
        id: ID!
        label: String!
        hashed_value: String!
    }

    type Query {
        login(name: String!, password: String!): Token!
        users: [User!]!
        user: User!
        messages(id: ID!): [Message!]!
        publicKey(id: ID!): PublicKey!
    }

    type Subscription {
        messages(userID: ID!): [Message!]!
    }


    type Mutation {
        register(name: String!, password: String!): Token!
        sendMessage(recipient_id: ID!, sender_id: ID!, text: String!): String!
        storePublicKey( publicKey: String!): PublicKey!
        storePassword(label: String!, hashed_value: String!): Password!
    }
`
