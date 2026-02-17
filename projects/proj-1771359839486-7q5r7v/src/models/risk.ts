export interface Risk {
  id: string;
  title: string;
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigationPlan: string;
  narrative?: string; // Optional freeform narrative
}