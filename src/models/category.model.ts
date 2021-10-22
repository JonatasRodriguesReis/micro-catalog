import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Category extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: false,
    default: ''
  })
  description?: string;

  @property({
    type: "boolean",
    required: false,
    default: true
  })
  isActive: boolean;

  @property({
    name: 'createdAt',
    type: 'date',
    required: true
  })
  createdAt: String;

  @property({
    name: 'updatedAt',
    type: 'date',
    required: true
  })
  updatedAt: String;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
