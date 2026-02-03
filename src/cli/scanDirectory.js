import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { minimatch } from 'minimatch';

function loadIgnorePatterns(directory) {
  const ignoreFile = path.join(directory, '.file-hygiene-ignore');
  if (!existsSync(ignoreFile)) return [];
  const content = readFileSync(ignoreFile, 'utf-8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

function shouldIgnore(entryName, ignorePatterns) {
  // skip hidden files/folders
  if (entryName.startsWith('.')) return true;

  // skip node_modules
  if (entryName === 'node_modules') return true;

  // skip custom ignore patterns
  return ignorePatterns.some((pattern) => minimatch(entryName, pattern));
}

/**
 * Scans a directory recursively and tracks skipped/inaccessible counts.
 * @param {string} dirPath
 * @param {Array} files
 * @param {Array} ignorePatterns
 * @param {Object} counters - { skipped: 0, inaccessible: 0, directoriesSkipped: 0 }
 */
export default async function scanDirectory(
  dirPath,
  files = [],
  ignorePatterns = null,
  counters = { skipped: 0, inaccessible: 0, directoriesSkipped: 0 },
) {
  if (!ignorePatterns) ignorePatterns = loadIgnorePatterns(dirPath);

  let entries;
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch (err) {
    console.warn(`Skipping directory ${dirPath}: ${err.message}`);
    counters.directoriesSkipped++;
    return { files, counters };
  }

  for (const entry of entries) {
    if (shouldIgnore(entry.name, ignorePatterns)) {
      if (entry.isDirectory()) counters.directoriesSkipped++;
      else counters.skipped++;
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await scanDirectory(fullPath, files, ignorePatterns, counters);
    } else if (entry.isFile()) {
      try {
        const stats = await fs.stat(fullPath);
        files.push({
          name: entry.name,
          path: fullPath,
          directory: dirPath,
          extension: path.extname(entry.name),
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
        });
      } catch (err) {
        console.warn(`Skipping file ${fullPath}: ${err.message}`);
        counters.inaccessible++;
      }
    }
  }

  return { files, counters };
}
