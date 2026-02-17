import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupTestEnvironment, teardownTestEnvironment } from '../test-utils';
import { simulateWebhookEvent, fetchDashboardData } from '../../src/services/dashboard-service';

// Mock data for testing
const mockProjectData = [
  { id: '1', name: 'Project Alpha', status: 'Active', workItems: 50 },
  { id: '2', name: 'Project Beta', status: 'Completed', workItems: 30 },
  { id: '3', name: 'Project Gamma', status: 'Active', workItems: 20 }
];

describe('Integration Test: Near-Real-Time Updates, Filtering, and Grouping', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment();
  });

  it('should update dashboard data in near-real-time via webhook events', async () => {
    // Simulate a webhook event for a project update
    const updatedProject = { id: '1', name: 'Project Alpha', status: 'On Hold', workItems: 50 };
    await simulateWebhookEvent(updatedProject);

    // Fetch updated dashboard data
    const dashboardData = await fetchDashboardData();

    // Verify the updated project data is reflected
    const project = dashboardData.find((p) => p.id === '1');
    expect(project).toBeDefined();
    expect(project?.status).toBe('On Hold');
  });

  it('should support filtering projects by status', async () => {
    // Fetch dashboard data with filtering applied
    const activeProjects = await fetchDashboardData({ filter: { status: 'Active' } });

    // Verify only active projects are returned
    expect(activeProjects).toHaveLength(2);
    expect(activeProjects.every((p) => p.status === 'Active')).toBe(true);
  });

  it('should support grouping projects by status', async () => {
    // Fetch dashboard data with grouping applied
    const groupedData = await fetchDashboardData({ groupBy: 'status' });

    // Verify projects are grouped correctly
    expect(groupedData).toHaveProperty('Active');
    expect(groupedData).toHaveProperty('Completed');
    expect(groupedData.Active).toHaveLength(2);
    expect(groupedData.Completed).toHaveLength(1);
  });
});