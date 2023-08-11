const {TicketRepository} = require('../repositories')
const {Mailer} = require('../config')

const ticketRepository = new TicketRepository()
async function sendMail(mailFrom,mailTo,subject,text){
    try {
        const response = await Mailer.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:subject,
            text:text
        })
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function createTicket(data){
    try {
        console.log('service mai hu')
        const response = await ticketRepository.create(data)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}


async function getpendingEmails(){
    try {
        const response=await ticketRepository.getPendingTickets()
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports={
    sendMail,
    createTicket,
    getpendingEmails
}