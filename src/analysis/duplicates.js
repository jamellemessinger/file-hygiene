import { findDuplicateGroups } from '../utils/findDuplicateGroups.js';
import { hashFile } from '../utils/hashFiles.js';

export async function findDuplicates(files) {
  const sizeGroups = findDuplicateGroups(files);
  const duplicates = [];

  for (const group of sizeGroups) {
    const hashMap = new Map();

    for (const file of group) {
      const hash = await hashFile(file.path);

      if (!hashMap.has(hash)) {
        hashMap.set(hash, []);
      }
      hashMap.get(hash).push(file);
    }

    for (const matches of hashMap.values()) {
      if (matches.length > 1) {
        duplicates.push(matches);
      }
    }
  }

  return duplicates;
}
