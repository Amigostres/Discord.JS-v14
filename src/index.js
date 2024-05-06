//the docs: https://discord.js.org/docs/packages/discord.js/14.15.0
const { Client, IntentsBitField } = require('discord.js')
//client is going to be our bot

require('dotenv').config()

const client = new Client({
    //intens are basically are "a set of permissions that your bot can use in order to get access a set of events"
    intents:[
        IntentsBitField.Flags.Guilds, //server
        IntentsBitField.Flags.GuildMembers, //server members
        IntentsBitField.Flags.GuildMessages, //listen for messages
        IntentsBitField.Flags.MessageContent, //content of the message
    ],
})

// when the bot turns on
client.on('ready', e => { 
    console.log(`${e.user.tag} is on`) 
})

//basic message replies
client.on('messageCreate', msg => {
    if(msg.author.bot) return; //if the author is a bot then return. This onlt exist to not have the bot read it's own message

    console.log('==================================');
    //message docs
    //https://discord.js.org/docs/packages/discord.js/14.15.0/Message:Class
    //console.log(`${msg.author.username} just said: ${msg.content}`);

    msg.reply("I heard you!!")// reply to the user who sent the msg

})

//this will interact with '/' commands
client.on('interactionCreate', interaction => {
    if(!interaction.isChatInputCommand()) return
    //https://discord.js.org/docs/packages/discord.js/14.15.0/ChatInputCommandInteraction:Class
    console.log(interaction.commandName);
    //if user uses /hello .... replay to them.
    if (interaction.commandName === 'hello') {
        interaction.reply('you just said hello with /hello')
    }

})

client.login(process.env.TOKEN|| '') // <------ Enter TOKEN here!!