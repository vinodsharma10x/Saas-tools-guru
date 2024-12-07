import { z } from 'zod';

const pricingSchema = z.object({
  startingPrice: z.string(),
  hasFreeplan: z.boolean(),
  pricingModel: z.string()
});

export const toolSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().url(),
  description: z.string(),
  founder: z.string(),
  features: z.array(z.string()),
  pricing: pricingSchema,
  website: z.string().url(),
  video_url: z.string().url().nullable(),
  screenshots: z.array(z.string().url()),
  how_to_use: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  best_for: z.array(z.string()),
  category: z.string()
});

export type Tool = z.infer<typeof toolSchema>;