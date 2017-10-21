const pg = require('pg')
const Debug = require('debug')
const { getAllNotes } = require('../models/note.model')
require('dotenv').config()

const log = Debug('notes:*')

const {
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT,
} = process.env

const client = new pg.Client(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`)

client.connect()

const getAllNotes = (event, context, callback) => {
  client.query('SELECT * FROM notes;', (err, notes) => {
    client.end()
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ status: 'ok', data: notes.rows })
    }
    callback(null, response)
  })
}

log(getAllNotes(f => f, {}, log))
