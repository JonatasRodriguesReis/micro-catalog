import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib/properties';
import {rabbitmqSubscriber} from '../decorators';
import {CastMemberRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class CastMemberService {
  constructor(
    @repository(CastMemberRepository) private castMemberRepo: CastMemberRepository,
  ) { }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/cast_member',
    routingKey: 'model.cast_member.*'
  })
  async handler({data, message}: {data: any, message: Message}) {
    const action = message.fields.routingKey.split('.')[2];
    switch (action) {
      case 'created':
        await this.castMemberRepo.create(data)
        break;
      case 'updated':
        await this.castMemberRepo.updateById(data.id, data);
        break;
      case 'deleted':
        await this.castMemberRepo.deleteById(data.id)
        break;
    };
  }
}
