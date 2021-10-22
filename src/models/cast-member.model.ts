import {Entity, model, property} from '@loopback/repository';

export enum CastMemberType {
  DIRECTOR = 1,
  ACTOR = 2,
}

@model({settings: {strict: false}})
export class CastMember extends Entity {
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
    type: 'number',
    generated: false,
    required: false,
  })
  type: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CastMember>) {
    super(data);
  }
}

export interface CastMemberRelations {
  // describe navigational properties here
}

export type CastMemberWithRelations = CastMember & CastMemberRelations;
