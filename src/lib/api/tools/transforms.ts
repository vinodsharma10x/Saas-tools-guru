import { Tool } from '../../../types/tool';
import type { Database } from '../../../types/supabase';
import { TransformError } from '../errors';

type ToolRow = Database['public']['Tables']['tools']['Row'];
type ToolUpdate = Database['public']['Tables']['tools']['Update'];

export function transformToSupabase(tool: Partial<Tool>): ToolUpdate {
  try {
    return {
      name: tool.name,
      description: tool.description,
      founder: tool.founder,
      website: tool.website,
      video_url: tool.videoUrl,
      how_to_use: tool.howToUse,
      category: tool.category,
      features: tool.features ? JSON.stringify(tool.features) : undefined,
      pros: tool.pros ? JSON.stringify(tool.pros) : undefined,
      cons: tool.cons ? JSON.stringify(tool.cons) : undefined,
      best_for: tool.bestFor ? JSON.stringify(tool.bestFor) : undefined,
      screenshots: tool.screenshots ? JSON.stringify(tool.screenshots) : undefined,
      pricing: tool.pricing ? JSON.stringify(tool.pricing) : undefined,
      logo: tool.logo
    };
  } catch (error) {
    throw new TransformError('Failed to transform tool data for database');
  }
}

export function transformFromSupabase(row: ToolRow): Tool {
  try {
    return {
      id: row.id,
      name: row.name,
      logo: row.logo,
      description: row.description,
      founder: row.founder,
      features: parseJsonField(row.features, []),
      pricing: parseJsonField(row.pricing, {}),
      website: row.website,
      videoUrl: row.video_url,
      screenshots: parseJsonField(row.screenshots, []),
      howToUse: row.how_to_use,
      pros: parseJsonField(row.pros, []),
      cons: parseJsonField(row.cons, []),
      bestFor: parseJsonField(row.best_for, []),
      category: row.category,
    };
  } catch (error) {
    throw new TransformError('Failed to transform database data to tool');
  }
}

function parseJsonField<T>(field: unknown, defaultValue: T): T {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return defaultValue;
    }
  }
  return field as T ?? defaultValue;
}