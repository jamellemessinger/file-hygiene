import formatBytes from '../utils/formatBytes';
export function displayScanSummary({ counters, analysis }) {
  console.log('\n================ Scan Summary ================\n');

  console.log(`📂 Files Indexed: ${counters.filesIndexed}`);
  console.log(`🗄️  Directories Ignored: ${counters.directoriesSkipped}`);
  console.log(`⚠️  Files Ignored: ${counters.skipped}`);
  console.log(`❌ Inaccessible: ${counters.inaccessible}\n`);

  console.log('----------- Analysis -----------\n');
  console.log(`💾 Large files (>100MB): ${analysis.largeFiles.length}`);
  console.log(`🕰️  Old files (>365 days): ${analysis.oldFiles.length}`);
  console.log(`🔁 Duplicate groups: ${analysis.duplicates.length}\n`);

  // Optional: top 5 largest files
  if (analysis.largeFiles.length > 0) {
    console.log('Top 5 largest files:');
    analysis.largeFiles
      .slice(0, 5)
      .forEach((file) =>
        console.log(
          `- ${file.name} (${formatBytes(file.size)}) - ${file.path}`,
        ),
      );
  }

  console.log('\n============================================\n');
}
