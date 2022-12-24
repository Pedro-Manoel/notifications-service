export const kafkaConfig = {
  brokers: process.env.KAFKA_BROKERS as unknown as string[],
};
