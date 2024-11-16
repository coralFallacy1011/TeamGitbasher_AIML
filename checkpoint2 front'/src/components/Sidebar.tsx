import React, { useState } from 'react';
import 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/styles/Sidebar.css'; // Ensure the path to your CSS is relative to your project structure
import logo from 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/resources/ico-white.png'; // Example logo import (adjust path as needed)

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? '=>' : '<='}
      </button>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">Jobmiljayesimsim</span>
      </div>
      <ul>
        <li><a href="/" className="menu-item"><span>🏠</span>{!isCollapsed && 'Home'}</a></li>
        <li><a href="/login" className="menu-item"><span>🔑</span>{!isCollapsed && 'Login'}</a></li>
        <li><a href="/notifications" className="menu-item"><span>🔔</span>{!isCollapsed && 'Notifications'}</a></li>
        <li><a href="/finder" className="menu-item"><span>🔍</span>{!isCollapsed && 'Finder'}</a></li>
        <li><a href="/profile" className="menu-item"><span>👤</span>{!isCollapsed && 'Profile'}</a></li>
        <li><a href="/dashboard" className="menu-item"><span>📊</span>{!isCollapsed && 'Dashboard'}</a></li>
      </ul>
    </div>
  );
};