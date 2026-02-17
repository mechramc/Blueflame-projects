export interface Decision {
  id: string;
  title: string;
  description: string;
  decisionDate: string; // ISO 8601 format
  decisionMaker: string;
  outcome: string;
  narrative?: string; // Optional freeform narrative
}