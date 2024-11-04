import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { MemberType, MemberTypeId } from './member.js';
import { post } from './post.js';
import { user } from './user.js';
import { profile } from './profile.js';
import { UUIDType } from './uuid.js';
import {
  ChangePost,
  ChangeProfile,
  ChangeUser,
  CreatePost,
  CreateProfile,
  CreateUser,
} from './inputs.js';

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

export const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(user),
      args: {
        dto: { type: new GraphQLNonNull(CreateUser) },
      },
      async resolve(_, { dto }) {
        const d = await fetch(URL + 'users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dto),
        }).then((r) => r.json());
        return d;
      },
    },
    createProfile: {
      type: new GraphQLNonNull(profile),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfile) },
      },
      async resolve(_, { dto }) {
        const d = await fetch(URL + 'profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dto),
        }).then((r) => r.json());
        return d;
      },
    },
    createPost: {
      type: new GraphQLNonNull(post),
      args: { dto: { type: new GraphQLNonNull(CreatePost) } },
      async resolve(_, { dto }) {
        const d = await fetch(URL + 'posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dto),
        }).then((r) => r.json());
        return d;
      },
    },
    changePost: {
      type: new GraphQLNonNull(post),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePost) },
      },
      async resolve(_, { id, dto }) {
        const d = await fetch(URL + 'posts/' + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dto),
        }).then((r) => r.json());
        return d;
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(profile),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfile) },
      },
      async resolve(_, { id, dto }) {
        const d = await fetch(URL + 'profiles/' + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dto),
        }).then((r) => r.json());
        return d;
      },
    },
    changeUser: {
      type: new GraphQLNonNull(user),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUser) },
      },
      async resolve(_, { id, dto }) {
        const d = await fetch(URL + 'users/' + id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dto),
        }).then((r) => r.json());
        return d;
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      async resolve(_, { id }) {
        const r = await fetch(URL + 'users/' + id, {
          method: 'DELETE',
        });
        return r.status === 204 ? 'ok' : '!ok';
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      async resolve(_, { id }) {
        const r = await fetch(URL + 'posts/' + id, {
          method: 'DELETE',
        });
        return r.status === 204 ? 'ok' : '!ok';
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      async resolve(_, { id }) {
        const r = await fetch(URL + 'profiles/' + id, {
          method: 'DELETE',
        });
        return r.status === 204 ? 'ok' : '!ok';
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      async resolve(_, { userId, authorId }) {
        const r = await fetch(URL + 'users/' + userId + '/user-subscribed-to', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authorId }),
        });
        return r.status === 204 ? 'ok' : '!ok';
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      async resolve(_, { userId, authorId }) {
        const r = await fetch(
          URL + 'users/' + userId + '/user-subscribed-to/' + authorId,
          {
            method: 'DELETE',
          },
        );
        return r.status === 204 ? 'ok' : '!ok';
      },
    },
  },
});
