require('babel-polyfill')
const {
  getAllNotes,
  getNotesByAuthor,
  getNoteById,
} = require('./models/note.model')
require('dotenv').config()

const buildResponse = (
  data,
  params = {},
  { status, statusCode } = { status: 'ns-200', statusCode: 200 }
) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    ...params,
  },
  body: JSON.stringify({
    status,
    data,
  })
})

module.exports.getAllNotes = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false

  return getAllNotes()
    .then(({ client, rows }) => {

      const response = buildResponse(rows)
      client.release(true)
      context.succeed(response)
      return callback(null, response)

    })
    .catch(err => new Error(err))

}

module.exports.getNoteById = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false
  const { id } = event.pathParameters

  return getNoteById(id)
    .then(({ client, rows }) => {

      const response = buildResponse(rows)
      client.release(true)
      context.succeed(response)
      return callback(null, response)

    })
    .catch(err => new Error(err))

}

module.exports.getNotesByAuthor = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false
  const { id } = event.pathParameters

  return getNotesByAuthor(id)
    .then(({ client, rows }) => {

      const response = buildResponse(rows)
      client.release(true)
      context.succeed(response)
      return callback(null, response)

    })
    .catch(err => new Error(err))

}