import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {rabbitmqSubscriber} from '../decorators';
import {GenreRepository} from '../repositories';


@bind({scope: BindingScope.TRANSIENT})
export class GenreSyncService {
  constructor(
    @repository(GenreRepository) private genreRepo: GenreRepository,
  ) { }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'genreCreated',
    routingKey: 'model.genre.created'
  })
  async handlerCreated({data}: any) {
    console.log('created', data);
    const {id, name, isActive} = data;
    await this.genreRepo.create({
      id, name, isActive
    })
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'genreUpdated',
    routingKey: 'model.genre.updated'
  })
  async handlerUpdated({data}: any) {
    console.log('updated', data);
    const {id, name, isActive} = data;
    await this.genreRepo.updateById(id, {
      name, isActive
    })
  }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'genreDeleted',
    routingKey: 'model.genre.deleted'
  })
  async handlerDeleted({data}: any) {
    console.log('deleted', data);
    const {id} = data;
    await this.genreRepo.deleteById(id);
  }
}
