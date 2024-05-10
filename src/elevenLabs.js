const { ElevenLabsClient } = require("elevenlabs")
const { createWriteStream, existsSync, mkdirSync } = require("fs")
const { v4 } = require("uuid")
const path = require('path')

const ELEVENLABS_API_KEY = process.env.ELEVEN_LABS_API_KEY || '' //<----- ElevenLabs API key
const ELEVENLABS_VOICE_ID = process.env.ELEVEN_LABS_VOICE_ID || '' //<----- ElevenLabs voice ID

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
})

const historyDir = path.join(__dirname, '../', 'History')
//this makes sure to make the history path
if (!existsSync(historyDir)) {
    mkdirSync(historyDir, { recursive: true })
}

async function synthesizeSpeech(text) {
  try {
    const audio = await client.generate({
      voice: ELEVENLABS_VOICE_ID,
      model_id: "eleven_turbo_v2",
      text,
    })
    const fileName = path.join(historyDir , `${v4()}.mp3`)
    const fileStream = createWriteStream(fileName)
    audio.pipe(fileStream)

    return new Promise((resolve, reject) => {
      fileStream.on("finish", () => resolve(fileName)) // Resolve with the file name
      fileStream.on("error", reject)
    })
  } catch (error) {
    console.error("Error when calling Eleven Labs:", error)
    throw new Error("Error processing speech synthesis.")
  }
}

module.exports = { synthesizeSpeech }
