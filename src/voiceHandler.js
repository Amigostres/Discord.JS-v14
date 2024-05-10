const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus, entersState } = require('@discordjs/voice')
const fs = require('fs')

/**
 * Joins a voice channel and plays a given audio file.
 *
 * @param {VoiceChannel} voiceChannel The voice channel to join.
 * @param {string} filePath The path to the audio file to play.
 */
async function playAudioInChannel(voiceChannel, filePath) {
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    })

    try {
        // Wait up to 30 seconds for the voice connection to be ready
        await entersState(connection, VoiceConnectionStatus.Ready, 30e3)

        // Create an audio player
        const player = createAudioPlayer()
        // Create a stream for the audio file
        const stream = fs.createReadStream(filePath)
        // Create an audio resource from the stream
        const resource = createAudioResource(stream)
        // Play the audio resource
        player.play(resource)

        //connection to the player so the audio is transmitted to the voice channel
        connection.subscribe(player)

        player.on('stateChange', (oldState, newState) => {
            if (newState.status === 'idle') {
                connection.disconnect()
                connection.destroy()
            }
        })
    } catch (error) {
        console.error('Error connecting to voice channel:', error)
        connection.destroy()
    }
}

module.exports = { playAudioInChannel }
