import { Message } from 'amqplib/properties';
import { CastMemberRepository } from '../repositories';
export declare class CastMemberService {
    private castMemberRepo;
    constructor(castMemberRepo: CastMemberRepository);
    handler({ data, message }: {
        data: any;
        message: Message;
    }): Promise<void>;
}
