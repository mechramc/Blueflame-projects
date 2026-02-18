// Unit tests for OwnershipManager class
import { OwnershipManager } from './ownership-manager';

describe('OwnershipManager', () => {
    let ownershipManager: OwnershipManager;

    beforeEach(() => {
        ownershipManager = new OwnershipManager();
    });

    test('should assign ownership and track history', () => {
        const incidentId = 'incident-1';
        const previousOwner = 'userA';
        const newOwner = 'userB';

        ownershipManager.assignOwnership(incidentId, newOwner, previousOwner);

        const history = ownershipManager.getOwnershipHistory(incidentId);
        expect(history).toHaveLength(1);
        expect(history[0]).toEqual({ incidentId, previousOwner, newOwner, timestamp: expect.any(Date) });
    });

    test('should validate ownership assignment', () => {
        const incidentId = 'incident-1';
        const previousOwner = 'userA';
        const newOwner = 'userB';

        ownershipManager.assignOwnership(incidentId, newOwner, previousOwner);

        expect(ownershipManager.validateOwnershipAssignment(incidentId, 'userC')).toBe(true);
        expect(ownershipManager.validateOwnershipAssignment(incidentId, newOwner)).toBe(false);
    });
});