export function findUnusedFiles(files, unusedDays = 180) {
  const cutoff = Date.now() - unusedDays * 24 * 60 * 60 * 1000;

  return files.filter(
    (file) => file.accessedAt && file.accessedAt.getTime() < cutoff,
  );
}
