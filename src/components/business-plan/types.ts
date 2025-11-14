export interface BusinessIdea {
  title: string;
  description: string;
  industry: string;
  targetAudience: string;
  uniqueValue: string;
}

export interface MarketResearch {
  marketSize: string;
  trends: string[];
  competitors: Competitor[];
  opportunities: string[];
  threats: string[];
}

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export interface FinancialProjection {
  startupCosts: number;
  monthlyExpenses: number;
  projectedRevenue: number[];
  breakEvenAnalysis: string;
}

export interface MarketingStrategy {
  channels: string[];
  budget: number;
  timeline: string[];
  keyMetrics: string[];
}

export interface BusinessPlan {
  executiveSummary: string;
  businessIdea: BusinessIdea;
  marketResearch: MarketResearch;
  financialProjections: FinancialProjection;
  marketingStrategy: MarketingStrategy;
  createdAt: Date;
}