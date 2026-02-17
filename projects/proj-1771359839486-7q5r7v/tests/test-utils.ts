import { setupDatabase, teardownDatabase } from '../src/services/database';

export async function setupTestEnvironment() {
  await setupDatabase();
  // Additional setup logic if needed
}

export async function teardownTestEnvironment() {
  await teardownDatabase();
  // Additional teardown logic if needed
}