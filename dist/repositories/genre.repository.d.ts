import { DefaultCrudRepository } from '@loopback/repository';
import { Esv7DataSource } from '../datasources';
import { Genre, GenreRelations } from '../models';
export declare class GenreRepository extends DefaultCrudRepository<Genre, typeof Genre.prototype.id, GenreRelations> {
    constructor(dataSource: Esv7DataSource);
}
