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
      <div>
        <h1>Code Session Tracker</h1>
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
