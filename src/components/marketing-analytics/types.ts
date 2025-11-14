export interface MarketingGoals {
  primaryGoal: string;
  secondaryGoals: string[];
  targetAudience: string;
  budget: number;
  timeline: string;
  kpis: string[];
}

export interface MarketingStrategy {
  overview: string;
  channels: MarketingChannel[];
  budgetAllocation: BudgetAllocation[];
  timeline: TimelinePhase[];
  keyMessages: string[];
  targetPersonas: TargetPersona[];
}

export interface MarketingChannel {
  name: string;
  description: string;
  budget: number;
  expectedROI: number;
  keyMetrics: string[];
  contentTypes: string[];
}

export interface BudgetAllocation {
  channel: string;
  percentage: number;
  amount: number;
  rationale: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  activities: string[];
  goals: string[];
}

export interface TargetPersona {
  name: string;
  demographics: string[];
  painPoints: string[];
  motivations: string[];
  preferredChannels: string[];
}

export interface ContentCalendar {
  months: ContentMonth[];
  themes: ContentTheme[];
  posts: ContentPost[];
}

export interface ContentMonth {
  month: string;
  themes: string[];
  goals: string[];
  keyDates: string[];
}

export interface ContentTheme {
  theme: string;
  description: string;
  duration: string;
  contentPieces: number;
}

export interface ContentPost {
  id: string;
  title: string;
  type: string;
  channel: string;
  schedule: Date;
  status: 'draft' | 'scheduled' | 'published';
  content: string;
  metrics?: PostMetrics;
}

export interface PostMetrics {
  reach: number;
  engagement: number;
  clicks: number;
  conversions: number;
}

export interface SocialMediaPlan {
  platforms: SocialPlatform[];
  postingSchedule: PostingSchedule[];
  contentMix: ContentMix[];
  growthTargets: GrowthTargets;
}

export interface SocialPlatform {
  name: string;
  audience: string;
  contentStrategy: string;
  postingFrequency: string;
  keyMetrics: string[];
}

export interface PostingSchedule {
  platform: string;
  bestTimes: string[];
  frequency: string;
  contentTypes: string[];
}

export interface ContentMix {
  type: string;
  percentage: number;
  examples: string[];
}

export interface GrowthTargets {
  followers: number;
  engagement: number;
  websiteClicks: number;
  timeframe: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  audience: string;
  subject: string;
  content: string;
  schedule: Date;
  goals: string[];
  metrics?: EmailMetrics;
}

export interface EmailMetrics {
  openRate: number;
  clickRate: number;
  conversions: number;
  unsubscribeRate: number;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  channelPerformance: ChannelPerformance[];
  audienceInsights: AudienceInsights;
  recommendations: string[];
}

export interface AnalyticsOverview {
  totalVisitors: number;
  conversionRate: number;
  bounceRate: number;
  averageSession: string;
  revenue: number;
}

export interface ChannelPerformance {
  channel: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  cost: number;
  roi: number;
}

export interface AudienceInsights {
  demographics: DemographicData[];
  interests: string[];
  behavior: BehaviorData;
}

export interface DemographicData {
  category: string;
  percentage: number;
}

export interface BehaviorData {
  pagesPerSession: number;
  avgSessionDuration: string;
  newVsReturning: { new: number; returning: number };
}

export interface CompetitorAnalysis {
  competitors: Competitor[];
  marketGap: string;
  opportunities: string[];
  threats: string[];
  recommendations: string[];
}

export interface Competitor {
  name: string;
  strengths: string[];
  weaknesses: string[];
  strategy: string;
  marketShare: number;
}