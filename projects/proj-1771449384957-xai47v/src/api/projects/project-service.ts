// project-service.ts
export class ProjectService {
  public async reassignProjects(oldUserId: string, newUserId: string): Promise<void> {
    // Logic to reassign projects from oldUserId to newUserId
  }

  public async deleteProjectsByUserId(userId: string): Promise<void> {
    // Logic to delete projects associated with userId
  }
}
