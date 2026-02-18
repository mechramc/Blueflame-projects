// Incident Logging Module

import { Result, ok, err } from 'neverthrow';

export interface Incident {
  id: string;
  severity: string;
  service: string;
  externalReferenceId: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

export class IncidentLogger {
  private incidents: Incident[] = [];

  public logIncident(severity: string, service: string, externalReferenceId: string, source: string): Result<Incident, string> {
    if (!severity || !service || !externalReferenceId || !source) {
      return err('All fields are required.');
    }

    const incident: Incident = {
      id: this.generateId(),
      severity,
      service,
      externalReferenceId,
      source,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.incidents.push(incident);
    return ok(incident);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
