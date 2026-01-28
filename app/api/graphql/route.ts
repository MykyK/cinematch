import { prisma } from "@/lib/prisma";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `
  type User { id: String! email: String! name: String }
  type Query { users: [User!]! }
`;

const resolvers = { Query: { users: () => prisma.user.findMany() } };

const server = new ApolloServer({ typeDefs, resolvers });

export const GET = async (req: Request) => startServerAndCreateNextHandler(server)(req);
export const POST = async (req: Request) => startServerAndCreateNextHandler(server)(req);
