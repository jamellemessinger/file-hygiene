import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export default async function getDirectory() {
  const rl = readline.createInterface({ input, output });

  try {
    const answer = await rl.question(
      '\nEnter a directory to scan (press Enter for current directory): ',
    );

    const cleaned = answer.trim().replace(/^["']|["']$/g, '');
    const directory = cleaned || process.cwd();

    console.log('\nYou chose:', directory);
    return directory;
  } finally {
    rl.close();
  }
}
