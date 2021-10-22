import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {rabbitmqSubscriber} from '../decorators';
import {CastMemberRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class CastMemberService {
  constructor(
    @repository(CastMemberRepository) private castMemberRepo: CastMemberRepository,
  ) { }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'castMemberCreated',
    routingKey: 'model.castMember.created'
  })
  async handlerCreated({data}: any) {
    console.log('created', data);
    const {id, name, type} = data;
    await this.castMemberRepo.create({
      id, name, type
    })
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'castMemberUpdated',
    routingKey: 'model.castMember.updated'
  })
  async handlerUpdated({data}: any) {
    console.log('updated', data);
    const {id, name, type} = data;
    await this.castMemberRepo.updateById(id, {
      name, type
    })
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'castMemberDeleted',
    routingKey: 'model.castMember.deleted'
  })
  async handlerDeleted({data}: any) {
    console.log('deleted', data);
    const {id} = data;
    await this.castMemberRepo.deleteById(id);
  }
}
