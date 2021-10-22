import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Message} from 'amqplib';
import {rabbitmqSubscriber} from '../decorators';
import {GenreRepository} from '../repositories';


@bind({scope: BindingScope.TRANSIENT})
export class GenreSyncService {
  constructor(
    @repository(GenreRepository) private genreRepo: GenreRepository,
  ) { }

  @rabbitmqSubscriber({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/genre',
    routingKey: 'model.genre.*'
  })
  async handler({data, message}: {data: any, message: Message}) {
    const action = message.fields.routingKey.split('.')[2];
    switch (action) {
      case 'created':
        await this.genreRepo.create(data);
        console.log('criou')
        break;
      case 'updated':
        await this.genreRepo.updateById(data.id, data);
        break;
      case 'deleted':
        await this.genreRepo.deleteById(data.id)
        break;
    };
  }
}
