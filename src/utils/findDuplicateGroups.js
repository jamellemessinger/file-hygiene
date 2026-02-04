export function findDuplicateGroups(files) {
  const map = new Map();

  for (const file of files) {
    if (!map.has(file.size)) {
      map.set(file.size, []);
    }
    map.get(file.size).push(file);
  }

  return [...map.values()].filter((group) => group.length > 1);
}
