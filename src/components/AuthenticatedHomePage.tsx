import React from 'react';
import { Sidebar } from './Sidebar';

interface UserProfile {
  name: string;
  role: string;
  joinedDate: string;
}

const AuthenticatedHomePage: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <div className="home-page">
      <Sidebar />
      <div className="content">
        <h1>Welcome back, {user.name}!</h1>
        <p>Role: {user.role}</p>
        <p>Member since: {user.joinedDate}</p>
        <section>
          <h2>Your Dashboard</h2>
          <p>Here are your personalized insights and recommendations.</p>
        </section>
      </div>
    </div>
  );
};

export default AuthenticatedHomePage;
