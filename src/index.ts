import { port } from "../config/environment";
import graphqlServer from "./graphql";
import app from "./app";
import connectDB from "../db";

const start = async () => {
  try {
    console.log("Connecting to database");
    await connectDB();
    console.log("Connected to database");
    await graphqlServer.start();
    graphqlServer.applyMiddleware({ app });
    await app.listen(port);
    console.log(
      `🚀  GraphQL server running at port: ${port} at ${graphqlServer.graphqlPath}`
    );
  } catch {
    console.log("Not able to run GraphQL server");
  }
};

start();
