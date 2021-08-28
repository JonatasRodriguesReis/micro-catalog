import { Entity } from '@loopback/repository';
export declare class Category extends Entity {
    id: string;
    name: string;
    description?: string;
    [prop: string]: any;
    constructor(data?: Partial<Category>);
}
export interface CategoryRelations {
}
export declare type CategoryWithRelations = Category & CategoryRelations;
