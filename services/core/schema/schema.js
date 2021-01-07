const { find } = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql')

// dummy data
var books = [
  { id: '1', genre: 'Fantasy', name: 'Name of the Wind' },
  { id: '2', genre: 'Fantasy', name: 'The Final Empire' },
  { id: '3', genre: 'Sci-fi', name: 'The Long Earth' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        return find(books, { id: args.id })
      }
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
