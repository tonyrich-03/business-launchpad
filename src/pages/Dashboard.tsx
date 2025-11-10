import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
 const quickActions = [
    { icon: '📬', title: 'Inbox', desc: 'Check messages', href: '/inbox', color: 'bg-indigo-500' },
    { icon: '📆', title: 'Calendar', desc: 'View your schedule', href: '/calendar', color: 'bg-red-500' },
    { icon: '📅', title: 'Weekly Planner', desc: 'Plan your week', href: '/planner', color: 'bg-blue-500' },
    { icon: '📝', title: 'Daily Planner', desc: 'Plan your day', href: '/daily-planner', color: 'bg-teal-500' },
    { icon: '🚀', title: 'Business Launch', desc: 'Start your business', href: '/business', color: 'bg-green-500' },
    { icon: '📚', title: 'Resources', desc: 'Learning materials', href: '/resources', color: 'bg-orange-500' },
    { icon: '🔍', title: 'Explore', desc: 'Browse resources', href: '/explore', color: 'bg-purple-500' },
   ];

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's your business launchpad overview.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{action.title}</h3>
              <p className="text-slate-600 text-sm">{action.desc}</p>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div className="text-slate-500 text-center py-8">
            <div className="text-4xl mb-2">📊</div>
            <p>Your recent activity will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;