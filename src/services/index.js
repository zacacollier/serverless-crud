// @flow

import type { Client } from '../postgres'
export type Table =
  | 'notes'
  | 'users'
export type Fields =
  | {
      title: string,
      body: string,
      author: string,
      id?: string,
    }
export type GetById = {
  table: string,
  key: string,
  id: string,
}
export type PGResponse = {
  rows: Array<Object>,
}

export type ServiceResponse = PGResponse & {
  client: Client
}

export { getAll, getById } from './read.service'
export { createOrUpdate } from './create.service'
export { update } from './update.service'
