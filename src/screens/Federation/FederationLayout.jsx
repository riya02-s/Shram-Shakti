// src/screens/Federation/FederationLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import JobDistribution from './JobDistribution';
import Societies from './Societies';
import DemandForecast from './DemandForecast';
import EscalatedDisputes from './EscalatedDisputes';
import { federationMetrics } from '../../data/federationMockData';
import { useApp } from '../../context/AppContext';

export default function FederationLayout({ initialTab = 'dashboard' }) {
  const { t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = (path) => {
    if (path.includes('/distribution')) return 'distribution';
    if (path.includes('/societies')) return 'societies';
    if (path.includes('/forecast')) return 'forecast';
    if (path.includes('/disputes')) return 'disputes';
    return 'dashboard';
  };

  const [currentTab, setCurrentTab] = useState(getTabFromPath(location.pathname));

  useEffect(() => {
    setCurrentTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    if (tabId === 'dashboard') {
      navigate('/federation');
    } else {
      navigate(`/federation/${tabId}`);
    }
  };

  const tabs = [
    {
      id: 'dashboard',
      label: t('federation.nav.dashboard', 'Overview'),
      badge: null,
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'distribution',
      label: t('federation.nav.jobDistribution', 'Distribution'),
      badge: 'Fairness',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'societies',
      label: t('federation.nav.societies', 'Societies'),
      badge: `${federationMetrics.activeSocieties}`,
      badgeColor: 'bg-gray-100 text-gray-700',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'forecast',
      label: t('federation.nav.demandForecast', 'Forecast'),
      badge: 'AI',
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'disputes',
      label: t('federation.nav.escalatedDisputes', 'Disputes'),
      badge: `${federationMetrics.pendingDisputes}`,
      badgeColor: 'bg-rose-100 text-rose-800 font-bold',
      icon: (
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Federation Admin Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left Brand */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-[10px] shadow-sm shrink-0">
                SS
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-bold text-gray-900 tracking-tight truncate">{t('federation.title', 'Sahyog Seva')}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 shrink-0">
                    Federation
                  </span>
                </div>
              </div>
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                10 Active
              </span>
            </div>
          </div>

          {/* Sub Navigation Bar Tabs */}
          <nav className="flex gap-0.5 overflow-x-auto pb-2 pt-1 border-t border-gray-100 no-scrollbar -mx-1 px-1">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-gray-500'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.5 rounded-full leading-none ${
                        isActive ? 'bg-white/25 text-white' : tab.badgeColor
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 pb-12 overflow-x-hidden">
        {(() => {
          switch (currentTab) {
            case 'distribution':
              return <JobDistribution />;
            case 'societies':
              return <Societies />;
            case 'forecast':
              return <DemandForecast />;
            case 'disputes':
              return <EscalatedDisputes />;
            case 'dashboard':
            default:
              return <Dashboard onNavigate={(tabId) => handleTabClick(tabId)} />;
          }
        })()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-2.5 px-4 text-center text-[10px] text-gray-400 tracking-wide">
        Sahyog Seva &nbsp;•&nbsp; SIH Hackathon &nbsp;•&nbsp; Federation Admin &amp; Demand Forecast
      </footer>
    </div>
  );
}
