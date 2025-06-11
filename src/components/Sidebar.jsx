import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  TrendingUpIcon,
  BuildingLibraryIcon,
  CubeIcon,
  XMarkIcon 
} from './Icons';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Investment Planner', href: '/investment-planner', icon: ChartBarIcon },
    { name: 'Stocks', href: '/stocks', icon: TrendingUpIcon },
    { name: 'Mutual Funds', href: '/mutual-funds', icon: BuildingLibraryIcon },
    { name: 'Metals', href: '/metals', icon: CubeIcon },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full bg-primary border-r border-border-color">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border-color">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <h1 className="text-xl font-bold text-white">InvestMate</h1>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-text-secondary hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`nav-link ${isActive ? 'active' : 'text-text-secondary'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border-color">
          <div className="card">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-white mb-1">Investment Tip</h3>
              <p className="text-xs text-text-muted">
                Diversify your portfolio across different asset classes for better risk management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;