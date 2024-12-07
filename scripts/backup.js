import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const BACKUP_DIR = 'backups';
const IGNORED_DIRS = ['.git', 'node_modules', 'dist', BACKUP_DIR];
const IGNORED_FILES = ['.DS_Store', '.env'];

async function createBackup(label) {
  try {
    // Create backups directory if it doesn't exist
    await mkdir(BACKUP_DIR, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `backup-${label}-${timestamp}`;
    const backupPath = join(BACKUP_DIR, backupName);
    
    // Create backup directory
    await mkdir(backupPath, { recursive: true });

    // Save project state
    const files = await getAllFiles('.');
    const state = {};

    for (const file of files) {
      const content = await readFile(file, 'utf-8');
      state[file] = content;
    }

    // Write backup file
    await writeFile(
      join(backupPath, 'state.json'),
      JSON.stringify(state, null, 2)
    );

    // Write metadata
    await writeFile(
      join(backupPath, 'metadata.json'),
      JSON.stringify({
        label,
        timestamp: new Date().toISOString(),
        files: Object.keys(state)
      }, null, 2)
    );

    console.log(`✅ Backup created: ${backupName}`);
    return backupName;
  } catch (error) {
    console.error('Failed to create backup:', error);
    throw error;
  }
}

async function getAllFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(dir, entry.name);
    
    // Skip ignored directories and files
    if (IGNORED_DIRS.includes(entry.name) || IGNORED_FILES.includes(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...await getAllFiles(path));
    } else {
      files.push(path);
    }
  }

  return files;
}

// If script is run directly
if (process.argv[2]) {
  createBackup(process.argv[2])
    .catch(error => {
      console.error('Backup failed:', error);
      process.exit(1);
    });
}

export { createBackup };