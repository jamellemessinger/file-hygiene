import getDirectory from './cli/getDirectory.js';
import scanDirectory from './scanner/scanDirectory.js';
import {
  findLargeFiles,
  findOldFiles,
  findDuplicates,
} from './analysis/index.js';
import { displayScanSummary } from './output/cliFormatter.js';

async function main() {
  try {
    const directory = await getDirectory();
    const { files, counters } = await scanDirectory(directory);
    const largeFiles = findLargeFiles(files);
    const oldFiles = findOldFiles(files);
    const duplicates = await findDuplicates(files);

    const analysisResults = {
      largeFiles,
      oldFiles,
      duplicates,
    };

    displayScanSummary({
      counters: { ...counters, filesIndexed: files.length },
      analysis: analysisResults,
    });

    // // console.log(`Found ${files.length} files`);
    // // console.log('\nPreview:\n\n', files.slice(0, 3));
    // console.log(`\nScan complete!`);
    // console.log(`Files found: ${files.length}`);
    // console.log(`Files skipped (ignored/hidden): ${counters.skipped}`);
    // console.log(
    //   `Directories skipped (ignored/hidden): ${counters.directoriesSkipped}`,
    // );
    // console.log(
    //   `Files inaccessible (permission errors): ${counters.inaccessible}`,
    // );

    // console.log(`\nLarge files: ${largeFiles.length}`);
    // console.log(`Old files: ${oldFiles.length}`);
    // console.log(`Duplicate groups: ${duplicates.length}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
