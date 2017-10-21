// @flow
import debug from 'debug'
import * as Services from '../services'
import type {
  GetById,
  Fields,
  ResourceId,
} from '../services'
const {
  create,
  getAll,
  getById,
  update,
} = Services

const log = debug('notes:models:note.model')

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
    .then(({ rows, client }) => ({ rows, client }))

//    getAll()

export const getNotesByAuthor = (authorId: string) =>
  getById({ ...getNotesByAuthorOptions, id: authorId })
    .then(({ rows, client }) => ({ rows, client }))

// getNotesByAuthor('larry_david_cognito_id').then(res => log(res))

export const getNoteById = (noteId: string) =>
  getById({ ...getNoteByIdOptions, id: noteId })
    .then(({ rows, client }) => ({ rows, client }))

//   getNoteById('31f3b791-50ae-4632-aadf-eab7c6477041')

export const createNote = async (fields: Fields) =>
  await create('notes', fields)

//   createNote({
//     title: 'my fifth note',
//     body: 'literally my fifth note',
//     author: 'larry_david_cognito_id',
//   })

export const updateNote = async (fields: Fields, id: ResourceId) =>
  await update('notes', fields, id)

// updateNote({
//   title: 'my sixth note',
//   body: 'absolutely my sixth note',
//   author: 'larry_david_cognito_id',
// },'e8ba5ba1-973f-458a-a500-8bc2fd713a16')
