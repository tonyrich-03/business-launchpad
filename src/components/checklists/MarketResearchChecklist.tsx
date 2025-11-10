import type { FC } from 'react';
import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  importance: 'critical' | 'important' | 'optional';
}

interface ResearchTool {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'template' | 'framework' | 'tool';
}

interface SurveyTemplate {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  targetAudience: string;
  estimatedTime: string;
}

interface SurveyQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'text' | 'rating' | 'yes_no';
  options?: string[];
  required: boolean;
}

export const MarketResearchChecklist: FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Define target market demographics', completed: false, category: 'Target Audience', importance: 'critical' },
    { id: '2', text: 'Identify primary customer pain points', completed: false, category: 'Customer Needs', importance: 'critical' },
    { id: '3', text: 'Research competitor products and services', completed: false, category: 'Competitive Analysis', importance: 'critical' },
    { id: '4', text: 'Analyze competitor pricing strategies', completed: false, category: 'Competitive Analysis', importance: 'critical' },
    { id: '5', text: 'Study competitor marketing and positioning', completed: false, category: 'Competitive Analysis', importance: 'important' },
    { id: '6', text: 'Conduct customer interviews (5-10 people)', completed: false, category: 'Primary Research', importance: 'critical' },
    { id: '7', text: 'Create and distribute customer survey', completed: false, category: 'Primary Research', importance: 'important' },
    { id: '8', text: 'Analyze industry trends and growth data', completed: false, category: 'Industry Analysis', importance: 'important' },
    { id: '9', text: 'Research market size and potential', completed: false, category: 'Market Size', importance: 'critical' },
    { id: '10', text: 'Identify key market influencers and thought leaders', completed: false, category: 'Market Landscape', importance: 'optional' },
    { id: '11', text: 'Study regulatory requirements and compliance', completed: false, category: 'Legal', importance: 'important' },
    { id: '12', text: 'Analyze seasonal trends and patterns', completed: false, category: 'Market Trends', importance: 'optional' },
    { id: '13', text: 'Research distribution channels in your industry', completed: false, category: 'Distribution', importance: 'important' },
    { id: '14', text: 'Identify potential partnership opportunities', completed: false, category: 'Partnerships', importance: 'optional' },
    { id: '15', text: 'Create customer personas (2-3 detailed profiles)', completed: false, category: 'Target Audience', importance: 'critical' },
    { id: '16', text: 'Map customer journey and touchpoints', completed: false, category: 'Customer Experience', importance: 'important' },
    { id: '17', text: 'Analyze search volume and keyword trends', completed: false, category: 'Digital Research', importance: 'important' },
    { id: '18', text: 'Study social media conversations and sentiment', completed: false, category: 'Digital Research', importance: 'optional' },
    { id: '19', text: 'Validate product-market fit hypothesis', completed: false, category: 'Validation', importance: 'critical' },
    { id: '20', text: 'Document research findings and insights', completed: false, category: 'Documentation', importance: 'important' },
  ]);

  const [showResearchTools, setShowResearchTools] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ResearchTool | null>(null);
  const [surveyResponses, setSurveyResponses] = useState<Record<string, any>>({});

  const researchTools: ResearchTool[] = [
    {
      id: '1',
      title: 'Customer Survey Template',
      description: 'Ready-to-use survey templates for gathering customer insights and feedback',
      category: 'Survey Templates',
      type: 'template'
    },
    {
      id: '2',
      title: 'Competitor Analysis Framework',
      description: 'Structured framework to analyze and compare your competitors systematically',
      category: 'Competitor Analysis',
      type: 'framework'
    },
    {
      id: '3',
      title: 'Customer Interview Guide',
      description: 'Comprehensive guide with questions and best practices for customer interviews',
      category: 'Customer Interviews',
      type: 'template'
    },
    {
      id: '4',
      title: 'Market Sizing Calculator',
      description: 'Tool to estimate your total addressable market and serviceable available market',
      category: 'Market Sizing',
      type: 'tool'
    },
    {
      id: '5',
      title: 'SWOT Analysis Template',
      description: 'Template for conducting Strengths, Weaknesses, Opportunities, Threats analysis',
      category: 'Competitor Analysis',
      type: 'template'
    },
    {
      id: '6',
      title: 'Customer Persona Builder',
      description: 'Interactive tool to create detailed customer personas and profiles',
      category: 'Target Audience',
      type: 'tool'
    },
    {
      id: '7',
      title: 'Industry Research Checklist',
      description: 'Comprehensive checklist for conducting thorough industry research',
      category: 'Industry Analysis',
      type: 'template'
    },
    {
      id: '8',
      title: 'Pricing Strategy Worksheet',
      description: 'Worksheet to analyze and develop your pricing strategy',
      category: 'Competitive Analysis',
      type: 'template'
    }
  ];

  const surveyTemplates: Record<string, SurveyTemplate> = {
    '1': {
      id: '1',
      title: 'Customer Satisfaction Survey',
      description: 'Measure customer satisfaction and identify areas for improvement',
      targetAudience: 'Existing Customers',
      estimatedTime: '5-7 minutes',
      questions: [
        {
          id: 'q1',
          question: 'How satisfied are you with our product/service?',
          type: 'rating',
          required: true
        },
        {
          id: 'q2',
          question: 'What do you like most about our product/service?',
          type: 'text',
          required: true
        },
        {
          id: 'q3',
          question: 'What areas need improvement?',
          type: 'text',
          required: false
        },
        {
          id: 'q4',
          question: 'How likely are you to recommend us to others?',
          type: 'rating',
          required: true
        },
        {
          id: 'q5',
          question: 'What features would you like to see added?',
          type: 'text',
          required: false
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Competitor Analysis Survey',
      description: 'Understand how customers perceive your competitors',
      targetAudience: 'Potential Customers',
      estimatedTime: '8-10 minutes',
      questions: [
        {
          id: 'q1',
          question: 'Which companies do you currently use for similar products/services?',
          type: 'text',
          required: true
        },
        {
          id: 'q2',
          question: 'What do you like about your current provider?',
          type: 'text',
          required: true
        },
        {
          id: 'q3',
          question: 'What frustrates you about your current provider?',
          type: 'text',
          required: true
        },
        {
          id: 'q4',
          question: 'What factors are most important when choosing a provider?',
          type: 'multiple_choice',
          options: ['Price', 'Quality', 'Customer Service', 'Features', 'Reputation'],
          required: true
        },
        {
          id: 'q5',
          question: 'Would you consider switching providers for better features?',
          type: 'yes_no',
          required: true
        }
      ]
    },
    '3': {
      id: '3',
      title: 'Customer Interview Questions',
      description: 'In-depth questions for customer discovery interviews',
      targetAudience: 'Target Customers',
      estimatedTime: '30-45 minutes',
      questions: [
        {
          id: 'q1',
          question: 'Tell me about your current process for [problem area]',
          type: 'text',
          required: true
        },
        {
          id: 'q2',
          question: 'What are the biggest challenges you face?',
          type: 'text',
          required: true
        },
        {
          id: 'q3',
          question: 'How do you currently solve these challenges?',
          type: 'text',
          required: true
        },
        {
          id: 'q4',
          question: 'What would an ideal solution look like?',
          type: 'text',
          required: true
        },
        {
          id: 'q5',
          question: 'How much time/money does this problem cost you?',
          type: 'text',
          required: false
        }
      ]
    },
     '4': {
    id: '4',
    title: 'Market Sizing Calculator',
    description: 'Interactive tool to estimate your total addressable market (TAM), serviceable available market (SAM), and serviceable obtainable market (SOM)',
    targetAudience: 'Business Analysts & Founders',
    estimatedTime: '10-15 minutes',
    questions: [
      {
        id: 'q1',
        question: 'What is the total population in your target geographic market?',
        type: 'text',
        required: true
      },
      {
        id: 'q2',
        question: 'What percentage of this population fits your target customer profile?',
        type: 'text',
        required: true
      },
      {
        id: 'q3',
        question: 'What is the average annual spending for your product/service category?',
        type: 'text',
        required: true
      },
      {
        id: 'q4',
        question: 'What market share do you realistically expect to capture in Year 1?',
        type: 'multiple_choice',
        options: ['Less than 1%', '1-5%', '5-10%', '10-20%', 'More than 20%'],
        required: true
      },
      {
        id: 'q5',
        question: 'What are the key assumptions behind your market size estimates?',
        type: 'text',
        required: true
      },
      {
        id: 'q6',
        question: 'What growth rate do you expect in this market over the next 3 years?',
        type: 'multiple_choice',
        options: ['Declining', '0-5%', '5-10%', '10-20%', 'More than 20%'],
        required: true
      }
    ]
    },
    '5': {
      id: '5',
      title: 'SWOT Analysis Questionnaire',
      description: 'Questions to identify strengths, weaknesses, opportunities, and threats',
      targetAudience: 'Internal Team & Stakeholders',
      estimatedTime: '15-20 minutes',
      questions: [
        {
          id: 'q1',
          question: 'What are our biggest strengths as a company?',
          type: 'text',
          required: true
        },
        {
          id: 'q2',
          question: 'Where do we need improvement?',
          type: 'text',
          required: true
        },
        {
          id: 'q3',
          question: 'What market opportunities are we not pursuing?',
          type: 'text',
          required: true
        },
        {
          id: 'q4',
          question: 'What external threats concern you most?',
          type: 'text',
          required: true
        },
        {
          id: 'q5',
          question: 'How can we leverage our strengths against competitors?',
          type: 'text',
          required: true
        }
      ]
    },
     '6': {
    id: '6',
    title: 'Customer Persona Builder',
    description: 'Create detailed customer profiles to better understand your target audience and their needs',
    targetAudience: 'Marketing Teams & Product Managers',
    estimatedTime: '12-15 minutes',
    questions: [
      {
        id: 'q1',
        question: 'What is the primary demographic profile of your ideal customer?',
        type: 'text',
        required: true
      },
      {
        id: 'q2',
        question: 'What are their primary goals and motivations?',
        type: 'text',
        required: true
      },
      {
        id: 'q3',
        question: 'What are their biggest challenges and pain points?',
        type: 'text',
        required: true
      },
      {
        id: 'q4',
        question: 'Where do they typically seek information and make purchasing decisions?',
        type: 'multiple_choice',
        options: ['Social Media', 'Search Engines', 'Industry Publications', 'Peer Recommendations', 'Trade Shows', 'Other'],
        required: true
      },
      {
        id: 'q5',
        question: 'What is their typical budget range for solutions like yours?',
        type: 'multiple_choice',
        options: ['Under $100', '$100-$500', '$500-$1,000', '$1,000-$5,000', 'Over $5,000'],
        required: true
      },
      {
        id: 'q6',
        question: 'What objections might they have to your product/service?',
        type: 'text',
        required: true
      },
      {
        id: 'q7',
        question: 'What would be their key success metrics with your solution?',
        type: 'text',
        required: true
      }
    ]
    },
    '7': {
      id: '7',
      title: 'Industry Research Survey',
      description: 'Gather insights about industry trends and dynamics',
      targetAudience: 'Industry Experts & Analysts',
      estimatedTime: '10-12 minutes',
      questions: [
        {
          id: 'q1',
          question: 'What are the key trends shaping this industry?',
          type: 'text',
          required: true
        },
        {
          id: 'q2',
          question: 'What is the growth potential for this market?',
          type: 'multiple_choice',
          options: ['High Growth', 'Moderate Growth', 'Stable', 'Declining'],
          required: true
        },
        {
          id: 'q3',
          question: 'What are the major barriers to entry?',
          type: 'text',
          required: true
        },
        {
          id: 'q4',
          question: 'Who are the most innovative companies in this space?',
          type: 'text',
          required: false
        },
        {
          id: 'q5',
          question: 'What regulatory changes could impact this industry?',
          type: 'text',
          required: false
        }
      ]
    },
    '8': {
      id: '8',
      title: 'Pricing Research Survey',
      description: 'Understand customer price sensitivity and preferences',
      targetAudience: 'Potential Customers',
      estimatedTime: '6-8 minutes',
      questions: [
        {
          id: 'q1',
          question: 'What is your expected price range for this type of product/service?',
          type: 'text',
          required: true
        },
        {
          id: 'q2',
          question: 'Which pricing model do you prefer?',
          type: 'multiple_choice',
          options: ['One-time purchase', 'Monthly subscription', 'Annual subscription', 'Pay-per-use'],
          required: true
        },
        {
          id: 'q3',
          question: 'What features would justify a premium price?',
          type: 'text',
          required: true
        },
        {
          id: 'q4',
          question: 'How important is price compared to quality?',
          type: 'rating',
          required: true
        },
        {
          id: 'q5',
          question: 'Would you pay more for better customer support?',
          type: 'yes_no',
          required: true
        }
      ]
    }
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const openResearchTool = (tool: ResearchTool) => {
    setSelectedTool(tool);
  };

  const closeSurvey = () => {
    setSelectedTool(null);
    setSurveyResponses({});
  };

  const handleSurveyResponse = (questionId: string, value: any) => {
    setSurveyResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const submitSurvey = () => {
     // Special handling for Market Sizing Calculator
  if (selectedTool?.id === '4') {
    calculateMarketSize();
    return;
  }
  
  // Special handling for Customer Persona Builder
  if (selectedTool?.id === '6') {
    generatePersonaSummary();
    return;
  }
    // Here you would typically send the responses to your backend
    console.log('Survey responses:', surveyResponses);
    alert('Thank you for completing the survey! Responses have been recorded.');
    closeSurvey();
  };
 const calculateMarketSize = () => {
  // Simple market size calculation based on responses
  const population = parseInt(surveyResponses['q1']) || 0;
  const targetPercentage = parseInt(surveyResponses['q2']) || 0;
  const avgSpending = parseInt(surveyResponses['q3']) || 0;
  
  const tam = population * (targetPercentage / 100) * avgSpending;
  
  alert(`Market Size Calculation Complete!\n\n
    Total Addressable Market (TAM): $${tam.toLocaleString()}\n
    Serviceable Available Market: $${(tam * 0.1).toLocaleString()}\n
    Serviceable Obtainable Market: $${(tam * 0.01).toLocaleString()}\n\n
    These are preliminary estimates. For accurate market sizing, consult industry reports and conduct detailed research.`);
  
  closeSurvey();
};

const generatePersonaSummary = () => {
  const personaData = {
    demographics: surveyResponses['q1'],
    goals: surveyResponses['q2'],
    challenges: surveyResponses['q3'],
    informationSources: surveyResponses['q4'],
    budget: surveyResponses['q5'],
    objections: surveyResponses['q6'],
    successMetrics: surveyResponses['q7']
  };
  
  alert(`Customer Persona Created!\n\n
    Your customer persona has been generated successfully.\n
    Key Insights:\n
    - Demographics: ${personaData.demographics}\n
    - Primary Goals: ${personaData.goals}\n
    - Main Challenges: ${personaData.challenges}\n
    - Budget Range: ${personaData.budget}\n\n
    Use this persona to guide your marketing, product development, and customer acquisition strategies.`);
  
  closeSurvey();
  };
  const renderQuestion = (question: SurveyQuestion) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  required={question.required}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex flex-col items-center space-y-1">
                <input
                  type="radio"
                  name={question.id}
                  value={rating}
                  onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  required={question.required}
                />
                <span className="text-sm text-gray-600">{rating}</span>
              </label>
            ))}
          </div>
        );

      case 'yes_no':
        return (
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={question.id}
                value="yes"
                onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                required={question.required}
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={question.id}
                value="no"
                onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                required={question.required}
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        );

       case 'text':
      // Special rendering for calculator inputs
      if (selectedTool?.id === '4') { // Market Sizing Calculator
        return (
          <div className="space-y-4">
            <input
              type="text"
              onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter numerical value..."
              required={question.required}
            />
            {question.id === 'q1' && (
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                💡 Tip: Use reliable sources like census data, industry reports, or government statistics
              </div>
            )}
            {question.id === 'q2' && (
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                💡 Tip: Consider demographics, income levels, interests, and behaviors that match your ideal customer
              </div>
            )}
          </div>
        );
      }
      // Special rendering for persona builder
      if (selectedTool?.id === '6') { // Customer Persona Builder
        return (
          <div className="space-y-4">
            <textarea
              onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="Provide detailed information..."
              required={question.required}
            />
            {question.id === 'q1' && (
              <div className="bg-purple-50 p-3 rounded-lg text-sm text-purple-700">
                💡 Include: Age, location, income, education, job title, family status
              </div>
            )}
            {question.id === 'q2' && (
              <div className="bg-purple-50 p-3 rounded-lg text-sm text-purple-700">
                💡 Consider: Career aspirations, personal goals, values, what drives their decisions
              </div>
            )}
          </div>
        );
      }
      
      // Default text input
        return (
          <textarea
            onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="Type your answer here..."
            required={question.required}
          />
        );

      default:
        return null;
    }
  };

  const getCurrentSurvey = () => {
    if (!selectedTool) return null;
    return surveyTemplates[selectedTool.id];
  };

  const currentSurvey = getCurrentSurvey();


  const categories = ['Target Audience', 'Customer Needs', 'Competitive Analysis', 'Primary Research', 'Industry Analysis', 'Market Size', 'Market Landscape', 'Legal', 'Market Trends', 'Distribution', 'Partnerships', 'Customer Experience', 'Digital Research', 'Validation', 'Documentation'];
  
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'important': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'optional': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'critical': return 'Critical';
      case 'important': return 'Important';
      case 'optional': return 'Optional';
      default: return importance;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return 'bg-blue-100 text-blue-700';
      case 'framework': return 'bg-purple-100 text-purple-700';
      case 'tool': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template': return '📄';
      case 'framework': return '📊';
      case 'tool': return '🛠️';
      default: return '📁';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Market Research Checklist</h2>
        <p className="text-gray-600 mb-4">Gather essential insights to validate your business idea and understand your market</p>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Research Progress</span>
            <span className="text-sm font-semibold text-indigo-600">{completedCount}/{totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Importance Legend */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Research Priority Guide</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Critical - Do First</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Important - Do Next</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Optional - Do Last</span>
          </div>
        </div>
      </div>

      {/* Research Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {items.filter(item => item.importance === 'critical' && !item.completed).length}
          </div>
          <div className="text-sm text-gray-600">Critical Remaining</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-indigo-600 mb-1">{completedCount}</div>
          <div className="text-sm text-gray-600">Tasks Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {items.filter(item => item.importance === 'critical').length}
          </div>
          <div className="text-sm text-gray-600">Total Critical</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-gray-600">Overall Progress</div>
        </div>
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryItems = items.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;
          
          const completedInCategory = categoryItems.filter(item => item.completed).length;
          const categoryProgress = (completedInCategory / categoryItems.length) * 100;

          return (
            <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                  <span className="text-sm text-indigo-600 font-medium">
                    {completedInCategory}/{categoryItems.length}
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${categoryProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="p-6 space-y-3">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 group ${
                      item.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        item.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                      }`}
                    >
                      {item.completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <span
                        className={`block font-medium transition-all ${
                          item.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {item.text}
                      </span>
                      {!item.completed && (
                        <div className="flex gap-2 mt-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getImportanceColor(item.importance)}`}>
                            {getImportanceLabel(item.importance)}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Research Tools Button */}
                    {!item.completed && (
                      <button
                        onClick={() => setShowResearchTools(true)}
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-2 rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-all duration-200"
                        title="Research tools & templates"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Research Tools Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Market Research Tools</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Access templates for customer surveys, competitor analysis frameworks, and industry research tools to accelerate your market research.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Survey Templates</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Competitor Analysis</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Customer Interviews</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Market Sizing</span>
            </div>
          </div>
          <button 
            onClick={() => setShowResearchTools(true)}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Open Research Tools
          </button>
        </div>
      </div>

      {/* Research Tools Modal */}
      {showResearchTools && !selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Market Research Tools</h2>
                  <p className="text-indigo-100 mt-1">
                    Templates, frameworks, and tools to accelerate your research
                  </p>
                </div>
                <button
                  onClick={() => setShowResearchTools(false)}
                  className="text-white hover:text-indigo-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {researchTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                        {getTypeIcon(tool.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(tool.type)}`}>
                            {tool.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {tool.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {tool.category}
                          </span>
                          <button
                            onClick={() => openResearchTool(tool)}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium"
                          >
                            {tool.type === 'tool' ? 'Open Tool' : 'Use Template'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Survey Template Modal */}
      {selectedTool && currentSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Survey Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{currentSurvey.title}</h2>
                  <p className="text-indigo-100">{currentSurvey.description}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded">Target: {currentSurvey.targetAudience}</span>
                    <span className="bg-white/20 px-2 py-1 rounded">Time: {currentSurvey.estimatedTime}</span>
                  </div>
                </div>
                <button
                  onClick={closeSurvey}
                  className="text-white hover:text-indigo-200 text-2xl ml-4"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Survey Questions */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <form onSubmit={(e) => { e.preventDefault(); submitSurvey(); }} className="space-y-8">
                {currentSurvey.questions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-sm flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <label className="block text-lg font-medium text-gray-900 mb-3">
                          {question.question}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderQuestion(question)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Survey Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeSurvey}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors font-semibold"
                  >
                    Submit Survey
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ... (rest of your existing JSX) */}
    </div>
  );
};

