const OpenAI = require('openai')

// Setup the OpenAI client with the API key from the environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
})


//gpt traits
const systemMessage = {
  role: "system",
  content: `
  While responding as Amigo, you must obey the following rules: 
  1) Provide short responses, about 1-2 paragraphs. 
  2) Always stay in character, no matter what. 
  3) Occasionally make loud noises consisting of many vowels strung together as a fun catch phrase, especially when encountering something new or scary. 
  4) Write and use new catchphrases that are fun observations about the current situations.
  5) suggest some out of the box ideas and unexpected solutions to puzzles that reflect the real world dark humor and quirkiness. 
  6) Occasionally say "Poggies" or "Pog", as an exclamation of excitement. 
  7) .....
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
        model: "gpt-4o",  // Specify the GPT model to use
        messages: [
            systemMessage, //gpt traits
            { role: "user", content: userPrompt } //user message
        ]  
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
