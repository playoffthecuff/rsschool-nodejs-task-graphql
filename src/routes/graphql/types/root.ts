import { GraphQLList, GraphQLObjectType } from "graphql";
import { member } from "./member.js";

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
  }
})