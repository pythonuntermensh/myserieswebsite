const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const mongoose = require('mongoose')
const { createComplexityLimitRule } = require('graphql-validation-complexity');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const { main } = require("./voidboost");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

const connection = db.connect(DB_HOST, {
    autoIndex: false,
    useNewUrlParser: true,
});

//app.use(helmet());
app.use(cors());

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    //validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        return { models };
    },
    introspection: true,
    playground: true,
});


const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app, path: '/api'});
};

startServer()

app.listen({ port }, () => 
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);

main(models, () => console.log("Voidboost API checker running"));
