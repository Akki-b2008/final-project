const amqplib = require("amqplib");

let channel, connection;

async function connect() {
  if (connection) return connection;

  try {
    connection = await amqplib.connect(process.env.RABBIT_URL);
    console.log("Connected to RabitMQ");
    channel = await connection.createChannel();
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
  }
}

async function publishToQueue(queueName, data = {}) {
  if (!channel || !connection) await connect();

  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
}

async function subscribeToQueue(queueName, callback) {
  if (!channel || !connection) await connect();
  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, async (msg) => {
    if (!msg) return;

    let data;
    try {
      data = JSON.parse(msg.content.toString());
      await callback(data);
      channel.ack(msg);
    } catch (err) {
      console.error(`Error processing message from ${queueName}:`, err.message);
      channel.nack(msg, false, false);
    }
  });
}

module.exports = {
  channel,
  connection,
  connect,
  publishToQueue,
  subscribeToQueue,
};
