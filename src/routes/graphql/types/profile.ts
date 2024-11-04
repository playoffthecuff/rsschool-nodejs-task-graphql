import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './member.js';

export const profile = new GraphQLObjectType({
  name: 'profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: { type: new GraphQLNonNull(MemberType), async resolve(p) {
      const d = await fetch('http://[::1]:8000/member-types/' + p.memberTypeId).then((r) => r.json());
      return d;
    }},
  },
});
