import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const toolsPath = join(__dirname, '../src/data/tools.js');

// Dynamically import tools data
const { TOOLS } = await import(toolsPath);

const db = new Database('tools.db');

// Clear existing data
db.exec('DROP TABLE IF EXISTS tools');

// Create table
db.exec(`
  CREATE TABLE tools (
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
  CREATE INDEX idx_tools_category ON tools(category);
  CREATE INDEX idx_tools_name ON tools(name);
`);

// Insert tools
const insert = db.prepare(`
  INSERT INTO tools (
    id, name, logo, description, founder, features, pricing, website,
    videoUrl, screenshots, howToUse, pros, cons, bestFor, category,
    createdAt, updatedAt
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const now = new Date().toISOString();

for (const tool of TOOLS) {
  insert.run(
    tool.id,
    tool.name,
    tool.logo,
    tool.description,
    tool.founder,
    JSON.stringify(tool.features),
    JSON.stringify(tool.pricing),
    tool.website,
    tool.videoUrl || null,
    JSON.stringify(tool.screenshots),
    tool.howToUse,
    JSON.stringify(tool.pros),
    JSON.stringify(tool.cons),
    JSON.stringify(tool.bestFor),
    tool.category,
    now,
    now
  );
}

console.log('Database setup complete!');