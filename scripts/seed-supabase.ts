import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { Database } from '../src/types/supabase';
import { TOOLS } from '../src/data/tools';

// Load environment variables from .env file
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data
    const { error: deleteError } = await supabase
      .from('tools')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      throw deleteError;
    }

    console.log('✅ Cleared existing data');

    // Insert tools in batches
    const batchSize = 5;
    for (let i = 0; i < TOOLS.length; i += batchSize) {
      const batch = TOOLS.slice(i, i + batchSize).map(tool => ({
        name: tool.name,
        logo: tool.logo,
        description: tool.description,
        founder: tool.founder,
        features: tool.features,
        pricing: tool.pricing,
        website: tool.website,
        video_url: tool.videoUrl,
        screenshots: tool.screenshots,
        how_to_use: tool.howToUse,
        pros: tool.pros,
        cons: tool.cons,
        best_for: tool.bestFor,
        category: tool.category,
      }));

      const { error } = await supabase.from('tools').insert(batch);
      
      if (error) {
        console.error('Error inserting batch:', error);
        throw error;
      }

      console.log(`✅ Inserted batch ${i / batchSize + 1} of ${Math.ceil(TOOLS.length / batchSize)}`);
    }

    console.log('✨ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();