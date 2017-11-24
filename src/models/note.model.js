// @flow
// import debug from 'debug'
import uuidv4 from 'uuid'
import {
  createOrUpdate,
  deleteById,
  getAll,
  getById,
} from '../controllers'
import type {
  GetById,
  Fields,
  ServiceResponse,
} from '../controllers'

// const log = debug('notes:models:note.model')

export const updateNoteQuery = ({ title, body, id, author }: Fields) =>
  id
    ? `
      UPDATE notes
        SET
          body = $$${body}$$,
          title = $$${title}$$
        WHERE
          id = $$${id}$$ AND author = $$${author}$$;
    `
    : new Error('could not update Note: no `id` provided')

export const createNoteQuery = ({ title, body, author }: Fields) => `
  INSERT INTO notes (
    title,
    body,
    author,
    id
  ) VALUES (
    $$${title}$$,
    $$${body}$$,
    $$${author}$$,
    $$${uuidv4()}$$
  );
`

// Options
const getNotesByAuthorOptions: GetById = {
  table: 'notes',
  key: 'author',
  id: '',
}
const getNoteByIdOptions: GetById = {
  table: 'notes',
  key: 'id',
  id: '',
}


// Models
export const getAllNotes = () =>
  getAll('notes')
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))

export const getNotesByAuthor = (authorId: string) =>
  getById({ ...getNotesByAuthorOptions, id: authorId })
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))

export const getNoteById = (noteId: string) =>
  getById({ ...getNoteByIdOptions, id: noteId })
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))

export const createNote = (fields: Fields) =>
  createOrUpdate('notes', fields, createNoteQuery)
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))

export const updateNote = (fields: Fields) =>
  createOrUpdate('notes', fields, updateNoteQuery)
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))
    .catch(err => err)

export const deleteNote = (fields: Fields) =>
  deleteById('notes', fields)
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))
    .catch(err => err)
