const express = require("express");
//1
const { ApolloServer } = require("@apollo/server");
//2
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

async function startServer() {
  const app = express();

  app.use(cors());
  app.options("*", cors());
  app.use(express.json({ limit: "50kb" }));

  //3
  const server = new ApolloServer({
    //9 -> schema
    // String! -> required
    // ID -> unique
    // Query -> when user makes a request
    // getTodos: [Todo] -> user will request an array of todos

    //17
    // getUser(id: ID!): User  -> user will provide an "id" and we will return a "User"

    //21
    // user: User -> like populate in mongodb
    typeDefs: `
       type Todo{
        id: ID!
        title: String!
        completed: Boolean
        user: User
       }

       type User{
        id: ID!
        name: String!
       }

       type Query{
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
       }
    `,
    //8 -> what to do when a query is make
    resolvers: {
      //22
      // if someone tries to access "user" of "Todo" then run this method
      Todo: {
        user: (todo) => {
          //23 -> here we can fetch user based of todo.id from mongodb
          return {
            id: 1,
            name: "sachin sharma",
          };
        },
      },
      //11
      Query: {
        //12 -> if this query is made then return the data from this fn
        getTodos: () => {
          //14 -> here we will query data from database
          return [
            {
              id: 1,
              title: "sachin sharma",
              completed: false,
              user: 1,
            },
          ];
        },
        //15
        getAllUsers: () => {
          return [
            {
              id: 1,
              name: "sachin sharma",
            },
          ];
        },
        //18
        getUser: (parent, { id }) => {
          //19 -> make query => await User.findById(id)
          return {
            id: 1,
            name: "sachin sharma",
          };
        },
      },
    },
  });

  //5
  await server.start();

  //4
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("server is up and running");
  });
}

//6
startServer();

//10 -> open localhost:8000/graphql
// this interface is provided by apollo
/* query GetAllTodos{  -> make this query in that interface
  getTodos{
    title
  }
} */

//13 -> new again make the query from apollo interface

//16 -> now make this query
/* query GetData{
    getTodos{
        title
    }
    getAllUsers{
        name
    }
} */

//20 -> now make a query for getUser (provide "id" in lower window)
