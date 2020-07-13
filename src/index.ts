import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express';
import {buildSchema} from 'type-graphql'
import { createConnection } from "typeorm"
import RegisterResolver, {} from "./modules/user/Register"

const main = async () => {
    await createConnection()
    const schema = await buildSchema({
        resolvers: [RegisterResolver]
    })
    const apolloServer = new ApolloServer({schema})
    const app = Express()
    
    apolloServer.applyMiddleware({ app })
    app.listen(5100, () => {
        console.log("Starting server on http://localhost:5100/graphql")
    })
}

main()