import { Options } from 'amqplib';
export interface RabbitmqSubscriberMetadata {
    exchange: string;
    routingKey: string | string[];
    queue?: string;
    queueOptions?: Options.AssertQueue;
}
export declare const RABBITMQ_SUBSCRIBER_DECORATOR = "rabbitmq-subscribe-metadata";
export declare function rabbitmqSubscriber(spec: RabbitmqSubscriberMetadata): MethodDecorator;
