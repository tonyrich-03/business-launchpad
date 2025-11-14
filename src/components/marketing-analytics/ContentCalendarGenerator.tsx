import React, { useState } from 'react';
import type { MarketingStrategy, ContentCalendar } from './types';

interface ContentCalendarGeneratorProps {
  marketingStrategy: MarketingStrategy;
  onCalendarGenerated: (calendar: ContentCalendar) => void;
}

const ContentCalendarGenerator: React.FC<ContentCalendarGeneratorProps> = ({
  marketingStrategy,
  onCalendarGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCalendar, setGeneratedCalendar] = useState<ContentCalendar | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const generateCalendar = async () => {
    setIsGenerating(true);
    
    // Simulate AI content calendar generation
    setTimeout(() => {
      const mockCalendar: ContentCalendar = {
        months: [
          {
            month: 'January 2024',
            themes: ['New Year Transformation', 'Goal Setting', 'Industry Trends'],
            goals: ['Increase brand awareness by 25%', 'Grow email list by 500 subscribers'],
            keyDates: ['New Year Launch (Jan 2)', 'Industry Report Release (Jan 15)', 'Webinar (Jan 25)']
          },
          {
            month: 'February 2024',
            themes: ['Relationship Building', 'Valentine Specials', 'Customer Success'],
            goals: ['Boost engagement by 40%', 'Generate 50 qualified leads'],
            keyDates: ['Customer Appreciation Week (Feb 7-14)', 'Case Study Release (Feb 20)']
          },
          {
            month: 'March 2024',
            themes: ['Spring Refresh', 'Quarterly Planning', 'Educational Content'],
            goals: ['Drive 1000 website visits', 'Convert 5% of leads to customers'],
            keyDates: ['Q1 Review (Mar 5)', 'Spring Promotion Launch (Mar 15)']
          }
        ],
        themes: [
          {
            theme: 'Educational Excellence',
            description: 'Position as industry thought leaders through valuable educational content',
            duration: 'Ongoing',
            contentPieces: 12
          },
          {
            theme: 'Customer Success Stories',
            description: 'Build trust and social proof through real customer experiences',
            duration: 'Monthly',
            contentPieces: 6
          },
          {
            theme: 'Industry Innovation',
            description: 'Showcase cutting-edge solutions and forward-thinking approaches',
            duration: 'Quarterly',
            contentPieces: 4
          }
        ],
        posts: [
          {
            id: '1',
            title: '5 Ways to Transform Your Business in 2024',
            type: 'Blog Post',
            channel: 'Website & LinkedIn',
            schedule: new Date('2024-01-02'),
            status: 'scheduled',
            content: 'Comprehensive guide on business transformation strategies...'
          },
          {
            id: '2',
            title: 'Industry Trends Report 2024',
            type: 'Report',
            channel: 'Email & Website',
            schedule: new Date('2024-01-15'),
            status: 'scheduled',
            content: 'In-depth analysis of emerging industry trends...'
          },
          {
            id: '3',
            title: 'Customer Success: How Company X Increased Revenue by 150%',
            type: 'Case Study',
            channel: 'Website & Social Media',
            schedule: new Date('2024-02-20'),
            status: 'draft',
            content: 'Detailed case study showcasing customer success...'
          }
        ]
      };
      
      setGeneratedCalendar(mockCalendar);
      setSelectedMonth(mockCalendar.months[0].month);
      onCalendarGenerated(mockCalendar);
      setIsGenerating(false);
    }, 3000);
  };

  const getPostsForMonth = (month: string) => {
    if (!generatedCalendar) return [];
    return generatedCalendar.posts.filter(post => {
      const postMonth = post.schedule.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return postMonth === month;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Content Calendar Generator</h3>
          <p className="text-gray-600">Get a complete content strategy and publishing schedule</p>
        </div>
        <button
          onClick={generateCalendar}
          disabled={isGenerating}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 disabled:opacity-50"
        >
          {isGenerating ? 'Planning Content...' : 'Generate Calendar'}
        </button>
      </div>

      {marketingStrategy && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 text-sm">
            Creating content calendar based on your marketing strategy
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-6 mb-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-40 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {generatedCalendar && (
        <div className="space-y-6">
          {/* Content Themes */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-4">Content Themes</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {generatedCalendar.themes.map((theme, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-800 mb-2">{theme.theme}</h5>
                  <p className="text-gray-600 text-sm mb-3">{theme.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{theme.duration}</span>
                    <span>{theme.contentPieces} pieces</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Calendar */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-4">Monthly Content Plan</h4>
            
            {/* Month Selector */}
            <div className="flex space-x-2 overflow-x-auto pb-4 mb-4">
              {generatedCalendar.months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMonth(month.month)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                    selectedMonth === month.month
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {month.month}
                </button>
              ))}
            </div>

            {/* Selected Month Details */}
            {selectedMonth && generatedCalendar.months.find(m => m.month === selectedMonth) && (
              <div className="space-y-4">
                {(() => {
                  const month = generatedCalendar.months.find(m => m.month === selectedMonth)!;
                  const monthPosts = getPostsForMonth(selectedMonth);
                  
                  return (
                    <>
                      {/* Month Overview */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Monthly Themes</h5>
                          <div className="flex flex-wrap gap-1">
                            {month.themes.map((theme, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Key Dates</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {month.keyDates.map((date, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-500 mr-2">📅</span>
                                {date}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Monthly Goals */}
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Monthly Goals</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {month.goals.map((goal, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-purple-500 mr-2">🎯</span>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Monthly Posts */}
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Scheduled Content</h5>
                        <div className="space-y-3">
                          {monthPosts.length > 0 ? (
                            monthPosts.map((post) => (
                              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h6 className="font-medium text-gray-800">{post.title}</h6>
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.status)}`}>
                                    {post.status}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                  <span>{post.type} • {post.channel}</span>
                                  <span>{post.schedule.toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-2">{post.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm text-center py-4">
                              No content scheduled for this month yet
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Content Statistics */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-800 mb-4">Content Plan Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {generatedCalendar.months.length}
                </div>
                <div className="text-xs text-gray-600">Months Planned</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {generatedCalendar.posts.length}
                </div>
                <div className="text-xs text-gray-600">Total Posts</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {generatedCalendar.themes.length}
                </div>
                <div className="text-xs text-gray-600">Content Themes</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {Math.round(generatedCalendar.posts.length / generatedCalendar.months.length)}
                </div>
                <div className="text-xs text-gray-600">Posts/Month</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isGenerating && !generatedCalendar && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Plan Your Content</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate a comprehensive content calendar 
            with themes, schedules, and publishing plans for the next quarter.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentCalendarGenerator;