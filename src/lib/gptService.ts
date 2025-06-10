
const gptApiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (import.meta.env.DEV) {
  console.log("🔑 GPT Key:", gptApiKey ? "Found ✅" : "Missing ❌");
}

export const getGptKey = () => {
  if (!gptApiKey) {
    if (import.meta.env.DEV) {
      console.warn("⚠️ GPT API key missing. Please set VITE_OPENAI_API_KEY in .env");
    }
    throw new Error("GPT API key is missing. Please set VITE_OPENAI_API_KEY in .env");
  }
  return gptApiKey;
};

export const isGptKeyConfigured = () => {
  return !!gptApiKey;
};

// Basic GPT service function
export const callGptApi = async (prompt: string) => {
  try {
    const key = getGptKey();
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`GPT API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response';
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("🚨 GPT API Error:", error);
    }
    throw error;
  }
};
