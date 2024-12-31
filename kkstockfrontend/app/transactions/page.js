'use client';

import { useState } from 'react';
import BuyComponent from '../component/buy';
import SellComponent from '../component/sell';
import HistoryComponent from '../component/history';
import Navbar from '../component/navbar';
import Header from '../component/header';

export default function TransactionPage() {
  const [activeTab, setActiveTab] = useState('buy'); // Default tab

  const renderTab = () => {
    switch (activeTab) {
      case 'buy':
        return <BuyComponent />;
      case 'sell':
        return <SellComponent />;
      case 'history':
        return <HistoryComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-4 py-2 rounded ${activeTab === 'buy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`px-4 py-2 rounded ${activeTab === 'sell' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Sell
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded ${activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              History
            </button>
          </div>

          {/* Render Tab Content */}
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
