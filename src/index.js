require('dotenv').config()
//the docs: https://discord.js.org/docs/packages/discord.js/14.15.0
const { Client, IntentsBitField } = require('discord.js')
const fs = require('fs');
const path = require('path');
//client is going to be our bot
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { fetchGPTResponse } = require('./gpt'); // Import the function from gpt.js

const client = new Client({
    //intens are basically are "a set of permissions that your bot can use in order to get access a set of events"
    intents:[
        IntentsBitField.Flags.Guilds, //server
        IntentsBitField.Flags.GuildMembers, //server members
        IntentsBitField.Flags.GuildMessages, //listen for messages
        IntentsBitField.Flags.MessageContent, //content of the message
        IntentsBitField.Flags.GuildVoiceStates //voice
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
client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return

    //https://discord.js.org/docs/packages/discord.js/14.15.0/ChatInputCommandInteraction:Class
    console.log(interaction.commandName);
    //if user uses /hello .... replay to them.
    if (interaction.commandName === 'hello') {
        interaction.reply('you just said hello with /hello')
    }

    if (interaction.commandName === 'add') {
        let firstNum = interaction.options.get('first-number').value;
        let secondNum = interaction.options.get('second-number').value;
        let result = firstNum + secondNum
        interaction.reply(`the result is ${result}`)
    }

    if (interaction.commandName === 'boss') {
        //check if user is inside a VC
        if (interaction.member.voice.channel) {
            //create a connection to the vc where the user is
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            })

            //create a audio players
            const player = createAudioPlayer()
            // Create an audio resource from the MP3 file
            const resource = createAudioResource(path.join(__dirname, '../terrariaBossSound.mp3'))
            player.play(resource); //Play the audio resource
            connection.subscribe(player) // links the audio player to the voice connection

            //event listener when it starts playing
            player.on(AudioPlayerStatus.Playing, () => {
                //console.log('The audio is now playing!')
            })

            //event listener when it stops playing
            player.on(AudioPlayerStatus.Idle, () => {
                console.log('Playback has stopped!')
                connection.destroy(); // This will disconnect the bot from the channel after playback
            })
        } else {// if user is not in a channel
            interaction.reply('You need to join a voice channel first!')
        }
        
    }

    //gpt reaction
    if (interaction.commandName === 'baba') {
        const userPrompt = interaction.options.getString('prompt') // Make sure your command has an 'input' option
        if (!userPrompt) {
            interaction.reply("Please provide a valid prompt.");
            return;
        }
        console.log("Received prompt:", userPrompt);  // This should show the actual prompt or reveal if it's null

        const gptResponse = await fetchGPTResponse(userPrompt);
        interaction.reply(gptResponse);
    }

})

client.login(process.env.TOKEN || '') // <------ Enter TOKEN here!!