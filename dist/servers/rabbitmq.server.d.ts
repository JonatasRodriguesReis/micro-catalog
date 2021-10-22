import { Context } from '@loopback/context';
import { Application, Server } from '@loopback/core';
import { AmqpConnectionManager, AmqpConnectionManagerOptions, ChannelWrapper } from 'amqp-connection-manager';
import { Channel, Options } from 'amqplib';
import { CategoryRepository } from '../repositories';
export interface RabbitmqConfig {
    uri: string;
    connOptions?: AmqpConnectionManagerOptions;
    exchanges?: {
        name: string;
        type: string;
        options?: Options.AssertExchange;
    }[];
}
export declare class RabbitmqServer extends Context implements Server {
    app: Application;
    private categoryRepo;
    private config;
    private _listening;
    private _conn;
    private _channelManager;
    channel: Channel;
    constructor(app: Application, categoryRepo: CategoryRepository, config: RabbitmqConfig);
    start(): Promise<void>;
    private bindSubscribers;
    private consume;
    private getSubscribers;
    private setupExchanges;
    stop(): Promise<void>;
    get listening(): boolean;
    get conn(): AmqpConnectionManager;
    get channelManager(): ChannelWrapper;
}
