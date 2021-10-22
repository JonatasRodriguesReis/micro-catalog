import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Genre extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: "boolean",
    generated: false,
    required: true,
  })
  isActive: Boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Genre>) {
    super(data);
  }
}

export interface GenreRelations {
  // describe navigational properties here
}

export type GenreWithRelations = Genre & GenreRelations;
