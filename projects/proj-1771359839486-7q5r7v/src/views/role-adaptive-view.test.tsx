import React from 'react';
import { render, screen } from '@testing-library/react';
import { RoleAdaptiveView } from './role-adaptive-view';
import * as useUserRoleHook from '../hooks/useUserRole';

describe('RoleAdaptiveView', () => {
  it('renders ProjectManagerView for ProjectManager role', () => {
    jest.spyOn(useUserRoleHook, 'useUserRole').mockReturnValue('ProjectManager');
    render(<RoleAdaptiveView />);
    expect(screen.getByText('Project Manager View')).toBeInTheDocument();
  });

  it('renders ExecutiveView for Executive role', () => {
    jest.spyOn(useUserRoleHook, 'useUserRole').mockReturnValue('Executive');
    render(<RoleAdaptiveView />);
    expect(screen.getByText('Executive View')).toBeInTheDocument();
  });

  it('renders EngineerView for Engineer role', () => {
    jest.spyOn(useUserRoleHook, 'useUserRole').mockReturnValue('Engineer');
    render(<RoleAdaptiveView />);
    expect(screen.getByText('Engineer View')).toBeInTheDocument();
  });

  it('renders loading state when user role is not yet determined', () => {
    jest.spyOn(useUserRoleHook, 'useUserRole').mockReturnValue(null);
    render(<RoleAdaptiveView />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders fallback for unrecognized role', () => {
    jest.spyOn(useUserRoleHook, 'useUserRole').mockReturnValue('UnknownRole' as any);
    render(<RoleAdaptiveView />);
    expect(screen.getByText('Role not recognized')).toBeInTheDocument();
  });
});