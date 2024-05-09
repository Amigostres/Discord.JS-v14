require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes, ApplicationCommandOptionType } = require('discord.js');
//this is to add commands to our server

const commands = [
    {
        //these are the only 2 we need to make a bare bone commands
        name: 'hello', //names cannot have spaces
        description: 'greets you back'
    },
    {
        //add 2 values
        name: 'add',
        description: 'the sum of 2 values',
        options: [

            {
                name: 'first-number',
                description: '1st value',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: '2nd value',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },

]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);//this needs a simicolon for some reason


//this function will run and register out commands
(async () => {
    //here is where we register our commands
    try {
        console.log('registering commands...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('commands are now registered')
    } catch (error) {
        console.log(`error: ${error}`)
    }
})()