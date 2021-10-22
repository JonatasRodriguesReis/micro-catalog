import { GenreRepository } from '../repositories';
export declare class GenreSyncService {
    private genreRepo;
    constructor(genreRepo: GenreRepository);
    handlerCreated({ data }: any): Promise<void>;
    handlerUpdated({ data }: any): Promise<void>;
    handlerDeleted({ data }: any): Promise<void>;
}
