const OpenAI = require('openai')

// Setup the OpenAI client with the API key from the environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});


async function fetchGPTResponse(userPrompt) {
  // Check if the prompt is empty or null
  if (!userPrompt) {
    console.error("No prompt provided.")
    return "No prompt provided. Please provide a prompt."
  }
  
  try {
    // Make an API call to the OpenAI Chat Completions endpoint
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",  // gpt model to use
        messages: [{role: "user", content: userPrompt}]  // Construct the message format required by the API
    });

    // Access the 'content' from the response and trim any excess whitespace
    return response.choices[0].message.content.trim()
  } catch (error) {
    // Log and return the error if the API call fails
    console.error("Error when calling OpenAI:", error)
    return "Error processing your request"
  }
}

module.exports = { fetchGPTResponse }
