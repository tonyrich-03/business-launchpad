export interface WebsiteRequirements {
  businessType: string;
  industry: string;
  targetAudience: string;
  primaryGoal: string;
  stylePreferences: string[];
  features: string[];
  contentNeeds: string[];
}

export interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  style: string;
  previewImage: string;
  colors: string[];
  features: string[];
  recommendedFor: string[];
}

export interface WebsiteContent {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
  };
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  contact: {
    title: string;
    description: string;
  };
}

export interface DesignConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  spacing: string;
  borderRadius: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  metaTags: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
}

export interface WebsiteProject {
  id: string;
  name: string;
  template: WebsiteTemplate;
  content: WebsiteContent;
  design: DesignConfig;
  seo: SEOConfig;
  components: string[];
  createdAt: Date;
  status: 'draft' | 'building' | 'ready' | 'deployed';
}