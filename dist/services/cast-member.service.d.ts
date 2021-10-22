import { CastMemberRepository } from '../repositories';
export declare class CastMemberService {
    private castMemberRepo;
    constructor(castMemberRepo: CastMemberRepository);
    handlerCreated({ data }: any): Promise<void>;
    handlerUpdated({ data }: any): Promise<void>;
    handlerDeleted({ data }: any): Promise<void>;
}
