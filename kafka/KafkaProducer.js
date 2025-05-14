// kafka/kafkaProducer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'api-usuarios',
  brokers: ['localhost:9092'], // O la IP del broker en producción
});

const producer = kafka.producer();

const conectarProducer = async () => {
  await producer.connect();
};

const enviarMensaje = async (topic, mensaje) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(mensaje) }],
  });
};

module.exports = {
  conectarProducer,
  enviarMensaje,
};
