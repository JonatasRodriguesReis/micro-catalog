import {MethodDecoratorFactory} from '@loopback/metadata';
import {Options} from 'amqplib';

export interface RabbitmqSubscriberMetadata {
  exchange: string;
  routingKey: string | string[];
  queue?: string;
  queueOptions?: Options.AssertQueue;
}

export const RABBITMQ_SUBSCRIBER_DECORATOR = 'rabbitmq-subscribe-metadata';

export function rabbitmqSubscriber(spec: RabbitmqSubscriberMetadata): MethodDecorator {
  return MethodDecoratorFactory.createDecorator<RabbitmqSubscriberMetadata>(
    RABBITMQ_SUBSCRIBER_DECORATOR, spec
  )
}
