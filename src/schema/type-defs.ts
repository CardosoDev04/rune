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
    label: String!
    hashed_value: String!
}

type Query {
    login(name: String!, password: String!): Token!
    users: [User!]!
    messages(id: ID!): [Message!]!
    passwords: [Password!]!
}
    
    type Mutation {
        register(name: String!, password: String!): User!
        sendMessage(recipient_id: ID!, sender_id: ID!, text: String!): String!
        storePublicKey( publicKey: String!): PublicKey!
    }
`
