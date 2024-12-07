import { Tool } from '../../../types/tool';
import * as db from './db';
import { transformToSupabase, transformFromSupabase } from './transforms';
import { ValidationError } from '../errors';

export async function updateToolInDb(id: string, updates: Partial<Tool>): Promise<Tool> {
  if (!id) {
    throw new ValidationError('Tool ID is required');
  }

  // First verify the tool exists
  await db.fetchTool(id);

  // Transform and update
  const supabaseData = transformToSupabase(updates);
  const updatedRow = await db.updateTool(id, supabaseData);
  
  return transformFromSupabase(updatedRow);
}

export async function fetchAllTools(): Promise<Tool[]> {
  const rows = await db.fetchAllTools();
  return rows.map(transformFromSupabase);
}

export async function fetchToolById(id: string): Promise<Tool | null> {
  try {
    const row = await db.fetchTool(id);
    return transformFromSupabase(row);
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return null;
    }
    throw error;
  }
}

export async function fetchToolsByCategory(category: string): Promise<Tool[]> {
  const rows = await db.fetchToolsByCategory(category);
  return rows.map(transformFromSupabase);
}

export async function fetchToolsBySearch(query: string): Promise<Tool[]> {
  const rows = await db.searchTools(query);
  return rows.map(transformFromSupabase);
}