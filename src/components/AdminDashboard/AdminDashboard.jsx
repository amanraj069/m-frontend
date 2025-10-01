import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import StatsOverview from './StatsOverview';
import RecentActivities from './RecentActivities';
import SystemStatistics from './SystemStatistics';
import QuickActions from './QuickActions';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <Header user={user} logout={logout} />
      <div className="dashboard-content">
        <div className="container">
          <Sidebar />
          <div className="dashboard-main">
            <StatsOverview />
            <div className="dashboard-sections">
              <RecentActivities />
              <SystemStatistics />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
