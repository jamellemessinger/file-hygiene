export function findOldFiles(files, olderThanDays = 365) {
  const cutoff = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;

  return files.filter((file) => file.modifiedAt.getTime() < cutoff);
}
