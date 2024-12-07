import { Tool } from '../types/tool';

export const CATEGORIES = [
  'Marketing',
  'Development',
  'Design',
  'Analytics',
  'Productivity',
  'Customer Support',
  'Sales',
  'Finance',
  'Security',
  'Communication',
];

export const TOOLS: Tool[] = [
  {
    id: 'notion',
    name: 'Notion',
    logo: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=128&h=128&fit=crop',
    description: 'All-in-one workspace for notes, docs, and collaboration',
    founder: 'Ivan Zhao',
    features: [
      'Collaborative workspace',
      'Custom databases',
      'Wiki pages',
      'Project management',
      'API access',
    ],
    pricing: {
      startingPrice: '$8',
      hasFreeplan: true,
      pricingModel: 'per-user',
    },
    website: 'https://notion.so',
    videoUrl: 'https://www.youtube.com/embed/gp2yhkVw0z4',
    screenshots: [
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop',
    ],
    howToUse: `<div class="space-y-4">
      <p>1. Create an account at notion.so</p>
      <p>2. Choose a template or start from scratch</p>
      <p>3. Organize your workspace with pages and databases</p>
      <p>4. Invite team members and collaborate</p>
    </div>`,
    pros: [
      'Highly flexible',
      'Great for teams',
      'Rich feature set',
      'Regular updates',
    ],
    cons: [
      'Can be overwhelming for beginners',
      'Mobile app needs improvement',
      'Limited offline access',
    ],
    bestFor: [
      'Teams needing a central workspace',
      'Project managers',
      'Content creators',
    ],
    category: 'Productivity',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&h=128&fit=crop',
    description: 'Payment processing platform for internet businesses',
    founder: 'Patrick Collison',
    features: [
      'Payment processing',
      'Subscription management',
      'Invoicing',
      'Fraud prevention',
      'Global payments',
    ],
    pricing: {
      startingPrice: '2.9% + $0.30',
      hasFreeplan: false,
      pricingModel: 'per-transaction',
    },
    website: 'https://stripe.com',
    videoUrl: 'https://www.youtube.com/embed/tGWBy6PwKjw',
    screenshots: [
      'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=800&fit=crop',
    ],
    howToUse: `<div class="space-y-4">
      <p>1. Sign up for a Stripe account</p>
      <p>2. Add your business details</p>
      <p>3. Integrate Stripe using their API or libraries</p>
      <p>4. Test payments in development mode</p>
    </div>`,
    pros: [
      'Excellent documentation',
      'Developer-friendly',
      'Robust security',
      'Global support',
    ],
    cons: [
      'Higher fees for international transactions',
      'Complex pricing structure',
      'Account approval can be strict',
    ],
    bestFor: [
      'Online businesses',
      'SaaS companies',
      'E-commerce platforms',
    ],
    category: 'Finance',
  },
  {
    id: 'figma',
    name: 'Figma',
    logo: 'https://images.unsplash.com/photo-1556155092-490a1b6c9a5e?w=128&h=128&fit=crop',
    description: 'Collaborative interface design tool',
    founder: 'Dylan Field',
    features: [
      'Real-time collaboration',
      'Design systems',
      'Prototyping',
      'Developer handoff',
      'Plugins',
    ],
    pricing: {
      startingPrice: '$12',
      hasFreeplan: true,
      pricingModel: 'per-user',
    },
    website: 'https://figma.com',
    videoUrl: 'https://www.youtube.com/embed/Cx2dkpBxst8',
    screenshots: [
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    ],
    howToUse: `<div class="space-y-4">
      <p>1. Create a Figma account</p>
      <p>2. Start a new design file</p>
      <p>3. Use frames and components</p>
      <p>4. Share and collaborate</p>
    </div>`,
    pros: [
      'Browser-based',
      'Real-time collaboration',
      'Powerful features',
      'Great community',
    ],
    cons: [
      'Requires good internet connection',
      'Limited offline capabilities',
      'Learning curve for advanced features',
    ],
    bestFor: [
      'UI/UX designers',
      'Design teams',
      'Product managers',
    ],
    category: 'Design',
  },
  // Add 17 more tools here with similar structure but different data
];

export const FEATURED_TOOLS = TOOLS.slice(0, 3);