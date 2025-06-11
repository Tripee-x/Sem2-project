import { BellIcon, Bars3Icon, MagnifyingGlassIcon } from './Icons';

const Header = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-primary border-b border-border-color flex items-center justify-between px-4 lg:px-8">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-text-secondary hover:text-white transition-colors"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        {/* Search */}
        <div className="hidden md:flex items-center space-x-2 bg-card-bg rounded-lg px-3 py-2 w-96">
          <MagnifyingGlassIcon className="w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search investments, stocks, funds..."
            className="flex-1 bg-transparent text-text-primary placeholder-text-muted focus:outline-none"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Portfolio Value */}
        <div className="hidden sm:block text-right">
          <p className="text-xs text-text-muted">Total Portfolio</p>
          <p className="text-sm font-semibold text-secondary">₹2,47,850</p>
        </div>

        {/* Notifications */}
        <button className="relative text-text-secondary hover:text-white transition-colors">
          <BellIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">User</p>
            <p className="text-xs text-text-muted">Investor</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;