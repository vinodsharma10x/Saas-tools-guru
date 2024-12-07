export interface Tool {
  id: string;
  name: string;
  logo: string;
  description: string;
  founder: string;
  features: string[];
  pricing: {
    startingPrice: string;
    hasFreeplan: boolean;
    pricingModel: string;
  };
  website: string;
  videoUrl?: string;
  screenshots: string[];
  howToUse: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  category: string;
}