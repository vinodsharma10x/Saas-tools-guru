import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';

const BACKUP_DIR = 'backups';

async function restoreBackup(backupName) {
  try {
    const backupPath = join(BACKUP_DIR, backupName);
    
    // Read state file
    const stateContent = await readFile(
      join(backupPath, 'state.json'),
      'utf-8'
    );
    const state = JSON.parse(stateContent);

    // Restore files
    for (const [file, content] of Object.entries(state)) {
      // Ensure directory exists
      await mkdir(dirname(file), { recursive: true });
      
      // Write file
      await writeFile(file, content);
    }

    console.log(`✅ Restored backup: ${backupName}`);
  } catch (error) {
    console.error('Failed to restore backup:', error);
    throw error;
  }
}

// If script is run directly
if (process.argv[2]) {
  restoreBackup(process.argv[2])
    .catch(error => {
      console.error('Restore failed:', error);
      process.exit(1);
    });
}

export { restoreBackup };