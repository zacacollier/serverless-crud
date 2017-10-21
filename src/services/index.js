// @flow

import type pg from 'pg'
export type Table =
  | 'notes'
  | 'users'
export type Fields =
  | {
      title: string,
      body: string,
      author: string,
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
  client: pg.Client
}
export type ResourceId =
  | string


export { getAll, getById } from './read.service'
export { create } from './create.service'
export { update } from './update.service'
