
interface GptResponse {
  success: boolean;
  content: string;
  error?: string;
}

const getApiKey = (): string | null => {
  // Check for environment variable
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️ OpenAI GPT API key missing. Add VITE_OPENAI_API_KEY to .env file');
    return null;
  }
  
  return apiKey;
};

export async function fetchGpt4oResponse(prompt: string): Promise<GptResponse> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return {
      success: false,
      content: '⚠️ GPT API key not set. Please add VITE_OPENAI_API_KEY to your .env file.',
      error: 'Missing OpenAI API key'
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using gpt-4o-mini as it's faster and more cost-effective
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant for a real estate platform.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return {
        success: false,
        content: 'AI service temporarily unavailable',
        error: `API responded with ${response.status}: ${errorData.error?.message || 'Unknown error'}`
      };
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    
    if (!content) {
      return {
        success: false,
        content: 'No response from AI',
        error: 'Empty response from OpenAI'
      };
    }

    return {
      success: true,
      content: content.trim()
    };
  } catch (err) {
    console.error('GPT API call failed:', err);
    return {
      success: false,
      content: 'AI temporarily unavailable',
      error: err instanceof Error ? err.message : 'Unknown error'
    };
  }
}

export async function testGptConnection(): Promise<boolean> {
  const result = await fetchGpt4oResponse('Say "Hello, API is working!" if you can read this.');
  return result.success;
}

export function isApiKeyConfigured(): boolean {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
}
