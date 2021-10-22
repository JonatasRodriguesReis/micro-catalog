"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqServer = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const amqp_connection_manager_1 = require("amqp-connection-manager");
const decorators_1 = require("../decorators");
const keys_1 = require("../keys");
const repositories_1 = require("../repositories");
/* import AssertQueue = Replies.AssertQueue;
import AssertExchange = Replies.AssertExchange; */
console.log(core_1.CoreBindings.APPLICATION_CONFIG);
let RabbitmqServer = class RabbitmqServer extends context_1.Context {
    constructor(app, categoryRepo, config) {
        super(app);
        this.app = app;
        this.categoryRepo = categoryRepo;
        this.config = config;
    }
    async start() {
        this._conn = amqp_connection_manager_1.connect([this.config.uri], this.config.connOptions);
        this._channelManager = this._conn.createChannel();
        this.channelManager.on('connect', () => {
            this._listening = true;
            console.log('Successfuly connected a Rabbitmq channel');
        });
        this.channelManager.on('error', (error, name) => {
            this._listening = false;
            console.log(`Failed to setup a Rabbitmq channel - name: ${name} | error: ${error.message}`);
        });
        await this.setupExchanges();
        await this.bindSubscribers();
        /* const service = this.getSync<CategorySyncService>('services.CategorySyncService');
        const metadata = MetadataInspector.getMethodMetadata<RabbitmqSubscriberMetadata>(
          RABBITMQ_SUBSCRIBER_DECORATOR, service
        ) */
        //this.boot();
    }
    async bindSubscribers() {
        this.getSubscribers()
            .map(async (item) => {
            await this.channelManager.addSetup(async (channel) => {
                console.log(item.metadata);
                const { exchange, queue, routingKey, queueOptions } = item.metadata;
                const assertQueue = await channel.assertQueue(queue !== null && queue !== void 0 ? queue : '', queueOptions !== null && queueOptions !== void 0 ? queueOptions : undefined);
                const routingKeys = Array.isArray(routingKey) ? routingKey : [routingKey];
                await Promise.all(routingKeys.map((x) => (channel.bindQueue(assertQueue.queue, exchange, x))));
                await this.consume({
                    channel,
                    queue: assertQueue.queue,
                    method: item.method
                });
            });
        });
    }
    async consume({ channel, queue, method }) {
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
                    }
                    catch (e) {
                        data = null;
                    }
                    console.log(data);
                    await method({ data, message, channel });
                    channel.ack(message);
                }
            }
            catch (e) {
                console.error(e);
                //politica de resposta - Nack
            }
        });
    }
    getSubscribers() {
        const bindings = this.find('services.*');
        return bindings.map(binding => {
            var _a;
            const metadata = core_1.MetadataInspector.getAllMethodMetadata(decorators_1.RABBITMQ_SUBSCRIBER_DECORATOR, (_a = binding.valueConstructor) === null || _a === void 0 ? void 0 : _a.prototype);
            if (!metadata) {
                return [];
            }
            const methods = [];
            for (const methodName in metadata) {
                if (!Object.prototype.hasOwnProperty.call(metadata, methodName)) {
                    return;
                }
                const service = this.getSync(binding.key);
                methods.push({
                    method: service[methodName].bind(service),
                    metadata: metadata[methodName]
                });
            }
            return methods;
        }).reduce((collection, item) => {
            collection.push(...item);
            return collection;
        }, []);
    }
    async setupExchanges() {
        return this.channelManager.addSetup(async (channel) => {
            if (!this.config.exchanges) {
                return;
            }
            await Promise.all(this.config.exchanges.map((exchange) => (channel.assertExchange(exchange.name, exchange.type, exchange.options))));
        });
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
    async stop() {
        await this._conn.close();
        this._listening = false;
        return undefined;
    }
    get listening() {
        return this._listening;
    }
    get conn() {
        return this._conn;
    }
    get channelManager() {
        return this._channelManager;
    }
};
RabbitmqServer = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__param(1, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__param(2, core_1.inject(keys_1.RabbitmqBidings.CONFIG)),
    tslib_1.__metadata("design:paramtypes", [core_1.Application,
        repositories_1.CategoryRepository, Object])
], RabbitmqServer);
exports.RabbitmqServer = RabbitmqServer;
//# sourceMappingURL=rabbitmq.server.js.map