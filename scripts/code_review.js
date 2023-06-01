require('dotenv').config();

const { spawnSync } = require('child_process');
const fs = require('fs');
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;
const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';

// Function to send a message to ChatGPT
async function sendMessage(message) {
  const response = await fetch(CHATGPT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      messages: [{ role: 'system', content: 'You: ' + message }],
      model: 'gpt-3.5-turbo'
    }),
  });

  const data = await response.json();
  console.log(data)
  if (data && data.choices && data.choices.length > 0) {
    return data.choices[0].message.content;
  }

  throw new Error('Unable to get response from ChatGPT');
}

// Function to perform code review
async function performCodeReview(code) {
  const message = `Review code:\n\`\`\`\n${code}\n\`\`\``;
  const response = await sendMessage(message);
  console.log('Code review feedback:\n', response);
}

// Pre-commit hook
function preCommitHook() {
  const result = spawnSync('git', ['diff', '--staged', '--name-only'], { encoding: 'utf-8' });

  if (result.error || result.status !== 0) {
    console.error('An error occurred while running git diff:', result.error);
    process.exit(1);
  }

  const modifiedFiles = result.stdout.trim().split('\n');

  modifiedFiles.forEach(async (file) => {
    const code = await fetchFileContents(file);
    if (code) {
      console.log(`Performing code review for ${file}...`);
      await performCodeReview(code);
    }
  });
}

// Function to fetch the contents of a file
function fetchFileContents(file) {
  try {
    const contents = fs.readFileSync(file, 'utf-8');
    return contents;
  } catch (error) {
    console.error(`Unable to read file contents for ${file}:`, error.message);
    return null;
  }
}

// Run the pre-commit hook
API_KEY ? preCommitHook() : console.log("Automatic review skipped. ChatGPT API KEY not found.");
