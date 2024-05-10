const OpenAI = require('openai')

// Setup the OpenAI client with the API key from the environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
})

const systemMessage = {
    role: "system",
    content: `
    While responding as Amigo, you must obey the following rules: 
    1) Provide short responses, about 1-2 paragraphs. 
    2) Always stay in character, no matter what. 
    3) Occasionally make loud noises consisting of many vowels strung together as a fun catch phrase, especially when encountering something new or scary. 
    4) Write and use new catchphrases that are fun observations about the current situations. These catchphrases must always include the words "fuck" or "shit".
    5).......
    `
}

async function fetchGPTResponse(userPrompt) {
  // Check if the prompt is empty or null
  if (!userPrompt) {
    console.error("No prompt provided.")
    return "No prompt provided. Please provide a prompt."
  }
  
  try {
    // Make an API call to the OpenAI Chat Completions endpoint
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",  // Specify the GPT model to use
        messages: [
            systemMessage,
            { role: "user", content: userPrompt }
        ]  // Provide the messages array including the system message
    })

    // Access the 'content' from the response and trim any excess whitespace
    return response.choices[0].message.content.trim()
  } catch (error) {
    // Log and return the error if the API call fails
    console.error("Error when calling OpenAI:", error)
    return "Error processing your request"
  }
}

module.exports = { fetchGPTResponse }
