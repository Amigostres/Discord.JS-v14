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

client.login(process.env.TOKEN|| '') // <------ Enter TOKEN here!!