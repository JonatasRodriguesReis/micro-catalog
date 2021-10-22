import { Entity } from '@loopback/repository';
export declare class Genre extends Entity {
    id: string;
    name: string;
    isActive: Boolean;
    [prop: string]: any;
    constructor(data?: Partial<Genre>);
}
export interface GenreRelations {
}
export declare type GenreWithRelations = Genre & GenreRelations;
