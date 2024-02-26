process.stdout.write('Welcome to Holberton School, what is your name?\n');

let userInput = '';

process.stdin.on('data', (chunk) => {
  userInput += chunk.toString();

  // Check if the user pressed Enter (newline)
  if (userInput.includes('\n')) {
    const name = userInput.trim(); // Remove leading/trailing whitespaces
    process.stdout.write(`Your name is: ${name}\n`);
    userInput = ''; // Reset for the next input
    process.stdout.write('Welcome to Holberton School, what is your name?\n');
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});

// Handle Ctrl+C to gracefully exit
process.on('SIGINT', () => {
  process.stdout.write('This important software is now closing\n');
  process.exit(0);
});

