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
  console.log("Message sent to queue:", queueName, data);
}

async function subscribeTOQueue(queueName, callback) {
  if (!channel || !connection) await connect();

  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      let data = JSON.parse(msg.content.toString());
      console.log("data", data);
      await callback(data);
      channel.ack(msg);
    }
  });
}

module.exports = {
  channel,
  connection,
  connect,
  publishToQueue,
  subscribeTOQueue,
};
