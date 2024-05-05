require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
//this is to add commands to our server

const commands = [
    {
        //these are the only 2 we need to make a bare bone commands
        name: 'hello',
        description: 'greets you back'
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