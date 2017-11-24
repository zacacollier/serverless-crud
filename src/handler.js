require('babel-polyfill')
const { generateErrors } = require('./helpers/generateErrors')
const { isEmpty } = require('lodash')
const {
  createNote,
  deleteNote,
  updateNote,
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
  if (!id) throw new Error('no ID provided')

  return getNotesByAuthor(id)
    .then(({ client, rows }) => {

      const response = buildResponse(rows)
      client.release(true)
      context.succeed(response)
      return callback(null, response)

    })
    .catch(err => new Error(err))

}

module.exports.createNote = (event, context, callback) => {

  if (!event.body) throw new Error('no body provided')

  context.callbackWaitsForEmptyEventLoop = false
  const { title, body, author } = JSON.parse(event.body)

  const requiredFields = ['title', 'body', 'author']
  const errors = generateErrors(requiredFields, { title, body, author })

  if (!isEmpty(errors)) throw new Error(JSON.stringify(errors))

  return createNote({ title, body, author })
    .then(({ client, rows }) => {

      const response = buildResponse(rows)
      client.release(true)
      context.succeed(response)
      return callback(null, response)

    })
    .catch(err => new Error(err))

}

module.exports.updateNote = (event, context, callback) => {

  if (!event.body) throw new Error('no body provided')

  context.callbackWaitsForEmptyEventLoop = false
  const { title, body, author, id } = JSON.parse(event.body)

  const requiredFields = ['title', 'body', 'author', 'id']
  const errors = generateErrors(requiredFields, { title, body, author, id })

  if (!isEmpty(errors)) throw new Error(JSON.stringify(errors))

  return updateNote({ title, body, author, id })
    .then(({ client, rows }) => {

      const response = buildResponse(rows)
      client.release(true)
      context.succeed(response)
      return callback(null, response)

    })
    .catch(err => new Error(err))

}

module.exports.deleteNote = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false
  const { id } = event.pathParameters

  return deleteNote({ id })
    .then(({ client, rows }) => {

      const response = buildResponse(rows)
      client.release(true)
      context.succeed(response)
      return callback(null, response)

    })
    .catch(err => new Error(err))

}
