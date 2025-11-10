import { Link, useLocation } from 'react-router-dom'

export default function MobileMenu() {
  const location = useLocation()

  const navigation = [
    { name: 'Calendar', href: '/', current: location.pathname === '/', icon: '📅' },
    { name: 'Weekly Planner', href: '/weeklyplanner', current: location.pathname === '/weeklyplanner', icon: '📊' },
    { name: 'Daily Planner', href: '/dailyplanner', current: location.pathname === '/dailyplanner', icon: '📝' },
    { name: 'Business Launch', href: '/businesslaunch', current: location.pathname === '/businesslaunch', icon: '🚀' },
    { name: 'Resources', href: '/resources', current: location.pathname === '/resources', icon: '📚' },
  ]

  return (
    <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/80 shadow-2xl shadow-black/5">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b border-gray-100/60">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Navigation</h3>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="px-3 pt-3 pb-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`
              group flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 ease-out
              border-2 backdrop-blur-sm
              ${item.current
                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/80 text-blue-700 shadow-lg shadow-blue-500/10 transform scale-[1.02]'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-white hover:border-gray-200/60 hover:shadow-md active:scale-95'
              }
            `}
          >
            {/* Icon */}
            <span className={`
              text-lg transition-transform duration-300
              ${item.current ? 'scale-110' : 'group-hover:scale-110'}
            `}>
              {item.icon}
            </span>
            
            {/* Text */}
            <span className={`
              font-medium text-base transition-all duration-300
              ${item.current ? 'font-semibold' : 'group-hover:font-semibold'}
            `}>
              {item.name}
            </span>

            {/* Active Indicator */}
            {item.current && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"></div>
              </div>
            )}
          </Link>
        ))}
        
        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200/60"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs text-gray-400">Quick Actions</span>
          </div>
        </div>

        {/* Additional Mobile Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button className="
            flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
            text-sm font-medium text-gray-600 
            bg-gray-50/80 hover:bg-white hover:text-gray-900 
            border border-gray-200/60 hover:border-gray-300
            transition-all duration-200 active:scale-95
            shadow-sm hover:shadow-md
          ">
            <span>⚙️</span>
            Settings
          </button>
          
          <button className="
            flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
            text-sm font-medium text-white 
            bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
            border border-blue-500/20
            transition-all duration-200 active:scale-95
            shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30
          ">
            <span>✨</span>
            New Task
          </button>
        </div>

        {/* User Profile Quick Action */}
        <div className="pt-2">
          <button className="
            w-full flex items-center justify-between p-4 rounded-2xl
            bg-gradient-to-r from-gray-50 to-gray-100/50
            border border-gray-200/60
            hover:bg-white hover:shadow-md
            transition-all duration-200 active:scale-95
          ">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                Y
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Your Account</div>
                <div className="text-xs text-gray-500">View profile & settings</div>
              </div>
            </div>
            <span className="text-gray-400 text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100/60">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Planner App v1.0</span>
          <span>👋</span>
        </div>
      </div>
    </div>
  );
}