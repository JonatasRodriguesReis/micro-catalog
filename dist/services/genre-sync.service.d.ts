import { Message } from 'amqplib';
import { GenreRepository } from '../repositories';
export declare class GenreSyncService {
    private genreRepo;
    constructor(genreRepo: GenreRepository);
    handler({ data, message }: {
        data: any;
        message: Message;
    }): Promise<void>;
}
