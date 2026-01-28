import { prisma } from "@/lib/prisma";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

// GraphQL схема
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

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// В Next.js App Router потрібно робити async функції GET/POST
export const GET = async (request: Request) => {
  return startServerAndCreateNextHandler(server)(request);
};

export const POST = async (request: Request) => {
  return startServerAndCreateNextHandler(server)(request);
};
