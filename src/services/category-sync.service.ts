import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib/properties';
import {rabbitmqSubscriber} from '../decorators';
import {CategoryRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class CategorySyncService {
  constructor(
    @repository(CategoryRepository) private categoryRepo: CategoryRepository,
  ) { }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/category',
    routingKey: 'model.category.*'
  })
  async handler({data, message}: {data: any, message: Message}) {
    const action = message.fields.routingKey.split('.')[2];
    console.log(data);
    console.log(action)
    switch (action) {
      case 'created':
        await this.categoryRepo.create({...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()})
        break;
      case 'updated':
        await this.categoryRepo.updateById(data.id, data);
        break;
      case 'deleted':
        await this.categoryRepo.deleteById(data.id)
        break;
    };
  }
}
