import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../src/sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token, // Upewnij się, że masz token w env.ts
  useCdn: false,
});

// ... reszta kodu bez zmian
