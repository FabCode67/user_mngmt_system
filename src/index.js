"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./resolvers");
dotenv_1.default.config();
async function bootstrap() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.resolvers,
        // outChecker
    });
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: (ctx) => {
            console.log(ctx);
            return ctx;
        },
        plugins: [
            process.env.NODE_ENV === 'production' ?
                ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => {
        console.log('server started on localhost:4000');
    });
}
bootstrap();
function ApolloServerPluginLandingPageDisabled() {
    throw new Error("Function not implemented.");
}
function ApolloServerPluginLandingPageGraphQLPlayground() {
    throw new Error("Function not implemented.");
}
