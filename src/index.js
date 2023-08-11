const express = require('express');
const amqplib=require('amqplib')
const{GMAIL_EMAIL}=require('./config/server-config')
const {EmailService}=require('./services')


async function connectQueue(){
    try {
        const connection = await amqplib.connect('amqp://localhost')//this will create a connection to Rabbitmq server
        const channel=await connection.createChannel()//this will create a channel
        await channel.assertQueue('noti-queue')//this will create a queue
        channel.consume('noti-queue',async (data)=>{
            console.log(`${Buffer.from(data.content)}`)
            const object = JSON.parse(`${Buffer.from(data.content)}`)
            await EmailService.sendMail(GMAIL_EMAIL,object.recepientEmail,object.subject,object.text)
            channel.ack(data)
        })
    } catch (error) {
        console.log(error)
    }
}
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue()
});
