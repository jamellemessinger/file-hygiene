import getDirectory from './cli/getDirectory.js';
import scanDirectory from './cli/scanDirectory.js';

async function main() {
  try {
    const directory = await getDirectory();
    const files = await scanDirectory(directory);

    console.log(`Found ${files.length} files`);
    console.log('\nPreview:\n\n', files.slice(0, 3)); // preview first 3 files
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
