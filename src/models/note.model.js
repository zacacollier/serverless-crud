// @flow
import debug from 'debug'
import uuidv4 from 'uuid'
import * as Services from '../services'
import type {
  GetById,
  Fields,
  ServiceResponse,
} from '../services'
const {
  createOrUpdate,
  getAll,
  getById,
} = Services

const log = debug('notes:models:note.model')

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

//    getAll()

export const getNotesByAuthor = (authorId: string) =>
  getById({ ...getNotesByAuthorOptions, id: authorId })
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))

// getNotesByAuthor('larry_david_cognito_id').then(res => log(res))

export const getNoteById = (noteId: string) =>
  getById({ ...getNoteByIdOptions, id: noteId })
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))

//   getNoteById('31f3b791-50ae-4632-aadf-eab7c6477041')

export const createNote = (fields: Fields) =>
  createOrUpdate('notes', fields, createNoteQuery)
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))

//   createNote({
//     title: 'my fifth note',
//     body: 'literally my fifth note',
//     author: 'larry_david_cognito_id',
//   })

export const updateNote = (fields: Fields) =>
  createOrUpdate('notes', fields, updateNoteQuery)
    .then(({ rows, client }: ServiceResponse) =>
      ({ rows, client }))
    .catch(err => err)

// updateNote({
//   title: 'my sixth note',
//   body: 'absolutely my sixth note',
//   author: 'larry_david_cognito_id',
// },'e8ba5ba1-973f-458a-a500-8bc2fd713a16')
