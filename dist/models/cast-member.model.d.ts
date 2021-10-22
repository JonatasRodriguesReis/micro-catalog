import { Entity } from '@loopback/repository';
export declare class CastMember extends Entity {
    id: string;
    name: string;
    type: string;
    [prop: string]: any;
    constructor(data?: Partial<CastMember>);
}
export interface CastMemberRelations {
}
export declare type CastMemberWithRelations = CastMember & CastMemberRelations;
