import getDirectory from './cli/getDirectory.js';
import scanDirectory from './cli/scanDirectory.js';

const directory = await getDirectory();
const files = await scanDirectory(directory);

console.log(`\nFound ${files.length} files.`);
