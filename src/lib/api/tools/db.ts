import { supabase } from '../../supabase';
import { DatabaseError } from '../errors';
import type { Database } from '../../../types/supabase';

type ToolRow = Database['public']['Tables']['tools']['Row'];
type ToolUpdate = Database['public']['Tables']['tools']['Update'];

export async function fetchTool(id: string): Promise<ToolRow> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Database error fetching tool:', error);
    throw new DatabaseError(`Failed to fetch tool: ${error.message}`);
  }

  if (!data) {
    throw new DatabaseError('Tool not found');
  }

  return data;
}

export async function updateTool(id: string, updates: ToolUpdate): Promise<ToolRow> {
  const { data, error } = await supabase
    .from('tools')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Database error updating tool:', error);
    throw new DatabaseError(`Failed to update tool: ${error.message}`);
  }

  if (!data) {
    throw new DatabaseError('No data returned after update');
  }

  return data;
}

export async function fetchAllTools(): Promise<ToolRow[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database error fetching tools:', error);
    throw new DatabaseError('Failed to fetch tools');
  }

  return data;
}

export async function fetchToolsByCategory(category: string): Promise<ToolRow[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database error fetching tools by category:', error);
    throw new DatabaseError('Failed to fetch tools by category');
  }

  return data;
}

export async function searchTools(query: string): Promise<ToolRow[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database error searching tools:', error);
    throw new DatabaseError('Failed to search tools');
  }

  return data;
}