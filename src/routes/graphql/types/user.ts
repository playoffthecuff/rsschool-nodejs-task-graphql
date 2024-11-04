import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { profile } from './profile.js';
import { post } from './post.js';

const URL = 'http://[::1]:8000/users/';

export const user = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: profile,
      async resolve(p) {
        const d = await fetch(URL + p.id + '/profile').then((r) => r.json());
        return d;
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(post))),
      async resolve(p) {
        const d = await fetch(URL + p.id + '/posts').then((r) => r.json());
        return d;
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(user))),
      async resolve(p) {
        const d = await fetch(URL + p.id + '/user-subscribed-to').then((r) => r.json());
        return d;
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(user))),
      async resolve(p) {
        const d = await fetch(URL + p.id + '/subscribed-to-user').then((r) => r.json());
        return d;
      },
    },
  }),
});
