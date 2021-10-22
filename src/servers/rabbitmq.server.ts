import {Context} from '@loopback/context';
import {Application, Binding, CoreBindings, inject, MetadataInspector, Server} from '@loopback/core';
import {repository} from '@loopback/repository';
import {AmqpConnectionManager, AmqpConnectionManagerOptions, ChannelWrapper, connect} from 'amqp-connection-manager';
import {Channel, ConfirmChannel, Options} from 'amqplib';
import {RabbitmqSubscriberMetadata, RABBITMQ_SUBSCRIBER_DECORATOR} from '../decorators';
import {RabbitmqBidings} from '../keys';
import {CategoryRepository} from '../repositories';
/* import AssertQueue = Replies.AssertQueue;
import AssertExchange = Replies.AssertExchange; */

console.log(CoreBindings.APPLICATION_CONFIG);

export interface RabbitmqConfig {
  uri: string;
  connOptions?: AmqpConnectionManagerOptions;
  exchanges?: {name: string, type: string, options?: Options.AssertExchange}[]
}

export class RabbitmqServer extends Context implements Server {
  private _listening: boolean;
  private _conn: AmqpConnectionManager;
  private _channelManager: ChannelWrapper;
  channel: Channel;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app: Application,
    @repository(CategoryRepository) private categoryRepo: CategoryRepository,
    @inject(RabbitmqBidings.CONFIG) private config: RabbitmqConfig
  ) {
    super(app);
  }

  async start(): Promise<void> {
    this._conn = connect([this.config.uri], this.config.connOptions);
    this._channelManager = this._conn.createChannel();
    this.channelManager.on('connect', () => {
      this._listening = true;
      console.log('Successfuly connected a Rabbitmq channel');
    })
    this.channelManager.on('error', (error, name) => {
      this._listening = false;
      console.log(`Failed to setup a Rabbitmq channel - name: ${name} | error: ${error.message}`);
    })

    await this.setupExchanges();
    await this.bindSubscribers();

    /* const service = this.getSync<CategorySyncService>('services.CategorySyncService');
    const metadata = MetadataInspector.getMethodMetadata<RabbitmqSubscriberMetadata>(
      RABBITMQ_SUBSCRIBER_DECORATOR, service
    ) */

    //this.boot();

  }

  private async bindSubscribers() {
    this.getSubscribers()
      .map(async (item) => {
        await this.channelManager.addSetup(async (channel: ConfirmChannel) => {
          console.log(item.metadata)
          const {exchange, queue, routingKey, queueOptions} = item.metadata;
          const assertQueue = await channel.assertQueue(
            queue ?? '',
            queueOptions ?? undefined
          );

          const routingKeys = Array.isArray(routingKey) ? routingKey : [routingKey];

          await Promise.all(routingKeys.map((x) => (
            channel.bindQueue(assertQueue.queue, exchange, x)
          )));

          await this.consume({
            channel,
            queue: assertQueue.queue,
            method: item.method
          });
        })
      })
  }

  private async consume({channel, queue, method}: {channel: ConfirmChannel, queue: string, method: Function}) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await channel.consume(queue, async (message) => {
      try {
        if (!message) {
          throw new Error('Received null message');
        }

        const content = message.content;
        if (content) {
          let data;
          try {
            data = JSON.parse(content.toString());
          } catch (e) {
            data = null;
          }

          console.log(data);
          await method({data, message, channel});
          channel.ack(message);
        }
      } catch (e) {
        console.error(e);
        //politica de resposta - Nack
      }
    });
  }

  private getSubscribers(): {method: Function, metadata: RabbitmqSubscriberMetadata}[] {
    const bindings: Array<Readonly<Binding>> = this.find('services.*');

    return bindings.map(
      binding => {
        const metadata = MetadataInspector.getAllMethodMetadata<RabbitmqSubscriberMetadata>(
          RABBITMQ_SUBSCRIBER_DECORATOR, binding.valueConstructor?.prototype
        );
        if (!metadata) {
          return [];
        }
        const methods = [];
        for (const methodName in metadata) {
          if (!Object.prototype.hasOwnProperty.call(metadata, methodName)) {
            return;
          }

          const service = this.getSync(binding.key) as any;
          methods.push({
            method: service[methodName].bind(service),
            metadata: metadata[methodName]
          })
        }

        return methods;
      }
    ).reduce((collection: any, item: any) => {
      collection.push(...item);

      return collection;
    }, []);
  }

  private async setupExchanges() {
    return this.channelManager.addSetup(async (channel: ConfirmChannel) => {
      if (!this.config.exchanges) {
        return;
      }

      await Promise.all(this.config.exchanges.map((exchange) => (
        channel.assertExchange(exchange.name, exchange.type, exchange.options)
      )))
    })
  }

  /* async boot() {
    // @ts-ignore
    this.channel = await this._conn.createChannel();
    const queue: AssertQueue = await this.channel.assertQueue('micro-catalog/sync-videos');
    const exchange: AssertExchange = await this.channel.assertExchange('amq.topic', 'topic');

    await this.channel.bindQueue(queue.queue, exchange.exchange, 'model.*.*');

    //const result = channel.sendToQueue('first-queue', Buffer.from('Hello world!'));
    //await channel.publish('amq.direct', 'minha-rounting-key', Buffer.from('publicado por routing key'));

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.channel.consume(queue.queue, (message) => {
      if (!message) {
        return;
      }
      const data = JSON.parse(message.content.toString());
      const [model, event] = message.fields.routingKey.split('.').slice(1);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      console.log(data);
      this.sync({model, event, data})
        .then(() => this.channel.ack(message))
        .catch(() => this.channel.reject(message, false))
    });
    //console.log(resut);
  }

  async sync({model, event, data}: {model: string, event: string, data: any}) {
    if (model === 'category') {
      switch (event) {
        case 'created':
          await this.categoryRepo.create({
            //id: uuid().toString(),
            ...data,
            description: 'lkjlkjlkjlk',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          break;
        case 'updated':
          await this.categoryRepo.updateById(
            data.id,
            {
              ...data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          );
          break;
        case 'deleted':
          await this.categoryRepo.deleteById(data.id);
          break;
      }
    }
  } */

  async stop(): Promise<void> {
    await this._conn.close();
    this._listening = false;

    return undefined;
  }

  get listening(): boolean {
    return this._listening;
  }

  get conn(): AmqpConnectionManager {
    return this._conn;
  }

  get channelManager(): ChannelWrapper {
    return this._channelManager;
  }
}
