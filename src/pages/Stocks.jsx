import { useState } from 'react';
import { TrendingUpIcon, ArrowUpIcon, ArrowDownIcon, MagnifyingGlassIcon } from '../components/Icons';

const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const trendingStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2845.50, change: 2.3, volume: '2.5M', marketCap: '19.2L Cr' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4125.80, change: 1.8, volume: '1.8M', marketCap: '15.1L Cr' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1687.25, change: -0.5, volume: '3.2M', marketCap: '12.8L Cr' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1542.90, change: 3.2, volume: '2.1M', marketCap: '6.4L Cr' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2456.75, change: 1.1, volume: '1.2M', marketCap: '5.8L Cr' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1205.40, change: -1.2, volume: '4.1M', marketCap: '8.5L Cr' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1485.65, change: 2.8, volume: '1.9M', marketCap: '8.2L Cr' },
    { symbol: 'ITC', name: 'ITC Ltd', price: 456.80, change: 0.9, volume: '5.2M', marketCap: '5.7L Cr' },
  ];

  const marketIndices = [
    { name: 'SENSEX', value: 73852.94, change: 486.28, changePercent: 0.66 },
    { name: 'NIFTY 50', value: 22356.25, change: 143.75, changePercent: 0.65 },
    { name: 'NIFTY BANK', value: 48256.15, change: -125.80, changePercent: -0.26 },
    { name: 'NIFTY IT', value: 35420.90, change: 290.45, changePercent: 0.83 },
  ];

  const sectors = [
    { name: 'Information Technology', change: 2.1, color: 'text-secondary' },
    { name: 'Banking & Financial', change: -0.3, color: 'text-accent' },
    { name: 'Consumer Goods', change: 1.4, color: 'text-secondary' },
    { name: 'Healthcare', change: 0.8, color: 'text-secondary' },
    { name: 'Energy', change: 1.9, color: 'text-secondary' },
    { name: 'Telecommunications', change: -0.7, color: 'text-accent' },
  ];

  const filters = [
    { id: 'all', name: 'All Stocks' },
    { id: 'gainers', name: 'Top Gainers' },
    { id: 'losers', name: 'Top Losers' },
    { id: 'volume', name: 'Most Active' },
  ];

  const getFilteredStocks = () => {
    let filtered = trendingStocks;
    
    if (activeFilter === 'gainers') {
      filtered = trendingStocks.filter(stock => stock.change > 0).sort((a, b) => b.change - a.change);
    } else if (activeFilter === 'losers') {
      filtered = trendingStocks.filter(stock => stock.change < 0).sort((a, b) => a.change - b.change);
    } else if (activeFilter === 'volume') {
      filtered = trendingStocks.sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Stock Market</h1>
          <p className="text-text-muted mt-2">Track live stock prices and market trends</p>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center space-x-2 bg-card-bg rounded-lg px-3 py-2 w-full sm:w-80">
          <MagnifyingGlassIcon className="w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stocks..."
            className="flex-1 bg-transparent text-text-primary placeholder-text-muted focus:outline-none"
          />
        </div>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketIndices.map((index, idx) => (
          <div key={idx} className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">{index.name}</h3>
              {index.change > 0 ? (
                <ArrowUpIcon className="w-4 h-4 text-secondary" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-accent" />
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {index.value.toLocaleString()}
            </div>
            <div className={`text-sm font-medium flex items-center space-x-1 ${index.change > 0 ? 'text-secondary' : 'text-accent'}`}>
              <span>{index.change > 0 ? '+' : ''}{index.change.toFixed(2)}</span>
              <span>({index.changePercent > 0 ? '+' : ''}{index.changePercent}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sector Performance */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4">Sector Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector, idx) => (
            <div key={idx} className="bg-dark-bg p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">{sector.name}</span>
                <span className={`font-semibold ${sector.color}`}>
                  {sector.change > 0 ? '+' : ''}{sector.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-accent text-white'
                : 'bg-card-bg text-text-muted hover:text-white hover:bg-primary'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Stock List */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUpIcon className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-white">
            {activeFilter === 'all' ? 'Trending Stocks' :
             activeFilter === 'gainers' ? 'Top Gainers' :
             activeFilter === 'losers' ? 'Top Losers' : 'Most Active'}
          </h2>
        </div>
        
        <div className="space-y-3">
          {getFilteredStocks().map((stock, idx) => (
            <div key={idx} className="bg-dark-bg p-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {stock.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-accent transition-colors">
                        {stock.symbol}
                      </h3>
                      <p className="text-text-muted text-sm">{stock.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">₹{stock.price.toFixed(2)}</div>
                    <div className={`text-sm font-medium flex items-center space-x-1 ${stock.change > 0 ? 'text-secondary' : 'text-accent'}`}>
                      {stock.change > 0 ? (
                        <ArrowUpIcon className="w-3 h-3" />
                      ) : (
                        <ArrowDownIcon className="w-3 h-3" />
                      )}
                      <span>{stock.change > 0 ? '+' : ''}{stock.change}%</span>
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-text-muted">
                    <div>Vol: {stock.volume}</div>
                    <div>MCap: {stock.marketCap}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {getFilteredStocks().length === 0 && (
          <div className="text-center py-8">
            <TrendingUpIcon className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">No stocks found matching your search.</p>
          </div>
        )}
      </div>

      {/* Market News */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4">Market News & Updates</h2>
        <div className="space-y-3">
          {[
            { title: 'IT stocks surge on strong Q3 earnings outlook', time: '2 hours ago', category: 'Technology' },
            { title: 'RBI keeps repo rate unchanged at 6.5%', time: '4 hours ago', category: 'Policy' },
            { title: 'Banking stocks under pressure amid NPA concerns', time: '6 hours ago', category: 'Banking' },
            { title: 'FII inflows boost market sentiment', time: '1 day ago', category: 'Markets' },
          ].map((news, idx) => (
            <div key={idx} className="bg-dark-bg p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1 hover:text-accent transition-colors">
                    {news.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <span>{news.time}</span>
                    <span>•</span>
                    <span className="text-accent">{news.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stocks;