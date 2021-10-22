"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmqSubscriber = exports.RABBITMQ_SUBSCRIBER_DECORATOR = void 0;
const metadata_1 = require("@loopback/metadata");
exports.RABBITMQ_SUBSCRIBER_DECORATOR = 'rabbitmq-subscribe-metadata';
function rabbitmqSubscriber(spec) {
    return metadata_1.MethodDecoratorFactory.createDecorator(exports.RABBITMQ_SUBSCRIBER_DECORATOR, spec);
}
exports.rabbitmqSubscriber = rabbitmqSubscriber;
//# sourceMappingURL=rabbitmq-subscriber.decorator.js.map