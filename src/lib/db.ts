import Database from 'better-sqlite3';
import { Tool } from '../types/tool';

const db = new Database('tools.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS tools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    description TEXT NOT NULL,
    founder TEXT NOT NULL,
    features TEXT NOT NULL,
    pricing TEXT NOT NULL,
    website TEXT NOT NULL,
    videoUrl TEXT,
    screenshots TEXT NOT NULL,
    howToUse TEXT NOT NULL,
    pros TEXT NOT NULL,
    cons TEXT NOT NULL,
    bestFor TEXT NOT NULL,
    category TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
  CREATE INDEX IF NOT EXISTS idx_tools_name ON tools(name);
`);

export function getAllTools(): Tool[] {
  const stmt = db.prepare('SELECT * FROM tools ORDER BY createdAt DESC');
  const tools = stmt.all();
  return tools.map(parseTool);
}

export function getToolById(id: string): Tool | null {
  const stmt = db.prepare('SELECT * FROM tools WHERE id = ?');
  const tool = stmt.get(id);
  return tool ? parseTool(tool) : null;
}

export function getToolsByCategory(category: string): Tool[] {
  const stmt = db.prepare('SELECT * FROM tools WHERE category = ? ORDER BY createdAt DESC');
  const tools = stmt.all(category);
  return tools.map(parseTool);
}

export function searchTools(query: string): Tool[] {
  const stmt = db.prepare(`
    SELECT * FROM tools 
    WHERE name LIKE ? OR description LIKE ? 
    ORDER BY createdAt DESC
  `);
  const searchPattern = `%${query}%`;
  const tools = stmt.all(searchPattern, searchPattern);
  return tools.map(parseTool);
}

function parseTool(tool: any): Tool {
  return {
    ...tool,
    features: JSON.parse(tool.features),
    screenshots: JSON.parse(tool.screenshots),
    pros: JSON.parse(tool.pros),
    cons: JSON.parse(tool.cons),
    bestFor: JSON.parse(tool.bestFor),
    pricing: JSON.parse(tool.pricing),
  };
}