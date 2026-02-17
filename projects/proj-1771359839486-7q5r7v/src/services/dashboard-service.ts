import { database } from './database';

export async function simulateWebhookEvent(updatedProject: { id: string; name: string; status: string; workItems: number }) {
  // Simulate updating the project in the database
  await database.update('projects', updatedProject.id, updatedProject);
}

export async function fetchDashboardData(options?: { filter?: { status?: string }; groupBy?: string }) {
  const projects = await database.getAll('projects');

  if (options?.filter?.status) {
    return projects.filter((project) => project.status === options.filter.status);
  }

  if (options?.groupBy) {
    return projects.reduce((grouped, project) => {
      const key = project[options.groupBy as keyof typeof project];
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(project);
      return grouped;
    }, {} as Record<string, typeof projects>);
  }

  return projects;
}