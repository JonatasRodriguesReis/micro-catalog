import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {rabbitmqSubscriber} from '../decorators';
import {CategoryRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class CategorySyncService {
  constructor(
    @repository(CategoryRepository) private categoryRepo: CategoryRepository,
  ) { }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'categoryCreated',
    routingKey: 'model.category.created'
  })
  async handlerCreated({data}: any) {
    console.log('created', data);
    const {id, name, isActive, description} = data;
    await this.categoryRepo.create({
      id, name, description, isActive, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    })
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'categoryUpdated',
    routingKey: 'model.category.updated'
  })
  async handlerUpdated({data}: any) {
    console.log('updated', data);
    const {id, name, isActive, description} = data;
    await this.categoryRepo.updateById(id, {
      name, isActive, description, updatedAt: new Date().toISOString()
    })
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'categoryDeleted',
    routingKey: 'model.category.deleted'
  })
  async handlerDeleted({data}: any) {
    console.log('deleted', data);
    const {id} = data;
    await this.categoryRepo.deleteById(id);
  }

  /* @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x',
    routingKey: 'model.category.*'
  })
  handler({data}: any) {
    console.log(data);
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'x1',
    routingKey: 'model.category1.*'
  })
  handler1({data}: any) {
    console.log(data);
  } */
}
