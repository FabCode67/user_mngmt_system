import dotenv from "dotenv"
import 'reflect-metadata'
import express from 'express'
import { buildSchema } from "type-graphql"
import cookieParser from "cookie-parser"
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from "./resolvers"
dotenv.config()

async function bootstrap() {
    const schema = await buildSchema({
        resolvers,
        // outChecker
    })
    const app = express()
    app.use(cookieParser())

    const server = new ApolloServer({
        schema,
        context: (ctx) =>{
            console.log(ctx);
        return ctx    
        },
        plugins: [
            process.env.NODE_ENV === 'production' ? 
              ApolloServerPluginLandingPageDisabled() 
            : ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    })
    await server.start()
    server.applyMiddleware({ app });
    app.listen({port: 4000}, () => {
        console.log('server started on localhost:4000')
    }
    );
        
} 

bootstrap()

function ApolloServerPluginLandingPageDisabled(): import("apollo-server-core").PluginDefinition {
    throw new Error("Function not implemented.")
}
function ApolloServerPluginLandingPageGraphQLPlayground(): import("apollo-server-core").PluginDefinition {
    throw new Error("Function not implemented.")
}

