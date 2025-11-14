import React, { useState } from "react";
import type {
  MarketingGoals,
  MarketingStrategy,
  ContentCalendar,
  SocialMediaPlan,
  EmailCampaign,
  AnalyticsData,
} from "./types";

interface MarketingAnalyticsWizardProps {
  onWizardComplete: (data: {
    goals: MarketingGoals;
    strategy: MarketingStrategy;
    contentCalendar: ContentCalendar;
    socialMediaPlan: SocialMediaPlan;
    emailCampaigns: EmailCampaign[];
    analytics: AnalyticsData;
  }) => void;
}

const MarketingAnalyticsWizard: React.FC<MarketingAnalyticsWizardProps> = ({
  onWizardComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Wizard steps data
  const [wizardData, setWizardData] = useState({
    businessType: "",
    industry: "",
    targetAudience: "",
    budget: "",
    timeline: "",
    primaryGoal: "",
    secondaryGoals: [] as string[],
    channels: [] as string[],
    kpis: [] as string[],
  });

  const steps = [
    {
      number: 1,
      title: "Business Info",
      description: "Tell us about your business",
    },
    {
      number: 2,
      title: "Goals & KPIs",
      description: "Define your marketing objectives",
    },
    {
      number: 3,
      title: "Audience & Budget",
      description: "Identify your target market",
    },
    { number: 4, title: "Channels", description: "Select marketing channels" },
    {
      number: 5,
      title: "Review & Generate",
      description: "Create your marketing plan",
    },
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setWizardData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateMarketingPlan = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const generatedData = {
        goals: {
          primaryGoal:
            wizardData.primaryGoal ||
            "Increase brand awareness and lead generation",
          secondaryGoals:
            wizardData.secondaryGoals.length > 0
              ? wizardData.secondaryGoals
              : [
                  "Improve customer engagement",
                  "Increase website traffic",
                  "Generate qualified leads",
                ],
          targetAudience:
            wizardData.targetAudience ||
            "Small to medium businesses and marketing professionals",
          budget: parseInt(wizardData.budget) || 5000,
          timeline: wizardData.timeline || "3 months",
          kpis:
            wizardData.kpis.length > 0
              ? wizardData.kpis
              : [
                  "Conversion rate",
                  "ROI",
                  "Customer acquisition cost",
                  "Website traffic",
                ],
        },
        strategy: {
          overview: `Comprehensive marketing strategy for ${
            wizardData.businessType || "your business"
          } in the ${wizardData.industry || "specified industry"}`,
          channels: (wizardData.channels.length > 0
            ? wizardData.channels
            : ["Social Media", "Email", "Content Marketing"]
          ).map((channel) => ({
            name: channel,
            description: `${channel} marketing campaign`,
            budget: Math.floor(
              (parseInt(wizardData.budget) || 5000) /
                (wizardData.channels.length || 3)
            ),
            expectedROI: 2.5,
            keyMetrics: ["Engagement", "Conversions", "ROI"],
            contentTypes: ["Educational", "Promotional", "Engaging"],
          })),
          budgetAllocation: (wizardData.channels.length > 0
            ? wizardData.channels
            : ["Social Media", "Email", "Content Marketing"]
          ).map((channel, _, arr) => ({
            channel: channel,
            percentage: Math.floor(100 / arr.length),
            amount: Math.floor(
              (parseInt(wizardData.budget) || 5000) / arr.length
            ),
            rationale: `Allocation for ${channel.toLowerCase()} marketing initiatives`,
          })),
          timeline: [
            {
              phase: "Setup & Planning",
              duration: "2 weeks",
              activities: [
                "Audience research",
                "Content strategy",
                "Channel setup",
              ],
              goals: ["Complete market analysis", "Finalize content calendar"],
            },
            {
              phase: "Execution",
              duration: "2 months",
              activities: [
                "Content creation",
                "Campaign execution",
                "Performance tracking",
              ],
              goals: ["Achieve KPI targets", "Optimize campaigns"],
            },
            {
              phase: "Analysis & Optimization",
              duration: "2 weeks",
              activities: [
                "Performance review",
                "Strategy refinement",
                "ROI analysis",
              ],
              goals: ["Measure success", "Plan next phase"],
            },
          ],
          keyMessages: [
            "Value proposition and unique selling points",
            "Customer benefits and solutions",
            "Call-to-action and next steps",
          ],
          targetPersonas: [
            {
              name: "Marketing Manager",
              demographics: [
                "35-45 years old",
                "College educated",
                "Tech-savvy",
              ],
              painPoints: [
                "Limited resources",
                "Proving ROI",
                "Staying competitive",
              ],
              motivations: ["Career growth", "Business impact", "Innovation"],
              preferredChannels: ["LinkedIn", "Industry blogs", "Webinars"],
            },
          ],
        },
        contentCalendar: {
          months: [
            {
              month: "Next Month",
              themes: [
                "Industry Trends",
                "Product Education",
                "Customer Success",
              ],
              goals: [
                "Increase engagement",
                "Generate leads",
                "Build authority",
              ],
              keyDates: ["Product launch", "Industry event", "Webinar"],
            },
          ],
          themes: [
            {
              theme: "Industry Leadership",
              description: "Establish thought leadership in your industry",
              duration: "4 weeks",
              contentPieces: 12,
            },
          ],
          posts: [
            {
              id: "1",
              title: "Industry Trends Report",
              type: "Blog Post",
              channel: "Website & LinkedIn",
              schedule: new Date(Date.now() + 86400000),
              status: "draft" as const, // Fixed: using literal type
              content: "Comprehensive analysis of current industry trends...",
              metrics: {
                reach: 0,
                engagement: 0,
                clicks: 0,
                conversions: 0,
              },
            },
          ],
        },
        socialMediaPlan: {
          platforms: [
            {
              name: "LinkedIn",
              audience: "Professionals & Businesses",
              contentStrategy: "Thought leadership & industry insights",
              postingFrequency: "3-5 times per week",
              keyMetrics: [
                "Engagement rate",
                "Click-through rate",
                "Lead generation",
              ],
            },
          ],
          postingSchedule: [
            {
              platform: "LinkedIn",
              bestTimes: ["8:00 AM", "12:00 PM", "5:00 PM"],
              frequency: "Weekdays",
              contentTypes: ["Articles", "Case studies", "Industry news"],
            },
          ],
          contentMix: [
            {
              type: "Educational",
              percentage: 40,
              examples: ["How-to guides", "Industry insights", "Tutorials"],
            },
          ],
          growthTargets: {
            followers: 2000,
            engagement: 5.5,
            websiteClicks: 500,
            timeframe: "3 months",
          },
        },
        emailCampaigns: [
          {
            id: "1",
            name: "Welcome Series",
            audience: "New Subscribers",
            subject: "Welcome to Our Community",
            content: "Thank you for joining us...",
            schedule: new Date(),
            goals: ["Onboarding", "Engagement"],
            metrics: {
              openRate: 42.5,
              clickRate: 8.3,
              conversions: 15,
              unsubscribeRate: 0.2,
            },
          },
        ],
        analytics: {
          overview: {
            totalVisitors: 12500,
            conversionRate: 3.2,
            bounceRate: 45.8,
            averageSession: "00:03:20",
            revenue: 28750,
          },
          channelPerformance: [
            {
              channel: "Organic Search",
              visitors: 5200,
              conversions: 198,
              conversionRate: 3.8,
              cost: 0,
              roi: 0,
            },
          ],
          audienceInsights: {
            demographics: [
              { category: "25-34 years", percentage: 45 },
              { category: "35-44 years", percentage: 30 },
            ],
            interests: [
              "Technology",
              "Business Growth",
              "Professional Development",
            ],
            behavior: {
              pagesPerSession: 3.1,
              avgSessionDuration: "00:03:20",
              newVsReturning: { new: 68, returning: 32 },
            },
          },
          recommendations: [
            "Optimize landing page conversion rates",
            "Increase email marketing frequency",
            "Expand social media presence",
          ],
        },
      };

      onWizardComplete(generatedData);
      setIsGenerating(false);
    }, 3000);
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <input
                  type="text"
                  value={wizardData.businessType}
                  onChange={(e) =>
                    handleInputChange("businessType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., SaaS, E-commerce, Agency"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={wizardData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Technology, Retail, Healthcare"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Marketing Goals & KPIs</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Goal
              </label>
              <select
                value={wizardData.primaryGoal}
                onChange={(e) =>
                  handleInputChange("primaryGoal", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select primary goal</option>
                <option value="brand-awareness">Brand Awareness</option>
                <option value="lead-generation">Lead Generation</option>
                <option value="sales-conversion">Sales Conversion</option>
                <option value="customer-retention">Customer Retention</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Performance Indicators (KPIs)
              </label>
              <div className="space-y-2">
                {[
                  "Conversion Rate",
                  "ROI",
                  "Customer Acquisition Cost",
                  "Website Traffic",
                  "Social Engagement",
                ].map((kpi) => (
                  <label key={kpi} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={wizardData.kpis.includes(kpi)}
                      onChange={(e) => {
                        const newKpis = e.target.checked
                          ? [...wizardData.kpis, kpi]
                          : wizardData.kpis.filter((item) => item !== kpi);
                        handleInputChange("kpis", newKpis);
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{kpi}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Audience & Budget</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <textarea
                value={wizardData.targetAudience}
                onChange={(e) =>
                  handleInputChange("targetAudience", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your ideal customers..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget ($)
                </label>
                <input
                  type="number"
                  value={wizardData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  value={wizardData.timeline}
                  onChange={(e) =>
                    handleInputChange("timeline", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select timeline</option>
                  <option value="1 month">1 Month</option>
                  <option value="3 months">3 Months</option>
                  <option value="6 months">6 Months</option>
                  <option value="1 year">1 Year</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Marketing Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Social Media",
                "Email Marketing",
                "Content Marketing",
                "SEO",
                "Paid Ads",
                "Influencer Marketing",
                "Events & Webinars",
                "Partnerships",
              ].map((channel) => (
                <label
                  key={channel}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={wizardData.channels.includes(channel)}
                    onChange={(e) => {
                      const newChannels = e.target.checked
                        ? [...wizardData.channels, channel]
                        : wizardData.channels.filter(
                            (item) => item !== channel
                          );
                      handleInputChange("channels", newChannels);
                    }}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {channel}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review & Generate</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">
                Your Marketing Plan Summary
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Business:</strong>{" "}
                  {wizardData.businessType || "Not specified"}
                </p>
                <p>
                  <strong>Industry:</strong>{" "}
                  {wizardData.industry || "Not specified"}
                </p>
                <p>
                  <strong>Primary Goal:</strong>{" "}
                  {wizardData.primaryGoal || "Not specified"}
                </p>
                <p>
                  <strong>Target Audience:</strong>{" "}
                  {wizardData.targetAudience || "Not specified"}
                </p>
                <p>
                  <strong>Budget:</strong> $
                  {wizardData.budget || "Not specified"}
                </p>
                <p>
                  <strong>Timeline:</strong>{" "}
                  {wizardData.timeline || "Not specified"}
                </p>
                <p>
                  <strong>Channels:</strong>{" "}
                  {wizardData.channels.join(", ") || "None selected"}
                </p>
                <p>
                  <strong>KPIs:</strong>{" "}
                  {wizardData.kpis.join(", ") || "None selected"}
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Ready to generate your comprehensive AI-powered marketing plan?
                This will include: strategy, content calendar, social media
                plan, email campaigns, and analytics dashboard.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {step.number}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-xs font-medium ${
                    currentStep >= step.number
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-400 hidden md:block">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-1/2 top-5 h-0.5 w-full -z-10 ${
                    currentStep > step.number ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-6">{renderStep()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-md ${
            currentStep === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Back
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={generateMarketingPlan}
            disabled={isGenerating}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              isGenerating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isGenerating ? "Generating Plan..." : "Generate Marketing Plan"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MarketingAnalyticsWizard;
