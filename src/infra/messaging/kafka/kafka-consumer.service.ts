import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    if (!process.env.KAFKA_USERNAME || !process.env.KAFKA_PASSWORD) {
      throw new Error('Kafka data not provided.');
    }

    super({
      client: {
        clientId: 'notificaitons',
        brokers: ['verified-parrot-8435-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_USERNAME as string,
          password: process.env.KAFKA_PASSWORD as string,
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
