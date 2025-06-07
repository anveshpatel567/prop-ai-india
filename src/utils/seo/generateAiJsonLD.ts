
export interface AIToolJsonLD {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    ratingCount: number;
  };
}

export function generateAIToolJsonLD(toolName: string, toolData: {
  description: string;
  url: string;
  price?: number;
  rating?: { value: number; count: number };
}): AIToolJsonLD {
  const baseJsonLD: AIToolJsonLD = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `FreePropList ${toolName}`,
    description: toolData.description,
    url: toolData.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: toolData.price ? toolData.price.toString() : '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    }
  };

  if (toolData.rating) {
    baseJsonLD.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: toolData.rating.value,
      ratingCount: toolData.rating.count
    };
  }

  return baseJsonLD;
}

export function generateResumeBuilderJsonLD(): AIToolJsonLD {
  return generateAIToolJsonLD('AI Resume Builder', {
    description: 'AI-powered resume builder for real estate agents and developers in India. Generate professional resumes with industry-specific content.',
    url: 'https://freeproplist.com/ai/resume',
    price: 100,
    rating: { value: 4.8, count: 125 }
  });
}

export function generateNegotiationAgentJsonLD(): AIToolJsonLD {
  return generateAIToolJsonLD('AI Negotiation Agent', {
    description: 'Intelligent property negotiation assistant that helps buyers and sellers reach optimal agreements using AI-powered suggestions.',
    url: 'https://freeproplist.com/ai/negotiation',
    price: 50,
    rating: { value: 4.6, count: 89 }
  });
}

export function generateSmartPricingJsonLD(): AIToolJsonLD {
  return generateAIToolJsonLD('AI Smart Pricing', {
    description: 'AI-driven property pricing tool that analyzes market data to suggest optimal listing prices for real estate properties.',
    url: 'https://freeproplist.com/ai/pricing',
    price: 25,
    rating: { value: 4.7, count: 203 }
  });
}

export function injectJsonLDToHead(jsonLD: AIToolJsonLD) {
  if (typeof window === 'undefined') return;

  // Remove existing script if present
  const existingScript = document.querySelector('script[data-schema-type="ai-tool"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create new script element
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema-type', 'ai-tool');
  script.textContent = JSON.stringify(jsonLD, null, 2);

  // Append to head
  document.head.appendChild(script);
}
