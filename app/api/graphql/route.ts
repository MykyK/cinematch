import { prisma } from "@/lib/prisma";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    name: String
  }

  type Movie {
    id: Int!
    title: String!
    posterUrl: String
    year: Int
  }

  type Swipe {
    id: String!
    value: String!
    userId: String!
    movieId: Int!
    sessionId: String!
  }

  type Match {
    id: String!
    movieId: Int!
    sessionId: String!
  }

  type Query {
    users: [User!]!
    movies: [Movie!]!
    swipes: [Swipe!]!
    matches: [Match!]!
  }
`;

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    movies: () => prisma.movie.findMany(),
    swipes: () => prisma.swipe.findMany(),
    matches: () => prisma.match.findMany(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
