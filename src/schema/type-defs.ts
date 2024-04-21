import {gql} from 'apollo-server';

export const typeDefs = gql`

    type Token {
        token: ID!
    }
    
type User {
    id: ID!
    name: String!
    publicKey: String
}

type PGPKeyPair {
    privateKey: String!
    publicKey: String!
    passphrase: String!
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
    sendMessage(recipient_id: ID!, sender_id: ID!, text: String!): String!
    passwords: [Password!]!
    generatePassphrase: String!
}
`
