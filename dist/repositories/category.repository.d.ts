import { DefaultCrudRepository } from '@loopback/repository';
import { Esv7DataSource } from '../datasources';
import { Category, CategoryRelations } from '../models';
export declare class CategoryRepository extends DefaultCrudRepository<Category, typeof Category.prototype.id, CategoryRelations> {
    constructor(dataSource: Esv7DataSource);
}
