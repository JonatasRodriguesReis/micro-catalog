import { DefaultCrudRepository } from '@loopback/repository';
import { Esv7DataSource } from '../datasources';
import { CastMember, CastMemberRelations } from '../models';
export declare class CastMemberRepository extends DefaultCrudRepository<CastMember, typeof CastMember.prototype.id, CastMemberRelations> {
    constructor(dataSource: Esv7DataSource);
}
