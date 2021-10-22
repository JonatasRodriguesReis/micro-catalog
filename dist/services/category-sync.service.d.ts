import { CategoryRepository } from '../repositories';
export declare class CategorySyncService {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository);
    handlerCreated({ data }: any): Promise<void>;
    handlerUpdated({ data }: any): Promise<void>;
    handlerDeleted({ data }: any): Promise<void>;
}
