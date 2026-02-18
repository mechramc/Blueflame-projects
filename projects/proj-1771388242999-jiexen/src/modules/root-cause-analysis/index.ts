// Root Cause Analysis Module

export type RootCauseCategory = 'Human Error' | 'System Failure' | 'Process Issue' | 'Other';

export interface RootCauseAnalysis {
    category: RootCauseCategory;
    explanation?: string;
    tags: string[];
}

export class RootCauseAnalysisModule {
    private analyses: RootCauseAnalysis[] = [];

    public addAnalysis(analysis: RootCauseAnalysis): void {
        this.analyses.push(analysis);
    }

    public getAnalyses(): RootCauseAnalysis[] {
        return this.analyses;
    }

    public filterByTag(tag: string): RootCauseAnalysis[] {
        return this.analyses.filter(analysis => analysis.tags.includes(tag));
    }
}
