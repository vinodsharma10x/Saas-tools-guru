import { supabase } from '../supabase';
import { Tool } from '../../types/tool';
import { toolSchema } from '../validations/tool';

export async function getAllTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error('Failed to fetch tools');
  
  return data.map(tool => {
    try {
      const parsed = toolSchema.parse(tool);
      return parseTool(parsed);
    } catch (err) {
      console.error('Tool validation error:', err);
      return null;
    }
  }).filter((tool): tool is Tool => tool !== null);
}

export async function getToolById(id: string): Promise<Tool | null> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error('Failed to fetch tool');
  if (!data) return null;

  try {
    const parsed = toolSchema.parse(data);
    return parseTool(parsed);
  } catch (err) {
    console.error('Tool validation error:', err);
    return null;
  }
}

export async function updateTool(id: string, updates: Partial<Tool>): Promise<Tool> {
  // Transform the data to match Supabase column names
  const supabaseData = {
    name: updates.name,
    description: updates.description,
    founder: updates.founder,
    website: updates.website,
    video_url: updates.videoUrl,
    how_to_use: updates.howToUse,
    category: updates.category,
    features: updates.features,
    pros: updates.pros,
    cons: updates.cons,
    best_for: updates.bestFor,
    screenshots: updates.screenshots,
    pricing: updates.pricing,
    logo: updates.logo,
    updated_at: new Date().toISOString()
  };

  // First update the tool
  const { error: updateError } = await supabase
    .from('tools')
    .update(supabaseData)
    .eq('id', id);

  if (updateError) {
    console.error('Error updating tool:', updateError);
    throw new Error('Failed to update tool');
  }

  // Then fetch the updated tool
  const { data: updatedTool, error: fetchError } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !updatedTool) {
    console.error('Error fetching updated tool:', fetchError);
    throw new Error('Failed to fetch updated tool');
  }

  return parseTool(updatedTool);
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Failed to fetch tools by category');

  return data.map(tool => {
    try {
      const parsed = toolSchema.parse(tool);
      return parseTool(parsed);
    } catch (err) {
      console.error('Tool validation error:', err);
      return null;
    }
  }).filter((tool): tool is Tool => tool !== null);
}

export async function searchTools(query: string): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Failed to search tools');

  return data.map(tool => {
    try {
      const parsed = toolSchema.parse(tool);
      return parseTool(parsed);
    } catch (err) {
      console.error('Tool validation error:', err);
      return null;
    }
  }).filter((tool): tool is Tool => tool !== null);
}

function parseTool(tool: any): Tool {
  return {
    id: tool.id,
    name: tool.name,
    logo: tool.logo,
    description: tool.description,
    founder: tool.founder,
    features: Array.isArray(tool.features) ? tool.features : [],
    pricing: typeof tool.pricing === 'object' ? tool.pricing : {},
    website: tool.website,
    videoUrl: tool.video_url || tool.videoUrl || null,
    screenshots: Array.isArray(tool.screenshots) ? tool.screenshots : [],
    howToUse: tool.how_to_use || tool.howToUse || '',
    pros: Array.isArray(tool.pros) ? tool.pros : [],
    cons: Array.isArray(tool.cons) ? tool.cons : [],
    bestFor: Array.isArray(tool.best_for || tool.bestFor) ? (tool.best_for || tool.bestFor) : [],
    category: tool.category,
  };
}