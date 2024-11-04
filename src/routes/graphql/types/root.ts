import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './member.js';
import { post } from './post.js';
import { user } from './user.js';
import { profile } from './profile.js';
import { UUIDType } from './uuid.js';

const URL = 'http://[::1]:8000/';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeId } },
      async resolve(_, { id }) {
        const d = await fetch(URL + 'member-types/' + id).then((r) => r.json());
        return d;
      },
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      async resolve() {
        const d = await fetch(URL + 'member-types').then((r) => r.json());
        return d;
      },
    },
    post: {
      type: post,
      args: { id: { type: UUIDType } },
      async resolve(_, { id }) {
        const d = await fetch(URL + 'posts/' + id).then((r) => r.json());
        return d;
      },
    },
    posts: {
      type: new GraphQLList(post),
      async resolve() {
        const d = await fetch(URL + 'posts').then((r) => r.json());
        return d;
      },
    },
    user: {
      type: user,
      args: { id: { type: UUIDType } },
      async resolve(_, { id }) {
        const d = await fetch(URL + 'users/' + id).then((r) => r.json());
        return d;
      },
    },
    users: {
      type: new GraphQLList(user),
      async resolve() {
        const d = await fetch(URL + 'users').then((r) => r.json());
        return d;
      },
    },
    profile: {
      type: profile,
      args: { id: { type: UUIDType } },
      async resolve(_, { id }) {
        const d = await fetch(URL + 'profiles/' + id).then((r) => r.json());
        return d;
      },
    },
    profiles: {
      type: new GraphQLList(profile),
      async resolve() {
        const d = await fetch(URL + 'profiles').then((r) => r.json());
        return d;
      },
    },
  },
});
