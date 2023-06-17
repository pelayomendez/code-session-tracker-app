// Core
import React from 'react';
//Context
import { DatabaseProvider } from './DatabaseContext';
// UI Components
import { Tabs } from 'antd';
// Local components
import TimeTracker from './TimeTracker';
import DescriptionResume from './DescriptionResume';


const App = () => {
  return (
    <DatabaseProvider>
      <div className="app">
      <div className="logo-container">
           <svg
            className="logo-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#a8a8a8"
            stroke="#a8a8a8"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 8h16M4 16h16" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="4" r="1" />
            <circle cx="12" cy="20" r="1" />
          </svg>
          <h1 className="logo-text">Code Session Tracker</h1>
        </div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Time Tracker" key="1">
            <TimeTracker />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Description Resume" key="2">
            <DescriptionResume />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </DatabaseProvider>
  );
};

export default App;
