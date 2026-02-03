import getDirectory from './cli/getDirectory.js';
import scanDirectory from './cli/scanDirectory.js';

async function main() {
  try {
    const directory = await getDirectory();
    const { files, counters } = await scanDirectory(directory);

    // console.log(`Found ${files.length} files`);
    // console.log('\nPreview:\n\n', files.slice(0, 3));
    console.log(`\nScan complete!`);
    console.log(`Files found: ${files.length}`);
    console.log(`Files skipped (ignored/hidden): ${counters.skipped}`);
    console.log(
      `Directories skipped (ignored/hidden): ${counters.directoriesSkipped}`,
    );
    console.log(
      `Files inaccessible (permission errors): ${counters.inaccessible}`,
    );
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
