import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express';
import { createConnection } from "typeorm"
import session from "express-session"
import connectRedis from "connect-redis"
import { redis } from './redis';
import { createSchema } from './createSchema';

const main = async () => {
    await createConnection()
    const schema = await createSchema()
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => ({ req })
    })
    const app = Express()

    const RedisStore = connectRedis(session)

    app.use(session({
        store: new RedisStore({ client: redis as any}),
        name: "series_app",
        resave: false,
        saveUninitialized: false,
        secret: "abcdededeff",
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 1800
        }
    }))
    
    apolloServer.applyMiddleware({ app })
    app.listen(5100, () => {
        console.log("Starting server on http://localhost:5100/graphql")
    })
}

main()