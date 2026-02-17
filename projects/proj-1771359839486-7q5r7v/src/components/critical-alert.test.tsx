import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CriticalAlert } from './critical-alert';

describe('CriticalAlert', () => {
  it('renders critical alert with message and acknowledge button', () => {
    const mockAcknowledge = jest.fn();
    render(
      <CriticalAlert
        message="Critical issue occurred!"
        onAcknowledge={mockAcknowledge}
        isCritical={true}
      />
    );

    expect(screen.getByText('Critical issue occurred!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /acknowledge/i })).toBeInTheDocument();
  });

  it('calls onAcknowledge when the button is clicked', () => {
    const mockAcknowledge = jest.fn();
    render(
      <CriticalAlert
        message="Critical issue occurred!"
        onAcknowledge={mockAcknowledge}
        isCritical={true}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /acknowledge/i }));
    expect(mockAcknowledge).toHaveBeenCalledTimes(1);
  });

  it('applies critical styling when isCritical is true', () => {
    const { container } = render(
      <CriticalAlert
        message="Critical issue occurred!"
        onAcknowledge={() => {}}
        isCritical={true}
      />
    );

    expect(container.firstChild).toHaveClass('critical');
  });

  it('does not apply critical styling when isCritical is false', () => {
    const { container } = render(
      <CriticalAlert
        message="Non-critical issue."
        onAcknowledge={() => {}}
        isCritical={false}
      />
    );

    expect(container.firstChild).not.toHaveClass('critical');
  });
});