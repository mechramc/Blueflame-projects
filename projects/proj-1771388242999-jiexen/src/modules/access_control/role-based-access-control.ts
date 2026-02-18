// Role-based access control implementation

export enum UserRole {
  Engineer = 'engineer',
  Manager = 'manager',
  Leadership = 'leadership'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export class AccessControl {
  private users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  public canLogIncident(userId: string): boolean {
    return this.hasRole(userId, UserRole.Engineer) || this.hasRole(userId, UserRole.Manager) || this.hasRole(userId, UserRole.Leadership);
  }

  public canAssignOwnership(userId: string): boolean {
    return this.hasRole(userId, UserRole.Manager) || this.hasRole(userId, UserRole.Leadership);
  }

  public canViewMetrics(userId: string): boolean {
    return this.hasRole(userId, UserRole.Engineer) || this.hasRole(userId, UserRole.Manager) || this.hasRole(userId, UserRole.Leadership);
  }

  private hasRole(userId: string, role: UserRole): boolean {
    const user = this.users.find(u => u.id === userId);
    return user ? user.role === role : false;
  }
}
