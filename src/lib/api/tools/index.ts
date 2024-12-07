import { Tool } from '../../../types/tool';
import {
  fetchAllTools,
  fetchToolById,
  fetchToolsByCategory,
  fetchToolsBySearch,
  updateToolInDb
} from './queries';

export async function getAllTools(): Promise<Tool[]> {
  return fetchAllTools();
}

export async function getToolById(id: string): Promise<Tool | null> {
  return fetchToolById(id);
}

export async function updateTool(id: string, updates: Partial<Tool>): Promise<Tool> {
  return updateToolInDb(id, updates);
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  return fetchToolsByCategory(category);
}

export async function searchTools(query: string): Promise<Tool[]> {
  return fetchToolsBySearch(query);
}