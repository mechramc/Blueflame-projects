// Unit tests for role-based access control
import { AccessControl, UserRole } from './role-based-access-control';

describe('AccessControl', () => {
  let accessControl: AccessControl;
  const users = [
    { id: '1', name: 'Alice', role: UserRole.Engineer },
    { id: '2', name: 'Bob', role: UserRole.Manager },
    { id: '3', name: 'Charlie', role: UserRole.Leadership }
  ];

  beforeEach(() => {
    accessControl = new AccessControl(users);
  });

  test('Engineer can log incident', () => {
    expect(accessControl.canLogIncident('1')).toBe(true);
  });

  test('Manager can log incident', () => {
    expect(accessControl.canLogIncident('2')).toBe(true);
  });

  test('Leadership can log incident', () => {
    expect(accessControl.canLogIncident('3')).toBe(true);
  });

  test('Engineer cannot assign ownership', () => {
    expect(accessControl.canAssignOwnership('1')).toBe(false);
  });

  test('Manager can assign ownership', () => {
    expect(accessControl.canAssignOwnership('2')).toBe(true);
  });

  test('Leadership can assign ownership', () => {
    expect(accessControl.canAssignOwnership('3')).toBe(true);
  });

  test('All roles can view metrics', () => {
    expect(accessControl.canViewMetrics('1')).toBe(true);
    expect(accessControl.canViewMetrics('2')).toBe(true);
    expect(accessControl.canViewMetrics('3')).toBe(true);
  });
});
