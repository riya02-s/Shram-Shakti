// src/pages/Federation/FederationLayout.jsx
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import JobDistribution from './JobDistribution';
import Societies from './Societies';
import DemandForecast from './DemandForecast';
import EscalatedDisputes from './EscalatedDisputes';
import { federationMetrics } from '../../data/federationMockData';

export default function FederationLayout({ initialTab = 'dashboard' }) {
  const [currentTab, setCurrentTab] = useState(initialTab);

  const tabs = [
    {
      id: 'dashboard',
      label: 'Overview',
      badge: null,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'distribution',
      label: 'Job Distribution',
      badge: 'Fairness',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'societies',
      label: 'Member Societies',
      badge: `${federationMetrics.activeSocieties}`,
      badgeColor: 'bg-gray-100 text-gray-700',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'forecast',
      label: 'Demand Forecast',
      badge: 'Simulated',
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      id: 'disputes',
      label: 'Escalated Disputes',
      badge: `${federationMetrics.pendingDisputes}`,
      badgeColor: 'bg-rose-100 text-rose-800 font-bold',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Federation Admin Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Brand */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                SS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900 tracking-tight">Sahyog Seva</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    Federation Admin
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 hidden sm:block">
                  Apex Cooperative Governance & Cross-Society Allocation
                </p>
              </div>
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-semibold text-gray-800 block">Delhi NCR Federation Zone</span>
                <span className="text-[11px] text-emerald-600 font-medium">● 12 Societies Active</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-200 border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
                FA
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar Tabs */}
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 border-t border-gray-100 no-scrollbar">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-gray-500'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : tab.badgeColor
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
      <main className="flex-1 pb-12">
        {currentTab === 'dashboard' && <Dashboard onNavigate={(tabId) => setCurrentTab(tabId)} />}
        {currentTab === 'distribution' && <JobDistribution />}
        {currentTab === 'societies' && <Societies />}
        {currentTab === 'forecast' && <DemandForecast />}
        {currentTab === 'disputes' && <EscalatedDisputes />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-xs text-gray-500">
        Sahyog Seva Prototype • SIH Hackathon • Federation Admin & Demand Forecast Module
      </footer>
    </div>
  );
}

