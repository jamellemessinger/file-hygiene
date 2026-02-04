const MB = 1024 * 1024;

export function findLargeFiles(files, minSizeMB = 100) {
  const minSizeBytes = minSizeMB * MB;

  return files
    .filter((file) => file.size >= minSizeBytes)
    .sort((a, b) => b.size - a.size);
}
