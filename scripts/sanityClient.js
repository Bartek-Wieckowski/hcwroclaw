require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');

// Dodajmy logi do debugowania
console.log('Environment variables check:');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('Token exists:', !!process.env.SANITY_TOKEN);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error('Missing required environment variables');
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-01-06',
  useCdn: false,
});

module.exports = { client };
