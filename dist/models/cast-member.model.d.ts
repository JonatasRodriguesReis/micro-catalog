import { Entity } from '@loopback/repository';
export declare enum CastMemberType {
    DIRECTOR = 1,
    ACTOR = 2
}
export declare class CastMember extends Entity {
    id: string;
    name: string;
    type: number;
    [prop: string]: any;
    constructor(data?: Partial<CastMember>);
}
export interface CastMemberRelations {
}
export declare type CastMemberWithRelations = CastMember & CastMemberRelations;
