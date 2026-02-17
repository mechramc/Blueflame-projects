export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  owner: string;
  resolutionPlan: string;
  narrative?: string; // Optional freeform narrative
}