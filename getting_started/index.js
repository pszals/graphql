"use strict";

let graphql = require('graphql');
let graphqlHTTP = require('express-graphql');
let express = require('express');

const data = require('./data.json');

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQl server running on localhost:3000/graphql');
// http://localhost:3000/graphql?query={user(id:%221%22){name}}
// ==>
// {
//   data: {
//     user: {
//      name: "Dan"
//     }
//   }
// }
