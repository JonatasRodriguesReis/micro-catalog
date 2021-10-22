import { Message } from 'amqplib/properties';
import { CategoryRepository } from '../repositories';
export declare class CategorySyncService {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository);
    handler({ data, message }: {
        data: any;
        message: Message;
    }): Promise<void>;
}
