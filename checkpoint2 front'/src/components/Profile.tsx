import React from 'react';
import { Sidebar } from './Sidebar';
import 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/styles/Profile.css';

const Profile: React.FC = () => {
  const details = {
    Name: 'John Doe',
    Experience: '5 years of experience in building scalable software solutions.',
    Skills: 'JavaScript, React, Node.js, Python',
    Education: 'Bachelor of Science in Computer Science',
  };

  return (
    <div className="Profile">
      <Sidebar />
      <div className="Profile-content">
        <h1>Personal Profile</h1>
        <div className="profile-details">
          <div className="profile-item">
            
            <p><h3>Name:</h3>{details.Name}</p>
          </div>
          <div className="profile-item">
            
            <p><h3>Experience:</h3>{details.Experience}</p>
          </div>
          <div className="profile-item">
            <h3>Skills:</h3>
            <p><h3>Skills:</h3>{details.Skills}</p>
          </div>
          <div className="profile-item">
            
            <p><h3>Education:</h3>{details.Education}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
