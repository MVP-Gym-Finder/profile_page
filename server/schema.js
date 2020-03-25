const db = require('../database/index.js').sequelize;
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');

const Profile = new GraphQLObjectType({
  name: 'Profile',
  description: 'This represents a Profile', 
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(profile) {
          return profile.id;
        }
      },
      username: {
        type: GraphQLString,
        resolve(profile) {
          return profile.username;
        }
      },
      first_name: {
        type: GraphQLString,
        resolve(profile) {
          return profile.first_name;
        }
      },
      last_name: {
        type: GraphQLString,
        resolve(profile) {
          return profile.last_name;
        }
      },
      height: {
        type: GraphQLString,
        resolve(profile) {
          return profile.height;
        }
      },
      weight: {
        type: GraphQLString,
        resolve(profile) {
          return profile.weight;
        }
      },
      age: {
        type: GraphQLInt,
        resolve(profile) {
          return profile.age;
        }
      },
      gender: {
        type: GraphQLString,
        resolve(profile) {
          return profile.gender;
        }
      },
      dob: {
        type: GraphQLString,
        resolve(profile) {
          return profile.dob;
        }
      },
      zip: {
        type: GraphQLInt,
        resolve(profile) {
          return profile.zip;
        }
      },
      current_w: {
        type: GraphQLString,
        resolve(profile) {
          return profile.current_w;
        }
      },
      goal_w: {
        type: GraphQLString,
        resolve(profile) {
          return profile.goal_w;
        }
      },
      weekly_goal: {
        type: GraphQLString,
        resolve(profile) {
          return profile.weekly_goal;
        }
      },
      activity_lvl: {
        type: GraphQLString,
        resolve(profile) {
          return profile.activity_lvl;
        }
      },
      workouts_per_wk: {
        type: GraphQLInt,
        resolve(profile) {
          return profile.workouts_per_wk;
        }
      },
      min_per_workout: {
        type: GraphQLInt,
        resolve(profile) {
          return profile.min_per_workout;
        }
      },
      image: {
        type: GraphQLString,
        resolve(profile) {
          return profile.image;
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      profiles: {
        type: new GraphQLList(Profile),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve(root, args) {
          return db.models.Info.findAll({where: args});
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to update profile',
  fields() {
    return {
      updateProfile: {
        type: Profile,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          height: {
            type: GraphQLString
          },
          weight: {
            type: GraphQLString
          },
          age: {
            type: GraphQLInt
          },
          gender: {
            type: GraphQLString
          },
          dob: {
            type: GraphQLString
          },
          zip: {
            type: GraphQLInt
          },
          goal_w: {
            type: GraphQLString
          },
          weekly_goal: {
            type: GraphQLString
          },
          activity_lvl: {
            type: GraphQLString
          },
          workouts_per_wk: {
            type: GraphQLInt
          },
          min_per_workout: {
            type: GraphQLInt
          }
        },
        resolve(_, args) {
          return db.models.Info.update(args, {where: {id: args.id}});
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;

