// OwnershipManager class to handle incident ownership assignment and reassignments

export class OwnershipManager {
    private ownershipHistory: Array<{ incidentId: string; previousOwner: string; newOwner: string; timestamp: Date }> = [];

    constructor() {}

    public assignOwnership(incidentId: string, newOwner: string, previousOwner: string): void {
        this.ownershipHistory.push({ incidentId, previousOwner, newOwner, timestamp: new Date() });
        // Logic to assign ownership in the system
    }

    public getOwnershipHistory(incidentId: string): Array<{ previousOwner: string; newOwner: string; timestamp: Date }> {
        return this.ownershipHistory.filter(entry => entry.incidentId === incidentId);
    }

    // New method to validate ownership assignment
    public validateOwnershipAssignment(incidentId: string, newOwner: string): boolean {
        const history = this.getOwnershipHistory(incidentId);
        return history.length === 0 || history[history.length - 1].newOwner !== newOwner;
    }
}